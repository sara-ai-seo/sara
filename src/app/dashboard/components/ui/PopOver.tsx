"use client";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setUser } from "@/redux/features/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { useEffect, useState } from "react";

export function PopoverComponent() {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

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
    <Popover className={` z-50`} suppressHydrationWarning>
      {({ open }) => (
        <>
          <PopoverButton className="">
            <span className="h-[40px] w-[40px] z-50 rounded-full border flex items-center justify-center ">
              {user && user?.name?.split(" ")[0]?.slice(0, 1).toUpperCase()}
              {user && user?.name?.split(" ")[1]?.slice(0, 1).toUpperCase()}
            </span>
          </PopoverButton>
          <PopoverPanel
            anchor={{ to: "bottom" }}
            className="flex flex-col bg-white z-50  shadow-md p-3"
          >
            <Button
              variant="cancel"
              onClick={logout}
              className="hover:bg-primary hover:text-white w-full px-3"
            >
              Logout
            </Button>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
