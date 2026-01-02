-- CreateTable
CREATE TABLE "ApplyForm" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'published',
    "title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "services" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplyForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApplyForm_documentId_key" ON "ApplyForm"("documentId");

-- CreateIndex
CREATE INDEX "ApplyForm_isDeleted_idx" ON "ApplyForm"("isDeleted");

-- CreateIndex
CREATE INDEX "ApplyForm_status_idx" ON "ApplyForm"("status");

-- CreateIndex
CREATE INDEX "ApplyForm_createdAt_idx" ON "ApplyForm"("createdAt");

-- CreateIndex
CREATE INDEX "ApplyForm_email_idx" ON "ApplyForm"("email");

-- CreateIndex
CREATE INDEX "ApplyForm_phone_idx" ON "ApplyForm"("phone");
