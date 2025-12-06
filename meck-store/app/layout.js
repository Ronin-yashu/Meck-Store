import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientProviders from "@/components/ClientProviders";
import "./globals.css";
export const metadata = {
  title: "Meck Store - Your Shopping Destination",
  description: "Shop the latest products at amazing prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </ClientProviders>
      </body>
    </html>
  );
}
