import z from "zod";

export const imgSchema = z.object({
  imageId: z.string().min(1, "Şəkil yükləyin"),
});
export const gallerySchema = z.object({
  galleryIds: z.array(z.string()).min(1, "Ən azı bir şəkil yükləyin"),
});
export const buildingSchema = z.object({
  buildingIds: z.array(z.string()).min(1, "Ən azı bir şəkil yükləyin"),
});
export const renderSchema = z.object({
  renderUrlId: z.string().min(1, "Ən azı bir şəkil yükləyin"),
});
export const renderGallerySchema=z.object({
  renderUrlIds: z.array(z.string()).min(1, "Ən azı bir şəkil yükləyin"),
});
export const floorsSchema = z.object({
  floorsIds: z.array(z.string()).min(1, "Ən azı bir şəkil yükləyin"),
});
export const mainImageSchema = z.object({
  mainUrlId: z.string().min(1, "Ən azı bir şəkil yükləyin"),
});
export const modelSchema=z.object({
  modelImageId: z.string().min(1, "Ən azı bir şəkil yükləyin"),
});
export type ImgInput = z.infer<typeof imgSchema>;
export type GalleryInput = z.infer<typeof gallerySchema>;
export type BuildingInput = z.infer<typeof buildingSchema>;
export type RenderInput = z.infer<typeof renderSchema>;
export type FloorsInput = z.infer<typeof floorsSchema>;
export type MainImageInput = z.infer<typeof mainImageSchema>;
export type ModelImageInput = z.infer<typeof modelSchema>;
export type RenderGalleryInput = z.infer<typeof renderGallerySchema>;