import { Suspense } from "react"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Chatbot from "@/components/Chatbot"
import DonateButton from "@/components/DonateButton"
import CollegeBanner from "@/components/CollegeBanner"
import Loading from "./loading"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Animal Foundation - College Project",
  description: "A final year project improving animal welfare through technology and community engagement",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CollegeBanner />
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
          <Footer />
        </div>
        <Chatbot />
        <DonateButton />
        <Toaster />
      </body>
    </html>
  )
}

