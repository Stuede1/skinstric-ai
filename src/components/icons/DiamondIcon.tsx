import { forwardRef, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number
}

const DiamondIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 420, className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 420 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        {/* Replace these paths with your Figma SVG export */}
        <rect
          x="210"
          y="0"
          width="297"
          height="297"
          transform="rotate(45 210 0)"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <rect
          x="210"
          y="30"
          width="254"
          height="254"
          transform="rotate(45 210 30)"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.6"
          fill="none"
        />
        <rect
          x="210"
          y="60"
          width="212"
          height="212"
          transform="rotate(45 210 60)"
          stroke="currentColor"
          strokeWidth="0.3"
          opacity="0.3"
          fill="none"
        />
      </svg>
    )
  }
)

DiamondIcon.displayName = 'DiamondIcon'
export default DiamondIcon
