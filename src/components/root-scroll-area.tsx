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
	const scrollPosition = useRef({ top: 0, left: 0 })

	useEffect(() => {
		const viewport = viewportRef.current
		if (!viewport) return

		// Store initial scroll position
		scrollPosition.current = {
			top: window.scrollY,
			left: window.scrollX
		}

		const handleScroll = (e: Event) => {
			// Prevent any scroll on window
			window.scrollTo(scrollPosition.current.left, scrollPosition.current.top)
		}

		const handleTouchMove = (e: TouchEvent) => {
			// Only allow touch events within the scroll area
			if (!viewport.contains(e.target as Node)) {
				e.preventDefault()
			}
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

		// Use passive: false for reliable prevention
		window.addEventListener("scroll", handleScroll, { passive: false })
		document.addEventListener("touchmove", handleTouchMove, { passive: false })
		viewport.addEventListener("wheel", handleWheel, { passive: false })

		return () => {
			window.removeEventListener("scroll", handleScroll)
			document.removeEventListener("touchmove", handleTouchMove)
			viewport.removeEventListener("wheel", handleWheel)
		}
	}, [])

	return (
		<ScrollArea className={cn(className)} ref={viewportRef}>
			{children}
		</ScrollArea>
	)
}
