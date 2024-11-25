interface QuestionIconProps extends React.SVGProps<SVGSVGElement> {
  clasName?: string;
}

const QuestionIcon = ({ className, ...props }: QuestionIconProps) => (
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
      d="M29.6047 29.5007C29.879 28.7209 30.4204 28.0634 31.133 27.6446C31.8456 27.2258 32.6834 27.0727 33.498 27.2125C34.3127 27.3522 35.0516 27.7758 35.5839 28.4081C36.1162 29.0404 36.4076 29.8408 36.4063 30.6673C36.4063 33.0007 32.9063 34.1673 32.9063 34.1673M32.9997 38.834H33.0113M44.6663 33.0007C44.6663 39.444 39.443 44.6673 32.9997 44.6673C26.5564 44.6673 21.333 39.444 21.333 33.0007C21.333 26.5573 26.5564 21.334 32.9997 21.334C39.443 21.334 44.6663 26.5573 44.6663 33.0007Z"
      stroke="#1570EF"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default QuestionIcon;
