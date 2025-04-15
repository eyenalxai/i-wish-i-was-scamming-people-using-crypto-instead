"use client"

import { cn } from "@/lib/utils"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { type PropsWithChildren, useEffect, useRef, useState } from "react"

export const RootScrollArea = ({ children }: PropsWithChildren) => {
	const fakeInputRef = useRef<HTMLInputElement>(null)
	const lastFocusedElement = useRef<HTMLElement | null>(null)
	const isHandlingFocus = useRef(false)
	const viewportRef = useRef<HTMLDivElement>(null)
	const [hasFocusedElement, setHasFocusedElement] = useState(false)

	useEffect(() => {
		const handleFocusIn = (event: FocusEvent) => {
			const target = event.target as HTMLElement

			if (isHandlingFocus.current || target === fakeInputRef.current) {
				return
			}

			if (target.tagName !== "INPUT") {
				return
			}

			isHandlingFocus.current = true
			lastFocusedElement.current = target
			setHasFocusedElement(true) // Set focus state to true

			event.preventDefault()
			event.stopImmediatePropagation()

			if (fakeInputRef.current) {
				fakeInputRef.current.focus({ preventScroll: true })
			}

			setTimeout(() => {
				if (lastFocusedElement.current && viewportRef.current) {
					const targetElement = lastFocusedElement.current
					const viewport = viewportRef.current

					const targetRect = targetElement.getBoundingClientRect()
					const viewportRect = viewport.getBoundingClientRect()

					const scrollTo =
						targetRect.top -
						viewportRect.top -
						viewportRect.height / 2 +
						targetRect.height / 2 +
						viewport.scrollTop

					viewport.scrollTo({
						top: scrollTo,
						behavior: "smooth"
					})

					setTimeout(() => {
						document.removeEventListener("focusin", handleFocusIn, true)
						targetElement.focus({ preventScroll: true })

						// Add focus event listener directly to the element
						const handleElementBlur = () => {
							setHasFocusedElement(false)
							targetElement.removeEventListener("blur", handleElementBlur)
						}
						targetElement.addEventListener("blur", handleElementBlur)

						setTimeout(() => {
							document.addEventListener("focusin", handleFocusIn, true)
							isHandlingFocus.current = false
						}, 50)
					}, 300)
				}
			}, 300)
		}

		document.addEventListener("focusin", handleFocusIn, true)

		return () => {
			document.removeEventListener("focusin", handleFocusIn, true)
		}
	}, [])

	return (
		<ScrollAreaPrimitive.Root
			className={cn(
				"relative",
				"h-[calc(100vh-var(--my-prefix-safeAreaInsetTop)-var(--my-prefix-contentSafeAreaInsetTop)-var(--my-prefix-safeAreaInsetBottom)-var(--my-prefix-contentSafeAreaInsetBottom)-20px)]"
			)}
		>
			<ScrollAreaPrimitive.Viewport
				ref={viewportRef}
				className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
			>
				<input
					ref={fakeInputRef}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "0px",
						height: "0px",
						opacity: 0,
						pointerEvents: "none",
						zIndex: -1
					}}
					readOnly
					tabIndex={-1}
				/>
				{children}
				<div
					className={cn(
						"transition-all duration-500 ease-in-out overflow-hidden",
						hasFocusedElement ? "h-[400px]" : "h-[1px]"
					)}
				/>
			</ScrollAreaPrimitive.Viewport>
			<ScrollAreaPrimitive.Scrollbar
				orientation="vertical"
				className="flex touch-none p-px transition-colors select-none h-full w-2.5 border-l border-l-transparent"
			>
				<ScrollAreaPrimitive.Thumb className="bg-border relative flex-1 rounded-full" />
			</ScrollAreaPrimitive.Scrollbar>
			<ScrollAreaPrimitive.Corner />
		</ScrollAreaPrimitive.Root>
	)
}
