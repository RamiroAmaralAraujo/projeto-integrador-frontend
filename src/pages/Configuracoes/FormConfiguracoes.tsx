import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { Pencil, Check } from "lucide-react";
import { useReadUsuario } from "@/hook/queries/useUsuarios";
import { api } from "@/service/api"; // Certifique-se de que o caminho está correto
import { toast } from "react-toastify"; // Certifique-se de importar o toast

export function FormConfiguracoes() {
  const { user } = useContext(AuthContext);
  const userId = user?.sub ?? "";

  const { data: userData, isLoading, refetch } = useReadUsuario(userId); // Aqui adicionamos o refetch

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(userData?.userName || "");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Função para atualizar o nome de usuário
  const handleUpdateClick = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API; // Acessando a variável de ambiente
      await api.patch(`${apiUrl}usuarios/${userId}`, {
        userName: username, // Novo nome de usuário
      });

      // Feedback de sucesso
      toast.success("Nome de usuário atualizado com sucesso!");
      setIsEditing(false); // Após atualizar, desabilitar o modo de edição

      // Chamar o refetch para obter os dados atualizados em tempo real
      refetch();
    } catch (error) {
      toast.error(`Erro ao atualizar nome de usuário`);
    }
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <div className="flex justify-center items-center mb-6 gap-4 w-full">
        {isEditing ? (
          <div className="w-full">
            <Input
              label="Nome de Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        ) : (
          <h1 className="text-xl text-brand-blue-500 font-bold">{username}</h1>
        )}

        <button
          onClick={handleEditClick}
          className="p-2 rounded text-brand-blue-500 hover:bg-gray-300"
        >
          {isEditing ? <Check size={20} /> : <Pencil size={20} />}
        </button>
      </div>
      <div className="grid-cols-2 flex gap-2 mb-4">
        <div className="w-full">
          <Input
            label="Email*"
            className="opacity-50 cursor-not-allowed"
            value={userData?.email || ""}
            readOnly
          />
        </div>
        <div className="w-full">
          <Input
            label="CPF*"
            className="opacity-50 cursor-not-allowed"
            maskType="cpf"
            value={userData?.cpf || ""}
            readOnly={true}
          />
        </div>
        <div className="w-full">
          <Input label="Telefone" maskType="telefone" readOnly className="opacity-50 cursor-not-allowed"  />
        </div>
      </div>
      <div className="w-full mb-4">
        <Input label="Endereço*" className="opacity-50 cursor-not-allowed"  readOnly  />
      </div>
      <div className="grid-cols-2 flex gap-2 mb-4">
        <div className="w-full">
          <Input label="Cidade" className="opacity-50 cursor-not-allowed"  readOnly   />
        </div>
        <div className="w-full">
          <Input label="UF" maxLength={2} className="opacity-50 cursor-not-allowed"  readOnly   />
        </div>
        <div className="w-full">
          <Input label="CEP" maskType="cep" className="opacity-50 cursor-not-allowed"  readOnly   />
        </div>
      </div>
      <div className="flex justify-end items-end">
        <div className="flex gap-4">
          <div className="w-20">
            <Button label="Atualizar" onClick={handleUpdateClick} />
          </div>
        </div>
      </div>
    </>
  );
}
