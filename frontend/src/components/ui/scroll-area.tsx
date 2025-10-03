import * as React from "react"
import { cn } from "../../lib/utils"

// ---------- ScrollArea ----------
const ScrollArea = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative overflow-auto border-[#d4d7de] rounded-md",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
ScrollArea.displayName = "ScrollArea"

// ---------- ScrollBar ----------
const ScrollBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { orientation?: "vertical" | "horizontal" }
>(({ className, orientation = "vertical", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex touch-none select-none transition-colors bg-transparent",
      orientation === "vertical" &&
        "absolute top-0 right-0 h-full w-2.5 p-[1px]",
      orientation === "horizontal" &&
        "absolute bottom-0 left-0 w-full h-2.5 p-[1px] flex-col",
      className
    )}
    {...props}
  >
    <div className="relative flex-1 rounded-full bg-border" />
  </div>
))
ScrollBar.displayName = "ScrollBar"

// ---------- Exports ----------
export { ScrollArea, ScrollBar }
