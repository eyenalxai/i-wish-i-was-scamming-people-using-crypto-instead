"use client"

import { TelegramSDKProvider } from "@/components/telegram-sdk"
import type { PropsWithChildren } from "react"

export function Providers({ children }: PropsWithChildren) {
	return <TelegramSDKProvider>{children}</TelegramSDKProvider>
}
