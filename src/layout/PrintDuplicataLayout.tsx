import { Outlet } from "react-router-dom";


export function PrintDuplicataLayout() {


  return (
    <div className="h-full w-full min-h-screen bg-brand-green-light">
      <Outlet />
    </div>
  )
}
