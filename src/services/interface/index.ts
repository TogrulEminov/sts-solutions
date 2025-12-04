type Status = "PUBLISHED" | "published" | "DRAFT" | "archived";
export const Roles = {
  USER: "USER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
  CONTENT_MANAGER: "CONTENT_MANAGER",
};
export type Role = "USER" | "ADMIN" | "SUPER_ADMIN" | "CONTENT_MANAGER";
export type CustomLocales = "az" | "en" | "ru";
export type User = {
  name: string | null;
  username: string;
  email: string;
  password: string;
  role: Role;
  id: string;
  emailVerified: Date | null;
  image: string | null;
  createdById: string | null;
  isDeleted: boolean;
  updatedById: string | null;
};

export type AdditionArgument = {
  locale: string;
  page?: number;
  pageSize?: number;
  title?: string;
  url?: string;
  sort?: string;
  type?: string;
  externalId?: string;
};

export interface BaseItem {
  id: number;
  documentId: string;
  [key: string]: any;
}

export interface Column<T extends BaseItem> {
  title: string;
  dataIndex: keyof T;
  render?: (value: any, record: T) => React.ReactNode;
}

export type CountGenericType = {
  title: string;
  count: string;
};
export type InfoGenericType = {
  title: string;
  description?: string | undefined;
};

interface Seo {
  id: number;
  metaDescription: string;
  metaKeywords: string;
  metaTitle: string;
  locale: CustomLocales;
  image: string;
}

export interface PaginationItem {
  page: number;
  pageSize: number;
  dataCount: number;
  totalPages: number;
}

export interface Trash {
  id: number;
  title?: string;
  locale: string;
  documentId: string;
  updatedAt?: Date;
  model: string;
}

// content types
type EnumTranslation = {
  id: number;
  title: string;
  slug: string;
  locale: CustomLocales;
  description?: string;
  documentId: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface Enum {
  id: number;
  documentId: string;
  count?: number;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
  translations: EnumTranslation[];
}

//file
export interface FileType {
  fullUrl?: string;
  type?: any;
  data?: any;
  fileId?: any | number | undefined;
  relativePath?: any | string | undefined;
  id?: number;
  fileKey?: string;
  originalName?: string;
  mimeType?: string;
  fileSize?: number;
  publicUrl?: string;
  createdAt: string;
  updatedAt: string;
}
export type DatabaseImageType = Pick<FileType, "id" | "fileKey" | "publicUrl">;
export type UploadedFileMeta = {
  fileId: number;
  fileKey: string;
  publicUrl: string;
  [key: string]: any;
} | null;

export interface CustomUploadFile {
  type: any;
  uid: string;
  name: string;
  status: "done" | "uploading" | "error" | "removed";
  url?: string;
  originFileObj?: File;
  fileId?: number;
  fileKey?: string;
}

interface CategoryTranslation {
  title: string;
  description: string;
  id: number;
  documentId: string;
  locale: string;
  seo: Seo;
}

export interface CategoryItem {
  id: number;
  documentId: string;
  slug: string;
  status: Status;
  imageUrl: FileType | null;
  createdAt: string;
  updatedAt: string;
  translations: CategoryTranslation[];
}

// section
interface SectionContentTr {
  title: string;
  description: string;
  subTitle?: string;
  id: number;
  documentId: string;
  slug: string;
  locale: string;
}

export interface SectionContent {
  id: number;
  documentId: string;
  key: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  translations: SectionContentTr[];
}

export interface Social {
  id: number;
  documentId: string;
  socialName: string;
  socialLink: string;
  iconName: string;
  status: "published" | "draft";
  createdAt: Date;
  updatedAt: Date;
}
