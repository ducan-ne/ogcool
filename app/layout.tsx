import { AppProvider } from "@/app/app-provider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "ogcool",
  description: "Your ready-to-use open graph image generator",
  openGraph: {
    title: "ogcool",
    description: "Your ready-to-use open graph image generator",
    images: ["https://ogcool.vercel.app/og.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.counterscale = {'q': [['set', 'siteId', 'ogcool'], ['trackPageview']] };",
          }}
        />
        <meta name="viewport" content="width=device-width" />
        <script id="counterscale-script" src="https://tracking.graph.vn/tracker.js" defer />
      </head>
      <body suppressHydrationWarning className={`font-sans antialiased ${inter.variable}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
