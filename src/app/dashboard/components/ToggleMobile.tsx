import React, { useCallback } from "react";

interface Props {
  mobile: boolean;
  setMobile: (e: boolean) => void;
  className?: string;
}

const ToggleMobile: React.FC<Props> = React.memo(
  ({ mobile, setMobile, className }) => {
    const handleDesktopClick = useCallback(() => {
      setMobile(false);
    }, [setMobile]);

    const handleMobileClick = useCallback(() => {
      setMobile(true);
    }, [setMobile]);

    return (
      <button
        className={`${className} bg-[#D0D5DD] p-2 cursor-pointer flex items-center rounded-lg text-white font-semibold w-[167px] h-[52px]`}
      >
        <span
          className={`${
            !mobile ? "bg-primary text-white p-2 rounded-lg" : ""
          } w-full px-1`}
          onClick={handleDesktopClick}
        >
          Desktop
        </span>
        <span
          className={`${
            mobile ? "bg-primary text-white p-2 rounded-lg" : ""
          } w-full px-1`}
          onClick={handleMobileClick}
        >
          Mobile
        </span>
      </button>
    );
  }
);

export default ToggleMobile;
