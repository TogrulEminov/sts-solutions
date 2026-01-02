import Icons from "@/public/icons";
interface Props {
  iconName: string;
  className?: string;
  fill?: string;
  width?: number;
  height?: number;
}
export const renderSocialIcon = ({
  iconName,
  fill = "currentColor",
  className,
  width,
  height,
}: Props) => {
  const IconComponent = Icons[iconName as keyof typeof Icons];

  if (!IconComponent || typeof IconComponent !== "function") {
    return null;
  }

  return IconComponent({ fill: fill, width, height, className: className });
};
