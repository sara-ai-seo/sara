import { MdOutlineFacebook } from "react-icons/md";
import { RiTwitterXLine } from "react-icons/ri";
import { SlSocialInstagram } from "react-icons/sl";

// const socialHandle = [
//     { facebook: MdOutlineFacebook },
//     { twitter: RiTwitterXLine },
//     { instagram: SlSocialInstagram },
//   ];

export const getSocialMediaIcon = (platform: string) => {
  switch (platform) {
    case "facebook":
      return <MdOutlineFacebook className="text-blue-600 text-lg" />;
    case "instagram":
      return <SlSocialInstagram className="text-pink-500 text-lg" />;
    case "twitter":
      return <RiTwitterXLine className="text-blue-400 text-lg" />;
    default:
      return null;
  }
};
