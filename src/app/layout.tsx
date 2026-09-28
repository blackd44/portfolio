import type { Metadata } from "next";
import { Audiowide, Rajdhani, Archivo_Black } from "next/font/google";
import "../style/tailwind.css";
import "../style/globals.scss";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import Mouse from "@/app/_components/mouse";
import { Toaster } from "react-hot-toast";
import { cn } from "@/utils/utils";

const audiowide = Audiowide({
  variable: "--nf-audiowide",
  subsets: ["latin"],
  weight: "400",
});

const rajdhani = Rajdhani({
  variable: "--nf-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const archivoBlack = Archivo_Black({
  variable: "--nf-archivoBlack",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Benn Dalton IRADUKUNDA Dushimimana | Backend Engineer",
  description:
    "Backend Engineer with 4+ years building scalable APIs and real-time systems in Node.js, TypeScript, and PostgreSQL.",
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
        <div className="page-frame" aria-hidden="true" />
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        <Mouse />
      </body>
    </html>
  );
}
