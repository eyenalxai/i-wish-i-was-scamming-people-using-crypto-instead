import { useEffect } from "react"

export const useScrollLock = (lock: boolean) => {
	useEffect(() => {
		if (!lock) return

		const html = document.documentElement
		const body = document.body

		// 1. Block via CSS (primary method)
		body.style.overflow = "hidden"
		html.style.overflow = "hidden"

		// 2. Block via touchmove events (for iOS)
		const preventDefault = (e: Event) => e.preventDefault()
		document.addEventListener("touchmove", preventDefault, { passive: false })

		// 3. Force scroll position (fallback)
		const scrollTop = window.scrollY || document.documentElement.scrollTop
		const scrollLeft = window.scrollX || document.documentElement.scrollLeft

		const lockScroll = () => {
			window.scrollTo(scrollLeft, scrollTop)
		}

		window.addEventListener("scroll", lockScroll)

		return () => {
			body.style.overflow = ""
			html.style.overflow = ""
			document.removeEventListener("touchmove", preventDefault)
			window.removeEventListener("scroll", lockScroll)
		}
	}, [lock])
}
