import QuienesSomos from "./components/QuienesSomos";
import ComoTeAyudamos from "./components/ComoTeAyudamos";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-brand-gradient-section ">
      <ComoTeAyudamos />
      <QuienesSomos />
      <Footer />
    </main>
  );
}
