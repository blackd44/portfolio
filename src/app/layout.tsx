import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../style/globals.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Mouse from "@/components/mouse";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlackD44",
  description: "BlackD44",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="main-container">
          <div className="main-container-outer">
            <div className="main-container-inner">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </div>
        </div>
        <Mouse />
      </body>
    </html>
  );
}
