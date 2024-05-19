import { HeaderSite } from "@/components/HeaderSite";
import constructionAnimate from "../../assets/constructionAnimate.svg";

export function SolucoesSistemaPDV() {
  return (
    <>
      <HeaderSite />
      <div className="flex flex-col w-full h-screen justify-center items-center">
        <div className=" ">
          <h4 className=" font-bold text-brand-blue-400 text-center">
            Essa funcionalidade ainda não está disponivel.
          </h4>
          <span className=" font-semibold text-brand-blue-400 text-center">
            Logo você poderá utilizar o gerenciamento do produtos, por favor
            aguarde.
          </span>
        </div>
        <img
          src={constructionAnimate}
          alt="Animação Bild"
          width={700}
          className="bg-gray-50 rounded-xl"
        />
      </div>
    </>
  );
}
