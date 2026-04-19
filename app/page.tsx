import Footer from "../components/Footer";
import QuienesSomos from "../components/QuienesSomos";
import ComoTeAyudamos from "../components/ComoTeAyudamos";
import PotenciaTuMarca from "../components/PotenciaTuMarca";
import NuestroMetodoTrabajo from "../components/NuestroMetodoTrabajo";

export default function Home() {
  return (
    <main className="bg-brand-gradient-section flex w-full flex-col">
      <PotenciaTuMarca />
      <ComoTeAyudamos />
      <QuienesSomos />
      <NuestroMetodoTrabajo />
      <Footer title={"QUEREMOS\nESCUCHARTE"} />
    </main>
  );
}
