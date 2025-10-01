import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
// export const poppins = localFont({
//   src: "../../public/fonts/poppins/Poppins-Black.ttf",
//   variable: "--font-poppins",
// });
export const optima = localFont({
  src: "../../public/fonts/optima/Optima Medium.ttf",
  variable: "--font-optima",
});

export const metadata: Metadata = {
  title: {
    default: "play Finder USA",
    template: "%s | play Finder USA"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={optima.className}>
      <NextTopLoader
            color='#002868'
          />
        {children}
      </body>
    </html>
  );
}
