interface SuccessMarkIconProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  className?: string;
}

const SuccessMarkIcon = ({ className, ...props }: SuccessMarkIconProps) => (
  <svg
    className={className}
    viewBox="0 0 66 66"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={5} y={5} width={56} height={56} rx={28} fill="#D1FADF" />
    <rect
      x={5}
      y={5}
      width={56}
      height={56}
      rx={28}
      stroke="#ECFDF3"
      strokeWidth={10}
    />
    <path
      d="M42.3333 26L29.5 38.8333L23.6666 33"
      stroke="#039855"
      strokeWidth={2.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SuccessMarkIcon;
