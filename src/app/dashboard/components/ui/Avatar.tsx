import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarImgProps {
  url: string;
}
export function AvatarImg({ url }: AvatarImgProps) {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
