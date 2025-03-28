import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { Pencil, Check } from "lucide-react";
import { useReadUsuario } from "@/hook/queries/useUsuarios";
import { api } from "@/service/api";
import { toast } from "react-toastify";

export function FormConfiguracoes() {
  const { user } = useContext(AuthContext);
  const userId = user?.sub ?? "";

  const { data: userData, isLoading, refetch } = useReadUsuario(userId);

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");

  useEffect(() => {
    if (userData) {
      setUsername(userData.userName || "");
      setEmail(userData.email || "");
      setTelefone(userData.telefone || "");
      setEndereco(userData.endereco || "");
      setCidade(userData.cidade || "");
      setEstado(userData.estado || "");
      setCep(userData.cep || "");
    }
  }, [userData]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateClick = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API;
      await api.patch(`${apiUrl}usuarios/${userId}`, {
        userName: username,
        email,
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

  const handleTrocarSenha = async () => {
    try {
      localStorage.removeItem("token");

      const apiUrl = import.meta.env.VITE_API;
      const response = await api.get(
        `${apiUrl}auth/generate-reset-link/${userId}`
      );
      const { link } = response.data;
      if (link) {
        window.location.href = link;
      } else {
        toast.error("Erro ao gerar o link de troca de senha.");
      }
    } catch (error) {
      toast.error("Erro ao gerar o link de troca de senha.");
    }
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <div className="flex justify-center items-center gap-2 w-full px-6">
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

      <div className="p-6">
        <div>
          <h3 className="text-xl font-semibold mb-8">Informações Pessoais</h3>

          <div className="grid-cols-2 flex gap-2 mb-4">
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
                label="E-mail*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                maxLength={8}
                maskType="cep"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end items-end">
            <Button label="Atualizar" onClick={handleUpdateClick} />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-8">Segurança</h3>
          <Button label="Trocar Senha" onClick={handleTrocarSenha} />
        </div>
      </div>
    </>
  );
}
