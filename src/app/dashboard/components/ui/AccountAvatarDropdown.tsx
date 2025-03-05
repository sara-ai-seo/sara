"use client";

import { LogOut, Settings, User } from "lucide-react";
import { HiOutlineSupport } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarImg } from "./Avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setUser } from "@/redux/features/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export function AccountAvatarDropDown() {
  const user = useSelector((state: RootState) => state.user.user);
  // console.log(user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const name = user?.name?.split(" ").map(word => word?.[0]?.toUpperCase()).join("");
  const url = user?.profile?.avatar;
console.log("@", url)

  function logout() {
    sessionStorage.removeItem("user");
    dispatch(
      setUser({
        id: 0,
        email: "",
        fullName: "",
        account_type: "",
        createdAt: "",
        updatedAt: "",
      })
    );

    router.push("/login");
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full w-fit h-fit cursor-pointer">
          <AvatarImg name={name} url={url} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-1 -translate-x-8">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}

        <DropdownMenuGroup>
          {/* <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>View Profile</span>
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <Link href={`/dashboard/settings`} > <span>Settings</span></Link>
            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <HiOutlineSupport className="mr-2 h-4 w-4" />
            <Link href={`/dashboard/feedback`} > 

            <span>Support</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
