import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import ClientProvider from "@/Components/ClientProvider";
import "./globals.css";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <Header />
          {children}

          {/* Razorpay Script */}
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="afterInteractive"
          />

          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
