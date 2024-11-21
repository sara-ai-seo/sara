interface ForgetPAsswordIconProps
  extends React.HTMLAttributes<HTMLOrSVGElement> {
  className?: string;
}

const ForgetPAsswordIcon = ({
  className,
  ...props
}: ForgetPAsswordIconProps) => (
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
      d="M37.0832 27.7507L41.1665 23.6673M43.4998 21.334L41.1665 23.6673L43.4998 21.334ZM32.2882 32.5457C32.8906 33.14 33.3694 33.8477 33.6972 34.6279C34.025 35.4081 34.1952 36.2455 34.198 37.0917C34.2009 37.938 34.0363 38.7764 33.7137 39.5588C33.3912 40.3412 32.9171 41.0521 32.3187 41.6505C31.7203 42.2489 31.0094 42.723 30.227 43.0455C29.4446 43.3681 28.6062 43.5327 27.7599 43.5298C26.9136 43.527 26.0763 43.3568 25.2961 43.029C24.5159 42.7013 23.8082 42.2224 23.2138 41.62C22.045 40.4098 21.3982 38.7889 21.4128 37.1065C21.4275 35.4241 22.1023 33.8147 23.292 32.625C24.4817 31.4353 26.0911 30.7604 27.7735 30.7458C29.4559 30.7312 31.0768 31.378 32.287 32.5468L32.2882 32.5457ZM32.2882 32.5457L37.0832 27.7507L32.2882 32.5457ZM37.0832 27.7507L40.5832 31.2507L44.6665 27.1673L41.1665 23.6673L37.0832 27.7507Z"
      stroke="#1570EF"
      strokeWidth={2.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ForgetPAsswordIcon;
