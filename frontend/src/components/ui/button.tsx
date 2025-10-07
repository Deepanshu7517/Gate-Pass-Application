import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer sm:h-12 sm:px-6 sm:text-base",
  {
    variants: {
      variant: {
        default: "bg-[#4051b5] text-white hover:bg-[#4051b5]/90",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
        outline:
          "border border-gray-300 bg-[#eef0f2] text-black hover:text-white hover:bg-green-700",
        secondary:
          "bg-gray-600 text-white hover:bg-gray-700",
        ghost: "bg-transparent hover:bg-green-700 hover:text-white",
        link: "text-[#4051b5] underline-offset-4 hover:underline bg-transparent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as any}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

// const base =
//   `inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer`;

// const variants: Record<string, string> = {
//   default: "bg-[#4051b5] text-white hover:bg-[#334199]",
//   destructive: "bg-red-500 text-white hover:bg-red-600",
//   outline: "border border-gray-300 bg-[#eef0f2] text-black hover:text-white hover:bg-green-700",
//   secondary: "bg-gray-600 text-white hover:bg-gray-700",
//   ghost: "bg-transparent hover:bg-green-700",
//   link: "text-[#4051b5] underline-offset-4 hover:underline bg-transparent",
// };
