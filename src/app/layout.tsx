import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { PopupProvider } from "@/context/popup-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { EditorProvider } from "@/context/editor-context";
import { BlogProvider } from "@/context/blog-context";
import { Suspense } from "react";
import NewBlogStarter from "@/components/dashboard/NewBlogStarter";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Blogger",
  description: "Write about anything you want",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense>
            <SessionProvider>
              <PopupProvider>
                <EdgeStoreProvider>
                  <EditorProvider>
                    <BlogProvider>
                      <NewBlogStarter />
                      {children}
                    </BlogProvider>
                  </EditorProvider>
                </EdgeStoreProvider>
              </PopupProvider>
            </SessionProvider>
          </Suspense>
          <Toaster />
        </ThemeProvider>
        <script src="https://kit.fontawesome.com/af9022b38a.js" crossOrigin="anonymous" defer></script>
      </body>
    </html>
  );
}
