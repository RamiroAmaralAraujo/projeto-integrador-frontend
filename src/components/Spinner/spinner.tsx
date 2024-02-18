import { AiOutlineLoading } from "react-icons/ai";

export function Spinner() {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      <AiOutlineLoading className="font-bold animate-spin text-base-background" />
    </div>
  )
}