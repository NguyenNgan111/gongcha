"use client";
import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/store/store";
import Header from "./components/header/page";
import Footer from "./components/footer/page";
import ScrollToTop from "./components/scrolltotop/ScrollToTop";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Header />
          {children}
          <Footer />
        </Provider>
        <ScrollToTop />
      </body>
    </html>
  );
}