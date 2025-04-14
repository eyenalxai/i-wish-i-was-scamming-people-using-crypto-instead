"use client"

import { useClientOnce } from "@/lib/use-client-once"
import { init, viewport } from "@telegram-apps/sdk-react"
import type { PropsWithChildren } from "react"

export const TelegramSDKProvider = ({ children }: PropsWithChildren) => {
	useClientOnce(() => {
		init()

		const mountViewport = async () => {
			if (viewport.mount.isAvailable()) {
				try {
					await viewport.mount()

					if (viewport.requestFullscreen.isAvailable()) {
						viewport.requestFullscreen()
					}

					if (viewport.bindCssVars.isAvailable()) {
						viewport.bindCssVars()
					}
				} catch (err) {
					console.error("Failed to mount viewport:", err)
				}
			}
		}

		mountViewport()
	})

	return children
}
