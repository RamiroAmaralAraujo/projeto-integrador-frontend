import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export function FormConfiguracoes(){
    return(
        <div className="flex flex-col flex-1 w-full">

            <div className="flex  flex-1 gap-4 m-2">
              <div className="w-full">
                <Input label="Email"  />
              </div>
              <div className="w-full">
                <Input label="CPF" maskType="cpf" />
              </div>
              
            </div>

            <div className="flex  flex-1 gap-4 m-2">
              
              <div className="w-full">
                <Input label="Endereço" />
              </div>
            </div>

            <div className="flex  flex-1 gap-4 m-2">   
              <Input label="Cidade" />
              <Input label="UF"/>
              <Input label="CEP" maskType="cep"/> 
              <Input label="Telefone" maskType="telefone" />     
            </div>

            <div className="flex justify-end m-2">
                <Button label="Atualizar"/>
            </div>

          </div>
    )
}