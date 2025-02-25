import type { Metadata } from "next";
import { Audiowide, Rajdhani, Archivo_Black } from "next/font/google";
import "../style/globals.scss";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import Mouse from "@/app/_components/mouse";
import { Toaster } from "react-hot-toast";
import { cn } from "@/utils/utils";

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: "400",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivoBlack",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Benn Dalton IRADUKUNDA Dushimimana | Portifolio",
  description: "I'm a Full-Stack Developer, crafting seamless solutions from front to back.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          audiowide.variable,
          rajdhani.variable,
          archivoBlack.variable,
          `antialiased font-rajdhani font-medium`
        )}
      >
        <div className="main-container">
          <div className="main-container-outer">
            <div className="main-container-inner">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </div>
        </div>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        <Mouse />
      </body>
    </html>
  );
}
