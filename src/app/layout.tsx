import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App boilerplate",
  description: "Created by ALAM",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
        <AuthProvider>
          <main className="max-w-[1700px] mx-auto">{children}</main>
          <Toaster />
        </AuthProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
