import { Theme } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientProviders from "@/components/ClientProviders";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Meck Store - Your Shopping Destination",
  description: "Shop the latest products at amazing prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="purple" grayColor="slate" radius="large" appearance="light">
          <ClientProviders>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
          </ClientProviders>
        </Theme>
      </body>
    </html>
  );
}