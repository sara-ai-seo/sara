import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarImgProps {
  name: string;
}
export function AvatarImg({ name }: AvatarImgProps) {
  return (
    <Avatar>
      {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
      <AvatarFallback>
        {name}
      </AvatarFallback>
    </Avatar>
  );
}
