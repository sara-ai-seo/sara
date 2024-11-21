import { HtmlHTMLAttributes } from "react";

interface FeaturedIconProps extends HtmlHTMLAttributes<HTMLOrSVGElement> {
  className?: string;
}
const FeaturedIcon = ({ className, ...props }: FeaturedIconProps) => (
  <svg
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={40} height={40} rx={20} fill="#D1E9FF" />
    <path
      d="M13.3335 22.4998C13.3335 22.4998 14.1668 21.6665 16.6668 21.6665C19.1668 21.6665 20.8335 23.3332 23.3335 23.3332C25.8335 23.3332 26.6668 22.4998 26.6668 22.4998V12.4998C26.6668 12.4998 25.8335 13.3332 23.3335 13.3332C20.8335 13.3332 19.1668 11.6665 16.6668 11.6665C14.1668 11.6665 13.3335 12.4998 13.3335 12.4998V22.4998ZM13.3335 22.4998V28.3332"
      stroke="#175CD3"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default FeaturedIcon;
