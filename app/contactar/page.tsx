import type { Metadata } from "next";
import Footer from "../../components/Footer";
import LoQueImaginas from "../../components/LoQueImaginas";
import EmpezamosJuntos from "../../components/EmpezamosJuntos";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntanos qué tienes en mente: diseño web, apps, identidad o campañas. Escríbenos desde el formulario y coordinamos una reunión para revisar tu proyecto.",
  alternates: {
    canonical: "/contactar",
  },
};

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
