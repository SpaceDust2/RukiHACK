"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from 'jotai';
import Sidebar from "./components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Provider>
                    <div className="flex h-screen">
                        <Sidebar/>
                        <div className="flex-1 overflow-auto">
                            {children}
                        </div>
                    </div>
                </Provider>
            </body>
        </html>
    );
}