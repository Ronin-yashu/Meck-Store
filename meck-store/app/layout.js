import "./globals.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Meck Store - Your Shopping Destination",
  description: "Shop the latest products at amazing prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <Navbar />
          {children}
        </Theme>
      </body>
    </html>
  );
}
