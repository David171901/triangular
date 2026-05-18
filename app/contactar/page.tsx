import Footer from "../../components/Footer";
import LoQueImaginas from "../../components/LoQueImaginas";
import EmpezamosJuntos from "../../components/EmpezamosJuntos";

export default function ContactoPage() {
  return (
    <main className="bg-contacto-page flex w-full flex-col">
      <LoQueImaginas />
      <EmpezamosJuntos />
      <Footer
        showCtaButton={false}
        desktopContactLayout="stacked"
        title={"O PUEDES\nESCRIBIRNOS"}
      />
    </main>
  );
}
