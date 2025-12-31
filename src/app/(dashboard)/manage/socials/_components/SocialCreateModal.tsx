// app/(dashboard)/manage/socials/_components/SocialCreateModal.tsx
"use client";
import { useTransition } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMessageStore } from "@/src/hooks/useMessageStore";
import FieldBlock from "@/src/app/(dashboard)/manage/_components/contentBlock";
import {
  CreateSocialInput,
  createSocialSchema,
} from "@/src/schema/social.schema";
import Icons from "@/public/icons";
import { createSocial } from "@/src/actions/client/socials.actions";
import FormWrapper from "@/src/ui/FormBuilder/FormWrapper/FormWrapper";
import FormInput from "@/src/ui/FormBuilder/components/FormInput/FormInput";
import FormSelect from "@/src/ui/FormBuilder/components/FormSelect/FormSelect";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const availableIcons = [
  { name: "Facebook", label: "Facebook" },
  { name: "Instagram", label: "Instagram" },
  { name: "Twitter", label: "Twitter" },
  { name: "Linkedin", label: "Linkedin" },
  { name: "Youtube", label: "Youtube" },
  { name: "Telegram", label: "Telegram" },
  { name: "Whatsapp", label: "Whatsapp" },
  { name: "Tiktok", label: "Tiktok" },
];

export default function SocialCreateModal({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const { success, error } = useMessageStore();

  const generalForm = useForm<CreateSocialInput>({
    resolver: zodResolver(createSocialSchema),
    defaultValues: {
      socialName: "",
      socialLink: "",
      iconName: "",
      status: "published",
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = generalForm;
  const selectedIcon = watch("iconName");

  const onSubmit = async (data: CreateSocialInput) => {
    startTransition(async () => {
      const result = await createSocial(data);

      if (result.success) {
        success("Sosial şəbəkə uğurla yaradıldı!");
        reset();
        onClose();
        onSuccess();
      } else {
        error(result.error || "Yaradılarkən xəta baş verdi.");
      }
    });
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const IconPreview = ({ iconName }: { iconName: string }) => {
    if (!iconName) return null;

    const IconComponent = Icons[iconName as keyof typeof Icons];

    if (!IconComponent || typeof IconComponent !== "function") {
      return null;
    }

    return IconComponent({ fill: "currentColor" });
  };

  return (
    <Modal
      title={
        <div className="text-xl font-semibold">Yeni Sosial Şəbəkə Əlavə Et</div>
      }
      open={isOpen}
      onCancel={handleCancel}
      onOk={handleSubmit(onSubmit)}
      confirmLoading={isPending}
      width={650}
      okText="Yarat"
      cancelText="Ləğv et"
      okButtonProps={{
        size: "large",
        className: "h-10",
      }}
      cancelButtonProps={{
        size: "large",
        className: "h-10",
      }}
    >
      <FormWrapper form={generalForm} className="space-y-5 mt-6">
        <FieldBlock>
          {/* Social Name */}
          <div>
            <FormInput
              label="Sosial Şəbəkə Adı"
              placeholder="Məsələn: Facebook, Instagram"
              fieldName="socialName"
            />
          </div>

          {/* Social Link */}
          <div>
            <FormInput
              label="Link"
              placeholder="https://facebook.com/yourpage"
              fieldName="socialLink"
            />
          </div>

          {/* Icon Selection */}
          <div>
            <FormSelect
              fieldName="iconName"
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label as string)
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              }
              placeholder="Icon seçin"
              className="w-full"
              size="large"
              showSearch
              options={availableIcons}
            />
          </div>

          {selectedIcon && (
            <div className="bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Icon Önizləmə:
              </p>
              <div className="flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-xl shadow-md flex items-center justify-center">
                  <div className="w-12 h-12 flex items-center justify-center text-blue-600">
                    <IconPreview iconName={selectedIcon} />
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 text-center mt-3 font-mono">
                {selectedIcon}
              </p>
            </div>
          )}

          {/* Status */}
          <div>
            <FormSelect
              fieldName="status"
              className="w-full"
              size="large"
              label="Status"
              options={[
                { value: "published", label: "✓ Aktiv" },
                { value: "draft", label: "○ Deaktiv" },
              ]}
            />
          </div>
        </FieldBlock>

        {/* Info Note */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Məsləhət:</strong> Link-i tam şəkildə daxil edin
            (https:// ilə başlayan)
          </p>
        </div>
      </FormWrapper>
    </Modal>
  );
}
