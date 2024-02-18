import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { QueryClientProvider } from "react-query"
import { queryClient } from "./service/reactQuery"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export function App() {

  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App
