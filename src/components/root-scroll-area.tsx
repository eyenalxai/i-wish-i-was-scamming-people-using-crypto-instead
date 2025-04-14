"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import type { PropsWithChildren } from "react"

export const RootScrollArea = ({
	children,
	className
}: PropsWithChildren<{ className?: string }>) => {
	const scrollAreaRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleScroll = (e: Event) => {
			const target = e.target as Node
			const scrollArea = scrollAreaRef.current

			if (scrollArea && !scrollArea.contains(target)) {
				e.preventDefault()
			}
		}

		const preventKeyboardScroll = (e: KeyboardEvent) => {
			const scrollKeys = [
				"ArrowUp",
				"ArrowDown",
				"Space",
				"PageUp",
				"PageDown",
				"Home",
				"End"
			]

			if (
				scrollKeys.includes(e.code) &&
				scrollAreaRef.current &&
				!scrollAreaRef.current.contains(document.activeElement)
			) {
				e.preventDefault()
			}
		}

		document.documentElement.scrollTop = 0
		document.body.scrollTop = 0

		window.addEventListener("wheel", handleScroll, { passive: false })
		window.addEventListener("touchmove", handleScroll, { passive: false })
		window.addEventListener("keydown", preventKeyboardScroll)

		return () => {
			window.removeEventListener("wheel", handleScroll)
			window.removeEventListener("touchmove", handleScroll)
			window.removeEventListener("keydown", preventKeyboardScroll)
		}
	}, [])

	return (
		<ScrollArea
			ref={scrollAreaRef}
			className={cn("root-scroll-area", className)}
		>
			{children}
		</ScrollArea>
	)
}
