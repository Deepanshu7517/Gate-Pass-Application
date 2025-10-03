import { cn } from "../lib/utils";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", props.className)}
      {...props}
    >
      <path d="M12 22V8" />
      <path d="M5 8h14" />
      <path d="M20 8v5c0 1.1-.9 2-2 2H6a2 2 0 0 1-2-2V8" />
      <path d="m16 4-4-4-4 4" />
    </svg>
  );
}
