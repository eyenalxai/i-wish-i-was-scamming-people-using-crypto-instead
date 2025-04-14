"use client"

import { useClientOnce } from "@/lib/use-client-once"
import { init, swipeBehavior, viewport } from "@telegram-apps/sdk-react"
import type { PropsWithChildren } from "react"

const CSS_VAR_PREFIX = "my-prefix"

export const TelegramSDKProvider = ({ children }: PropsWithChildren) => {
	useClientOnce(() => {
		init()

		const mountViewport = async () => {
			if (viewport.mount.isAvailable()) {
				try {
					await viewport.mount()

					if (viewport.bindCssVars.isAvailable()) {
						viewport.bindCssVars((key) => `--${CSS_VAR_PREFIX}-${key}`)
					}

					if (viewport.expand.isAvailable()) {
						viewport.expand()
					}

					if (swipeBehavior.mount.isAvailable()) {
						swipeBehavior.mount()
						swipeBehavior.disableVertical()
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
