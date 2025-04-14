"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { viewport } from "@telegram-apps/sdk-react"

export default function Page() {
	return (
		<div>
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
			<div className={cn("h-[600px]", "bg-red-100")} />
			<Input />
		</div>
	)
}
