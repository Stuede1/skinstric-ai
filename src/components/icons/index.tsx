// Export all custom SVG icons here
// Usage: import { IconName } from '@/components/icons'
//
// To add a new icon:
// 1. Export SVG from Figma (outline stroke, remove fixed fill colors for CSS control)
// 2. Create a component in this folder
// 3. Export it from this index file

import { SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number
}

// Example: replace with your Figma exports
// export { default as DiamondIcon } from './DiamondIcon'
