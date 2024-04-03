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
  description: "Your read to use open graph image generator",
  openGraph: {
    title: "ogcool",
    description: "Your read to use open graph image generator",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.counterscale = {'q': [['set', 'siteId', 'ogcool'], ['trackPageview']] };",
          }}
        />
        <script id="counterscale-script" src="https://tracking.graph.vn/tracker.js" defer />
      </head>
      <body className={`${inter.variable} min-h-screen bg-white font-sans antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
