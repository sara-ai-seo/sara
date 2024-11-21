import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function BackToLogin({ className }: { className?: string }) {
  return (
    <main
      className={`${className} flex items-center w-full justify-center  text-sm font-semibold text-gray-600`}
    >
      <Link href={`/login`} className="flex items-center gap-2">
        <FaArrowLeft />
        Back to log in
      </Link>
    </main>
  );
}
