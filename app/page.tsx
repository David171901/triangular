import QuienesSomos from "./components/QuienesSomos";
import ComoTeAyudamos from "./components/ComoTeAyudamos";
import NuestroMetodoTrabajo from "./components/NuestroMetodoTrabajo";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-brand-gradient-section flex w-full flex-col">
      <ComoTeAyudamos />
      <QuienesSomos />
      <NuestroMetodoTrabajo />
      <Footer />
    </main>
  );
}
