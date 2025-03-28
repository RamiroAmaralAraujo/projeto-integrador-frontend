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
  const [telefone, setTelefone] = useState(userData?.telefone || "");
  const [endereco, setEndereco] = useState(userData?.endereco || "");
  const [cidade, setCidade] = useState(userData?.cidade || "");
  const [estado, setEstado] = useState(userData?.estado || "");
  const [cep, setCep] = useState(userData?.cep || "");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateClick = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API;
      await api.patch(`${apiUrl}usuarios/${userId}`, {
        userName: username,
        telefone,
        endereco,
        cidade,
        estado,
        cep,
      });

      toast.success("Dados atualizados com sucesso!");
      setIsEditing(false);
      refetch();
    } catch (error) {
      toast.error("Erro ao atualizar os dados");
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
            readOnly
          />
        </div>
        <div className="w-full">
          <Input
            label="Telefone"
            maskType="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full mb-4">
        <Input
          label="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />
      </div>
      <div className="grid-cols-2 flex gap-2 mb-4">
        <div className="w-full">
          <Input
            label="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Input
            label="UF"
            maxLength={2}
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Input
            label="CEP"
            maskType="cep"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
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
