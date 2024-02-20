import LogoSemFundoAzul from "../../assets/LogoSemFundoAzul.svg"

export function LoadingFullscreen() {
  return (
    <div className="flex items-center justify-center absolute top-0 right-0 bottom-0 left-0 bg-brand-blue-500">
      <div>
        <img src={LogoSemFundoAzul} className=" animate-bounce w-36 h-36" alt="" />
      </div>
    </div>
  )
}
