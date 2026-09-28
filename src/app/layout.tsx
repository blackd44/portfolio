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
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              color: "var(--color-bright)",
              background:
                "color-mix(in oklab, var(--color-dark) 70%, #8888)",
              backdropFilter: "blur(3px)",
              border:
                "1px solid color-mix(in oklab, var(--color-bright) 12%, transparent)",
              borderRadius: "10px",
              boxShadow: "-15px 15px 15px 0 #2222",
              fontWeight: 600,
            },
            success: {
              iconTheme: {
                primary: "var(--color-active)",
                secondary: "var(--color-dark)",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "var(--color-error)",
                secondary: "var(--color-dark)",
              },
            },
          }}
        />
        <Mouse />
      </body>
    </html>
  );
}
