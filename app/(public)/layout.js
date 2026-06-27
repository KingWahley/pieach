import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function PublicLayout({ children }) {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}
