import { Link } from "@/src/i18n/navigation";
import whiteLogo from "@/public/assets/logo/logo-white.svg";
import CustomImage from "@/src/globalElements/ImageTag";
interface Props {
  isWhite?: boolean;
}

export default function Logo({ isWhite }: Props) {
  return (
    <Link href={"/"}>
      <CustomImage
        width={320}
        height={50}
        title="Globtm"
        className="max-w-60 lg:max-w-80 w-full h-auto"
        src={isWhite ? whiteLogo : ""}
      />
    </Link>
  );
}
