import Footer from "../../components/Footer";
import LoQueImaginas from "../../components/LoQueImaginas";
import EmpezamosJuntos from "../../components/EmpezamosJuntos";

export default function ContactoPage() {
  return (
    <main className="bg-contact-page flex w-full flex-col">
      <LoQueImaginas />
      <EmpezamosJuntos />
      <Footer title={"O PUEDES\nESCRIBIRNOS"} />
    </main>
  );
}
