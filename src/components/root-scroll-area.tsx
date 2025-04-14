"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { PropsWithChildren } from "react"

export const RootScrollArea = ({
	children,
	className
}: PropsWithChildren<{ className?: string }>) => {
	return (
		<ScrollArea
			className={cn(className)}
			onPointerDownCapture={(e) => {
				// Allow native scroll when interacting with ScrollArea
				document.body.style.overflow = "auto"
			}}
			onPointerLeave={() => {
				// Re-lock when leaving ScrollArea
				document.body.style.overflow = "hidden"
			}}
		>
			{children}
		</ScrollArea>
	)
}
