"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { viewport } from "@telegram-apps/sdk-react"

export default function Page() {
	// Array of 20 numbers from 0 to 19
	const numbers = Array.from({ length: 20 }, (_, i) => i)

	return (
		<div className={cn("space-y-6")}>
			<Button
				onClick={() => {
					if (viewport.requestFullscreen.isAvailable()) {
						if (viewport.isFullscreen()) {
							viewport.exitFullscreen()
							return
						}

						viewport.requestFullscreen()
					}
				}}
			>
				Toggle Fullscreen
			</Button>
			{numbers.map((number) => (
				<div key={number} className={cn("space-y-2")}>
					<Label>Input {number}</Label>
					<Input placeholder={`Input ${number}`} />
				</div>
			))}
		</div>
	)
}
