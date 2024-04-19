import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../style/globals.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Mouse from "@/components/mouse";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Benn Dalton IRADUKUNDA Dushimimana | Portifolio",
  description: "Explore the digital realm where creativity meets innovation. As a passionate Frontend Developer and UI/UX enthusiast, I specialize in crafting exceptional user experiences that captivate and inspire. Dive into my portfolio to discover a collection of projects that showcase my expertise in HTML, CSS, JavaScript, React, and more. From sleek web designs to interactive prototypes, each piece tells a story of dedication, creativity, and craftsmanship. Join me on this journey through pixels and code, where every click sparks imagination and every scroll unveils a new adventure.",
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
