import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ApolloProvider } from "@apollo/client";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import { Providers } from "@/redux/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Dribbble",
  description: "Showcase and discover remarable developer projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ApolloWrapper>{children}</ApolloWrapper>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
