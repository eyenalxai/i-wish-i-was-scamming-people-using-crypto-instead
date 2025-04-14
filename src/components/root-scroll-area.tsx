"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { type PropsWithChildren, useEffect, useRef } from "react"

export const RootScrollArea = ({
	children,
	className
}: PropsWithChildren<{ className?: string }>) => {
	const scrollAreaRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		// Function to prevent scroll on document/body
		const preventScroll = (e: WheelEvent | TouchEvent) => {
			// Check if the event target is within our ScrollArea
			const scrollAreaViewport = document.querySelector(
				"[data-radix-scroll-area-viewport]"
			)
			if (!scrollAreaViewport) return

			let targetElement = e.target as Node | null
			let isInsideScrollArea = false

			while (targetElement && !isInsideScrollArea) {
				if (targetElement === scrollAreaViewport) {
					isInsideScrollArea = true
					break
				}
				targetElement = targetElement.parentNode
			}

			// If the event is outside our ScrollArea, prevent scrolling
			if (!isInsideScrollArea) {
				e.preventDefault()
				e.stopPropagation()
				return false
			}
		}

		// Add event listeners with passive: false to allow preventDefault
		document.addEventListener("wheel", preventScroll, { passive: false })
		document.addEventListener("touchmove", preventScroll, { passive: false })

		return () => {
			// Cleanup
			document.removeEventListener("wheel", preventScroll)
			document.removeEventListener("touchmove", preventScroll)
		}
	}, [])

	return (
		<div ref={scrollAreaRef}>
			<ScrollArea className={cn(className)}>{children}</ScrollArea>
		</div>
	)
}
