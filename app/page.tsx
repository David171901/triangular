// # TODO: review code
import Footer from "../components/Footer";
import HacemosEquipo from "../components/HacemosEquipo";
import QuienesSomos from "../components/QuienesSomos";
import ComoTeAyudamos from "../components/ComoTeAyudamos";
import PotenciaTuMarca from "../components/PotenciaTuMarca";
import NuestroMetodoTrabajo from "../components/NuestroMetodoTrabajo";
import IniciarProyectoFlotante from "@/components/IniciarProyectoFlotante";

export default function Home() {
  return (
    <main className="flex min-h-full w-full flex-col">
      <IniciarProyectoFlotante>
        <PotenciaTuMarca />
        <div className="relative z-10 -mt-px">
          <ComoTeAyudamos />
          <QuienesSomos />
          <NuestroMetodoTrabajo />
        </div>
        <HacemosEquipo />
      </IniciarProyectoFlotante>
      <div className="relative z-10 -mt-px">
        <Footer
          className="bg-footer-home-page"
          title={"QUEREMOS\nESCUCHARTE"}
        />
      </div>
    </main>
  );
}
