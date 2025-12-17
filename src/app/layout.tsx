import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import ReduxWrapper from "./redux/ReduxWrapper";
import { ConfigProvider, ThemeConfig } from "antd";

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

  const themeConfig: ThemeConfig = {
    token: {
      borderRadius: 4,
      fontSize: 16,
      colorPrimary: '#1a1a1a',
    },
    components: {
      Radio: {
        buttonSolidCheckedBg: 'rgb(136,148,166)',
        buttonSolidCheckedHoverBg: 'rgb(127,132,139)',
        borderRadius: 1,
      },
      Checkbox: {
        colorPrimary: "rgb(0,0,0)",
        colorPrimaryHover: "rgb(0,0,0)"
      },
      Select: {
        optionSelectedColor: "rgba(255,255,255,0.88)",
        fontSizeLG: 16,
        fontSizeSM: 16,
        fontSizeXL: 16
      },
      Pagination: {
        itemActiveBg: "rgb(16.08% 29.02% 50.2%)",
        itemActiveColor: "rgb(100% 100% 100%)",
        itemActiveColorHover: "rgb(100% 100% 100%)",
        colorPrimaryBorder: "rgb(100% 100% 100%)",
        motionDurationMid: "0s"
      },
      Input: {
        fontSizeLG: 20,
        borderRadius: 2
      },
      Form: {
        labelFontSize: 18,
        labelHeight: 32
      },
      DatePicker: {
        colorPrimary: "rgb(0,30,77)"
      }
    },
  };
  return (
    <html lang="en">
      <body className={optima.className}>
        <ReduxWrapper>
          <Toaster />
          <NextTopLoader
            color='#002868'
          />
          <ConfigProvider theme={themeConfig}>
            {children}
          </ConfigProvider>
        </ReduxWrapper>
      </body>
    </html>
  );
}
