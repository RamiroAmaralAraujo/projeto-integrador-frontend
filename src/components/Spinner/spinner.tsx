import { AiOutlineLoading } from "react-icons/ai";

export function Spinner() {
  return (
    <div className=" items-center justify-center overflow-hidden">
      <AiOutlineLoading className="font-bold animate-spin text-white" size={24} />
    </div>
  )
}