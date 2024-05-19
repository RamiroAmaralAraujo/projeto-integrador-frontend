import { HeaderSite } from "@/components/HeaderSite";
import { PopupWhatsapp } from "@/components/PopupWhatsapp";
import { Header } from "./components/Header";
import PaginaPlanos from "./components/PaginaPlanos";
import { FooterSite } from "@/components/FooterSite";


export function PlanoSistemaPDV() {
  return (
    <>
      <HeaderSite />
      <Header />
      <PaginaPlanos />
      <FooterSite />
      <PopupWhatsapp />
    </>
  );
}