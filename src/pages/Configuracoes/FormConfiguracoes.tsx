import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/Context/AuthContext";



export function FormConfiguracoes() {
  const { user } = useContext(AuthContext)
  return (
    <>
    <div className='flex justify-center items-center mb-6'>
      <h1 className='text-xl text-brand-blue-500 font-bold'>{user?.userName}</h1>
    </div>
      <div className="grid-cols-2 flex  gap-2 mb-4">
        <div className="w-full">
          <Input 
            label="Email*"
            defaultValue={user?.userEmail}
            readOnly={true}
            />
        </div>
        <div className="w-full">
          <Input 
          label="CPF*"
          maskType="cpf"
          defaultValue={user?.userCPF}
          readOnly={true}
          />
        </div>
        <div className="w-full">
          <Input label="Telefone" maskType="telefone"/>
        </div>
      </div>
      <div className="w-full mb-4">
      <Input label="Endereço*"/>
      </div>
      <div className="grid-cols-2 flex  gap-2 mb-4">
        <div className="w-full">
          <Input label="Cidade" />
        </div>
        <div className="w-full">
          <Input label="UF" />
        </div>

        <div className="w-full">
          <Input label="CEP" maskType="cep"/>
        </div>

       
      </div>

      <div className="flex justify-end items-end">
      <div className="w-20 ">
          <Button label="Atualizar"/>
      </div>
      </div>
      
    </>
  );
}