import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anthracite Applications | Agence de développement web",
  description:
    "L'avant-garde du développement web. Créations d'expériences immersives et captivantes pour transformer votre présence digitale.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Anthracite Applications"
  },
  themeColor: "#1a1a1a",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth dark">
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.add('dark');
              document.documentElement.style.colorScheme = 'dark';
              document.documentElement.style.backgroundColor = '#0a0a0a';
              
              if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                document.documentElement.style.background = '#0a0a0a';
                document.body.style.background = '#0a0a0a';
                document.body.style.color = '#ffffff';
              }
            `
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-[#e5e5e5]`}
      >
        {children}
      </body>
    </html>
  );
}
