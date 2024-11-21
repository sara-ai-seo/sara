interface EmailIconProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  className?: string;
}
const EmailIcon = ({ className, ...props }: EmailIconProps) => (
  <svg
    className={className}
    viewBox="0 0 66 66"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={5} y={5} width={56} height={56} rx={28} fill="#D1E9FF" />
    <rect
      x={5}
      y={5}
      width={56}
      height={56}
      rx={28}
      stroke="#EFF8FF"
      strokeWidth={10}
    />
    <path
      d="M44.6668 25.9993C44.6668 24.716 43.6168 23.666 42.3335 23.666H23.6668C22.3835 23.666 21.3335 24.716 21.3335 25.9993M44.6668 25.9993V39.9994C44.6668 41.2827 43.6168 42.3327 42.3335 42.3327H23.6668C22.3835 42.3327 21.3335 41.2827 21.3335 39.9994V25.9993M44.6668 25.9993L33.0002 34.166L21.3335 25.9993"
      stroke="#1570EF"
      strokeWidth={2.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default EmailIcon;
