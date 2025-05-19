import type { Metadata } from "next";
// import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/themeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import 'remixicon/fonts/remixicon.css';
import { Toaster } from "@/components/ui/sonner";
import ClientWrapper from "@/core/commons/layout/clientLayout";

// const bricolage = Bricolage_Grotesque({
//   variable: "--font-bricolage-grotesque",
//   subsets: ["latin"]
// })

export const metadata: Metadata = {
  title: "Trupper: The smart Examiner management system",
  description: "Trupper: The smart Examiner management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        <ClientWrapper>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider>
                  {children}
              </SidebarProvider>
              <Toaster/>
            </ThemeProvider>
        </ClientWrapper>
      </body>
    </html>
  );
}
