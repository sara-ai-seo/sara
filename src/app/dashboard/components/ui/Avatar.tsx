import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarImgProps {
  name: string;
  url?: string;
}
export function AvatarImg({ name, url }: AvatarImgProps) {
  return (
    <Avatar>
      <AvatarImage src={url} alt="User picture" />
      <AvatarFallback>
        {name}
      </AvatarFallback>
    </Avatar>
  );
}
