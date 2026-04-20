// # TODO: review code
import Footer from "../components/Footer";
import HacemosEquipo from "../components/HacemosEquipo";
import IniciarProyectoFlotante from "../components/IniciarProyectoFlotante";
import QuienesSomos from "../components/QuienesSomos";
import ComoTeAyudamos from "../components/ComoTeAyudamos";
import PotenciaTuMarca from "../components/PotenciaTuMarca";
import NuestroMetodoTrabajo from "../components/NuestroMetodoTrabajo";

export default function Home() {
  return (
    <main className="bg-brand-violet-bloom flex min-h-full w-full flex-col">
      <IniciarProyectoFlotante>
        <PotenciaTuMarca />
        <div className="bg-home-page relative z-10 -mt-px">
          <ComoTeAyudamos />
          <QuienesSomos />
          <NuestroMetodoTrabajo />
        </div>
        <HacemosEquipo />
      </IniciarProyectoFlotante>
      <div className="bg-footer-home-page relative z-10 -mt-px">
        <Footer title={"QUEREMOS\nESCUCHARTE"} />
      </div>
    </main>
  );
}
