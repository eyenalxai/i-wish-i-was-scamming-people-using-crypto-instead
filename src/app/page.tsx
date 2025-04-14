"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export default function Page() {
	const [viewportValues, setViewportValues] = useState({
		top: "0px",
		bottom: "0px",
		left: "0px",
		right: "0px"
	})

	useEffect(() => {
		const root = document.documentElement
		const computedStyle = getComputedStyle(root)

		setViewportValues({
			top: computedStyle.getPropertyValue(
				"--tg-viewport-content-safe-area-inset-top"
			),
			bottom: computedStyle.getPropertyValue(
				"--tg-viewport-content-safe-area-inset-bottom"
			),
			left: computedStyle.getPropertyValue(
				"--tg-viewport-content-safe-area-inset-left"
			),
			right: computedStyle.getPropertyValue(
				"--tg-viewport-content-safe-area-inset-right"
			)
		})
	}, [])

	return (
		<div
			className={cn(
				"pt-[calc(var(--tg-viewport-safe-area-inset-top,0px)+var(--tg-viewport-content-safe-area-inset-top))]",
				"pb-[calc(var(--tg-viewport-safe-area-inset-bottom,0px)+var(--tg-viewport-content-safe-area-inset-bottom))]",
				"pl-[calc(var(--tg-viewport-safe-area-inset-left,0px)+var(--tg-viewport-content-safe-area-inset-left))]",
				"pr-[calc(var(--tg-viewport-safe-area-inset-right,0px)+var(--tg-viewport-content-safe-area-inset-right))]"
			)}
		>
			<div className={cn("border", "border-red-500")}>
				<h2 className="text-lg font-semibold">Viewport Safe Area Insets:</h2>
				<div>Top: {viewportValues.top}</div>
				<div>Bottom: {viewportValues.bottom}</div>
				<div>Left: {viewportValues.left}</div>
				<div>Right: {viewportValues.right}</div>
			</div>
		</div>
	)
}
