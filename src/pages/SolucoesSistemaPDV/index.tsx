import { HeaderSite } from "@/components/HeaderSite";
import constructionAnimate from "../../assets/constructionAnimate.svg";

export function SolucoesSistemaPDV() {
  return (
    <>
      <HeaderSite />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center mb-8">
          <h4 className="font-bold text-brand-blue-400">
            Essa funcionalidade ainda não está disponível.
          </h4>
          <p className="font-semibold text-brand-blue-400">
            Logo você poderá utilizar o gerenciamento do produtos, por favor
            aguarde.
          </p>
        </div>
        <img
          src={constructionAnimate}
          alt="Animação Bild"
          width={700}
          className="max-w-full rounded-xl"
        />
      </div>
    </>
  );
}
