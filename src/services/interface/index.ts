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
  suffix: string;
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
  isActive?: boolean;
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
  highlight?: string;
  subTitle?: string;
  description: string;
  id: number;
  documentId: string;
  features?: InfoGenericType[];
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
  highlightWord?: string;
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

//slider
interface SliderTranslation {
  title: string;
  description: string;
  id: number;
  documentId: string;
  slug: string;
  locale: string;
  seo: Seo;
}
export interface SliderItem {
  id: number;
  documentId: string;
  status: Status;
  imageUrl: FileType | null;
  createdAt: string;
  link?: string;
  updatedAt: string;
  translations: SliderTranslation[];
}

// fag
interface FagItemTr {
  title: string;
  description: string;
  id: number;
  documentId: string;
  slug: string;
  locale: string;
}

export interface FagItem {
  id: number;
  documentId: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  translations: FagItemTr[];
}

// strategic goals

interface StrategicTranslation {
  title: string;
  description: string;
  id: number;
  documentId: string;
  features?: InfoGenericType[];
  locale: string;
}

export interface StrategicItem {
  id: number;
  documentId: string;
  slug: string;
  status: Status;
  imageUrl: FileType | null;
  createdAt: string;
  updatedAt: string;
  translations: StrategicTranslation[];
}

interface IAboutHomeTranslations {
  id: number;
  title: string;
  subtitle?: string;
  slug: string;
  description: string;
  statistics?: CountGenericType[];
  sectors?: InfoGenericType[] | any;
  locale: CustomLocales;
  documentId?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}
export interface IAboutHome {
  id: number;
  documentId: string;
  isDeleted: boolean;
  status: Status;
  imageUrl?: FileType;
  gallery?: FileType[];
  translations?: IAboutHomeTranslations[];
  userId?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}
// about main
export interface IAboutTranslations {
  id: number;
  title: string;
  slug: string;
  description: string;
  subTitle: string;
  subDescription: string;
  experienceDescription: string;
  teamDescription: string;
  statistics?: CountGenericType[] | null;
  purpose?: InfoGenericType[] | null;
  sectors?: InfoGenericType[] | null;
  locale: CustomLocales;
  documentId: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IAbout {
  id: number;
  documentId: string;
  isDeleted: boolean;
  status: Status;
  imageUrl?: FileType;
  experienceYears: number;
  translations?: IAboutTranslations[];
  createdAt: Date | string;
  updatedAt: Date | string;
}
// 1. Enumlar (Status və Locales-ə uyğun)
export enum Locales {
  az = "az",
  en = "en",
  ru = "ru",
}

// 2. Tərcümə Modeli üçün İnterfeys (ContactInformationTranslation)
interface IContactInformationTranslation {
  id: number;
  adress: string;
  title: string;
  description: string;
  hightlightWord?: string;
  workHours: string;
  documentId: string;
  locale: Locales;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// 3. Əsas Əlaqə Modeli üçün İnterfeys (ContactInformation)
export interface IContactInformation {
  id: number;
  documentId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  phone: string;
  phoneSecond?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  adressLink: string;
  whatsapp: string;
  email: string;
  translations?: IContactInformationTranslation[];
  userId?: string | null;
  user?: any; // User interfeysiniz bura gəlməlidir
  isDeleted: boolean;
}

// connection
type ConnectionTranslation = {
  title: string;
  slug: string;
  id: number;
  description?: string | undefined;
  documentId: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
};

export interface ConnectionItem {
  id: number;
  documentId: string;
  slug: string;
  // status: Status;
  orderNumber: number;
  imageUrl: FileType;
  url: string;
  createdAt: string;
  updatedAt: string;
  translations: ConnectionTranslation[];
}

// employee

interface EmployeeTr {
  title: string;
  description: string;
  id: number;
  documentId: string;
  locale: string;
  slug: string;
}

export interface Employee {
  id: number;
  documentId: string;
  imageUrl: FileType | null;
  createdAt: string;
  orderNumber: number;
  position: Enum;
  positionId?: string;
  email: string;
  phone: string;
  experience: number;
  updatedAt: string;
  translations: EmployeeTr[];
}

// projects
interface ProjectsTr {
  title: string;
  description: string;
  subTitle?: string;
  id: number;
  documentId: string;
  locale: string;
  slug: string;
  seo: Seo;
}

export interface Projects {
  id: number;
  documentId: string;
  imageUrl: FileType | null;
  gallery: FileType[] | null;
  createdAt: string;
  updatedAt: string;
  translations: ProjectsTr[];
}

// service
interface ServicesCategoryItemTr {
  title: string;
  subtitle?: string;
  description: string;
  id: number;
  documentId: string;
  locale: string;
  slug: string;
  seo: Seo;
}

export interface ServicesCategoryItem {
  id: number;
  documentId: string;
  imageUrl: FileType | null;
  gallery: FileType[] | null;
  createdAt: string;
  isMain: boolean;
  subCategory: ServicesSubCategoryItem[];
  updatedAt: string;
  translations: ServicesCategoryItemTr[];
}

// service sub
interface ServicesSubCategoryItemTr {
  title: string;
  subtitle?: string;
  description: string;
  id: number;
  features: InfoGenericType[];
  documentId: string;
  locale: string;
  slug: string;
  seo: Seo;
}

export interface ServicesSubCategoryItem {
  id: number;
  documentId: string;
  imageUrl: FileType | null;
  gallery: FileType[] | null;
  createdAt: string;
  updatedAt: string;
  servicesCategory: ServicesCategoryItem[];
  servicesCategoryId?: string;
  translations: ServicesSubCategoryItemTr[];
}

// blog
interface BlogTranslation {
  title: string;
  description: string;
  slug: string;
  id: number;
  documentId: string;
  locale: string;
  readTime: string;
  tags: string[];
  seo?: Seo | undefined;
}

export interface BlogItem {
  id: number;
  documentId: string;
  // status?: Status | undefined;
  view: number;
  imageUrl: FileType | null;
  createdAt: string;
  updatedAt: string;
  translations: BlogTranslation[];
}

// solutions
interface SolutionsTr {
  title: string;
  subTitle?: string;
  subDescription?: string;
  description: string;
  id: number;
  documentId: string;
  locale: string;
  slug: string;
  seo: Seo;
  problems: InfoGenericType[];
}

export interface SolutionsItem {
  id: number;
  documentId: string;
  imageUrl: FileType | null;
  gallery: FileType[] | null;
  createdAt: string;
  updatedAt: string;
  translations: SolutionsTr[];
}
