"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { PropsWithChildren } from "react"
import { useEffect, useRef } from "react"

export const RootScrollArea = ({
	children,
	className
}: PropsWithChildren<{ className?: string }>) => {
	const viewportRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		// Lock body scroll by default
		document.body.style.overflow = "hidden"
		document.documentElement.style.overflow = "hidden"

		const viewport = viewportRef.current
		if (!viewport) return

		const handleTouchStart = (e: TouchEvent) => {
			// Allow touch events to propagate to the scroll area
			e.stopPropagation()
		}

		const handleWheel = (e: WheelEvent) => {
			if (!viewport) return

			const { scrollTop, scrollHeight, clientHeight } = viewport
			const atTop = scrollTop === 0 && e.deltaY < 0
			const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0

			if (atTop || atBottom) {
				e.preventDefault()
			}
		}

		viewport.addEventListener("touchstart", handleTouchStart, {
			passive: false
		})
		viewport.addEventListener("wheel", handleWheel, { passive: false })

		return () => {
			viewport.removeEventListener("touchstart", handleTouchStart)
			viewport.removeEventListener("wheel", handleWheel)
			document.body.style.overflow = ""
			document.documentElement.style.overflow = ""
		}
	}, [])

	return (
		<ScrollArea
			className={cn(className)}
			ref={viewportRef}
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
