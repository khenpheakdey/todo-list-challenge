import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import TodoListContextProvider from "@/providers/TodoListContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo List",
  description:
    "A simple todo list app built with Next.js and TypeScript for VTech Coding Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TodoListContextProvider>{children}</TodoListContextProvider>
      </body>
    </html>
  );
}
