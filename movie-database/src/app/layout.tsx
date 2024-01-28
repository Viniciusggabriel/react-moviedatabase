import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/utils/theme-provider";
import NavMenu from "@/components/layouts/nav-menu";

const RobotoSlab = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Database",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={RobotoSlab.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavMenu />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
