"use server";
import { ZodError } from "zod";
import dayjs from "dayjs";
import ejs from "ejs";
import transporter from "@/src/lib/admin/nodemailer";
import { db } from "../../lib/admin/prismaClient";
import { formatZodErrors } from "../../utils/format-zod-errors";

import path from "path";
import {
  CreateCallActionInput,
  createCallActionSchema,
} from "@/src/schema/form.schema";

type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  code: string;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
};

// ✅ 1. SANITIZATION HELPERS
function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove HTML tags
    .slice(0, 500); // Limit length
}

function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase().slice(0, 254);
}

function sanitizePhone(phone: string): string {
  return phone.replace(/[^0-9+\-() ]/g, "").slice(0, 20);
}

// ✅ 2. RATE LIMITING (Simple in-memory)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(
  identifier: string,
  maxRequests = 5,
  windowMs = 60000
): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(identifier);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (userLimit.count >= maxRequests) {
    return false;
  }

  userLimit.count++;
  return true;
}

// ✅ 3. HELPER FUNCTION - Common error handling
function handleZodError(error: ZodError): ActionResult {
  const fieldErrors: Record<string, string[]> = {};
  error.issues.forEach((err) => {
    const path = err.path.join(".");
    if (!fieldErrors[path]) {
      fieldErrors[path] = [];
    }
    fieldErrors[path].push(err.message);
  });

  return {
    success: false,
    error: "Məlumatlar düzgün deyil",
    errors: fieldErrors,
    code: "VALIDATION_ERROR",
  };
}



// ✅ 6. SECURE createContactUs
export async function createContactUs(
  input: CreateCallActionInput
): Promise<ActionResult> {
  try {
    // Rate limiting
    const identifier = `${input.email}-${input.phone}`;
    if (!checkRateLimit(identifier, 3, 300000)) {
      return {
        success: false,
        code: "RATE_LIMIT_EXCEEDED",
        error:
          "Çox tez-tez sorğu göndərirsiniz. Zəhmət olmasa bir az gözləyin.",
      };
    }

    const validateData = createCallActionSchema.safeParse(input);
    if (!validateData?.success) {
      return {
        code: "VALIDATION_ERROR",
        success: false,
        errors: formatZodErrors(validateData.error),
      };
    }

    const { title, email, phone, services, message } = validateData.data;

    // ✅ SANITIZE ALL INPUTS
    const sanitizedData = {
      title: sanitizeString(title),
      email: sanitizeEmail(email),
      phone: sanitizePhone(phone),
      services: sanitizeString(services),
      message: message ? sanitizeString(message) : "",
    };

    // 1. Database-ə yaz
    const createdContact = await db.applyForm.create({
      data: sanitizedData,
    });

    // 2. Email göndər
    try {
      const emailTemplate = path.join(
        process.cwd(),
        "src",
        "templates",
        "apply",
        "index.ejs"
      );

      const emailHTML = await ejs.renderFile(emailTemplate, {
        title: sanitizedData.title,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        services: sanitizedData.services,
        message: sanitizedData.message,
        year: dayjs().year(),
        createdAt: dayjs(createdContact.createdAt).format(
          "DD MMMM YYYY, [saat] HH:mm"
        ),
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_RECEIVER,
        subject: "Əlaqə Formu - " + sanitizedData.services,
        html: emailHTML,
      });
    } catch (emailError) {
      console.error("Email göndərmə xətası:", emailError);

      await db.applyForm.delete({ where: { id: createdContact.id } });

      return {
        success: false,
        code: "EMAIL_ERROR",
        error: "Email göndərilərkən xəta baş verdi",
      };
    }

    return {
      success: true,
      data: createdContact,
      code: "SUCCESS",
      message: "Mesajınız uğurla göndərildi",
    };
  } catch (error) {
    console.error("ContactUs xətası:", error);

    if (error instanceof ZodError) {
      return handleZodError(error);
    }

    return {
      success: false,
      code: "SERVER_ERROR",
      error: "Məlumat yadda saxlanarkən xəta baş verdi",
    };
  }
}
