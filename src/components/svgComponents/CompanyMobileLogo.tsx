interface MobileLogoIconProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  className?: string;
}

const MobileLogoIcon = ({ className, ...props }: MobileLogoIconProps) => (
  <svg
    className={className}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_dd_6940_3294)">
      <path
        d="M16.2778 22.3173C17.1 19.249 20.2539 16.0951 23.3222 15.2729L42.4512 10.1465C45.5195 9.32424 47.3402 11.145 46.5179 14.2133L41.3916 33.3423C40.5693 36.4105 37.4154 39.5644 34.3471 40.3867L15.2181 45.5131C12.1499 46.3353 10.3291 44.5146 11.1514 41.4463L16.2778 22.3173Z"
        fill="#2E90FA"
      />
      <path
        d="M8.60881 14.6493C9.43108 11.5811 12.585 8.42717 15.6533 7.60491L34.7823 2.47854C37.8505 1.65628 39.6713 3.47702 38.849 6.54529L33.7226 25.6743C32.9004 28.7426 29.7465 31.8965 26.6782 32.7187L7.5492 37.8451C4.48093 38.6674 2.66017 36.8466 3.48244 33.7783L8.60881 14.6493Z"
        fill="#175CD3"
      />
    </g>
    <defs>
      <filter
        id="filter0_dd_6940_3294"
        x={0}
        y={-2}
        width={50}
        height={54}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.06 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_6940_3294"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={1.5} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_6940_3294"
          result="effect2_dropShadow_6940_3294"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_6940_3294"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default MobileLogoIcon;
