import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, BookOpen, PlusCircle } from "lucide-react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "BookShare - Share and Discover Books",
  description: "A platform for book lovers to share and discover new books",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <header className="border-b">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                  <BookOpen className="h-6 w-6" />
                  <span>BookShare</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                  <Link href="/" className="text-sm font-medium hover:text-primary">
                    Home
                  </Link>
                  <Link href="/books" className="text-sm font-medium hover:text-primary">
                    Books
                  </Link>
                  <Link href="/add-book" className="text-sm font-medium hover:text-primary flex items-center gap-1">
                    <PlusCircle className="h-4 w-4" />
                    Add Book
                  </Link>
                </nav>
              </div>

              <div className="hidden md:flex items-center gap-4">
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search books..." className="w-full pl-8" />
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/login?tab=register">Sign Up</Link>
                </Button>
              </div>

              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </header>

          <main>{children}</main>

          <footer className="bg-muted mt-12 py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
                    <BookOpen className="h-6 w-6" />
                    <span>BookShare</span>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    Connect with readers and share your favorite books with the community.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Navigation</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/books" className="text-sm text-muted-foreground hover:text-foreground">
                        Books
                      </Link>
                    </li>
                    <li>
                      <Link href="/add-book" className="text-sm text-muted-foreground hover:text-foreground">
                        Add Book
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Legal</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Contact</h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-muted-foreground">Email: support@bookshare.com</li>
                    <li className="text-sm text-muted-foreground">Phone: +34 123 456 789</li>
                  </ul>
                </div>
              </div>

              <div className="border-t mt-8 pt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} BookShare. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'