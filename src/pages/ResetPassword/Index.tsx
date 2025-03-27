import { Input } from "../../components/ui/input";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LogoSemFundoBranco from "../../assets/LogoSemFundoBranco.svg";
import { api } from "../../service/api";
import { toast } from "react-toastify";

const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "A senha deve conter no mínimo 8 caracteres")
      .nonempty({ message: "Senha é obrigatória" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirmação de senha é obrigatória" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;

export function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  async function handleResetPassword(data: ResetPasswordData) {
    setMessage(null); // Resetando a mensagem
    setIsError(false); // Resetando o estado de erro

    try {
      await api.post("/auth/reset-password", {
        token,
        newPassword: data.password,
      });
      toast.success(
        "Senha redefinida com sucesso! Você será redirecionado para a página de login em instantes."
      );
      setIsError(false);

      setTimeout(() => {
        navigate("/login");
      }, 3000); // Redireciona após 3 segundos
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Erro ao redefinir a senha. O link pode ter expirado.";
      toast.error(errorMessage);
      setIsError(true);
    }
  }

  function retornarPaginaInicial() {
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-brand-blue-500 flex flex-col justify-center items-center">
      <div
        className="absolute top-6 left-6 flex items-center gap-2 cursor-pointer"
        onClick={retornarPaginaInicial}
      >
        <img src={LogoSemFundoBranco} alt="Logo" width={30} />
        <p className="font-semibold text-white text-2xl">
          Core<span className="font-normal">Commerce</span>
        </p>
      </div>
      <div className="max-w-md w-full p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-brand-blue-500 text-center">
          Redefinir Senha
        </h2>
        <p className="mt-4 text-gray-500 text-center">
          Digite sua nova senha abaixo.
        </p>
        {message && (
          <p
            className={`mt-4 text-center ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
        <form
          className="mt-6 space-y-6"
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <Input
            type={isPasswordVisible ? "text" : "password"}
            label="Nova Senha"
            icon={
              isPasswordVisible ? (
                <FiEyeOff
                  size={20}
                  onClick={() => setIsPasswordVisible(false)}
                />
              ) : (
                <FiEye size={20} onClick={() => setIsPasswordVisible(true)} />
              )
            }
            iconError={
              isPasswordVisible ? (
                <FiEyeOff
                  size={20}
                  onClick={() => setIsPasswordVisible(false)}
                />
              ) : (
                <FiEye size={20} onClick={() => setIsPasswordVisible(true)} />
              )
            }
            error={errors?.password}
            {...register("password")}
            disabled={isSubmitting}
          />
          <Input
            type={isConfirmPasswordVisible ? "text" : "password"}
            label="Confirme a Senha"
            icon={
              isConfirmPasswordVisible ? (
                <FiEyeOff
                  size={20}
                  onClick={() => setIsConfirmPasswordVisible(false)}
                />
              ) : (
                <FiEye size={20} onClick={() => setIsConfirmPasswordVisible(true)} />
              )
            }
            iconError={
              isConfirmPasswordVisible ? (
                <FiEyeOff
                  size={20}
                  onClick={() => setIsConfirmPasswordVisible(false)}
                />
              ) : (
                <FiEye size={20} onClick={() => setIsConfirmPasswordVisible(true)} />
              )
            }
            error={errors?.confirmPassword}
            {...register("confirmPassword")}
            disabled={isSubmitting}
          />

          <Button
            label={isSubmitting ? "Redefinindo..." : "Redefinir Senha"}
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
}
