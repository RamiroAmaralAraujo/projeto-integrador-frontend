import { Section1 } from "./components/Section1";
import { Section2 } from "./components/Section2";
import { Section3 } from "./components/Section3";
import { Section4 } from "./components/Section4";
import { FooterSite } from "@/components/FooterSite";
import { PopupWhatsapp } from "@/components/PopupWhatsapp";
import { HeaderSite } from "@/components/HeaderSite";

export function Site() {
  return (
    <>
      <HeaderSite />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <FooterSite />
      <PopupWhatsapp />
    </>
  );
}