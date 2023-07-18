import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { NextAuthProvider } from "@/components/SessionProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextAuthProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </NextAuthProvider>
    </>
  );
}
