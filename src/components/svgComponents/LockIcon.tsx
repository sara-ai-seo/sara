interface LockIconProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  className?: string;
}
const LockIcon = ({ className, ...props }: LockIconProps) => (
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
      d="M27.1667 31.834V27.1673C27.1667 25.6202 27.7812 24.1365 28.8752 23.0425C29.9692 21.9486 31.4529 21.334 33 21.334C34.5471 21.334 36.0308 21.9486 37.1248 23.0425C38.2188 24.1365 38.8333 25.6202 38.8333 27.1673V31.834M24.8333 31.834H41.1667C42.4553 31.834 43.5 32.8787 43.5 34.1673V42.334C43.5 43.6226 42.4553 44.6673 41.1667 44.6673H24.8333C23.5447 44.6673 22.5 43.6226 22.5 42.334V34.1673C22.5 32.8787 23.5447 31.834 24.8333 31.834Z"
      stroke="#1570EF"
      strokeWidth={2.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default LockIcon;
