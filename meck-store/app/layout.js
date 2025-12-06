import "./globals.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingProvider from "@/components/LoadingProvider";

export const metadata = {
  title: "Meck Store - Your Shopping Destination",
  description: "Shop the latest products at amazing prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <LoadingProvider>
            <Navbar />
            {children}
            <Footer />
          </LoadingProvider>
        </Theme>
      </body>
    </html>
  );
}
