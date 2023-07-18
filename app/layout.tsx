import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ApolloProvider } from "@apollo/client";
import { ApolloWrapper } from "@/lib/apollo-wrapper";

export const metadata = {
  title: "Flexibble",
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
        <ApolloWrapper>
          {children}
          {/* <Navbar />
          <main>{children}</main>
          <Footer /> */}
        </ApolloWrapper>
      </body>
    </html>
  );
}
