import { cva } from "class-variance-authority";

export const alertVariants = cva(
    "relative w-full rounded-lg border p-4 [&:has(svg)]:pl-11 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground",
                destructive:
                "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
            }
        },
        defaultVariants: {
            variant: "default"
        },
    }
)