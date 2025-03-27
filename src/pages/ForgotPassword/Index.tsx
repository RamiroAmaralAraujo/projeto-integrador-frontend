import { Input } from "../../components/ui/input";
import { FiMail } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoSemFundoBranco from "../../assets/LogoSemFundoBranco.svg";
import { api } from "../../service/api";
import { toast } from "react-toastify";

const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "E-mail é obrigatório" })
    .email({ message: "Informe um e-mail válido" }),
});

type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;

export function ForgotPassword() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  async function handleForgotPassword(data: ForgotPasswordData) {
    setMessage(null);
    setIsError(false);

    try {
      await api.post("/auth/forgot-password", data);
      toast.success(
        "E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada. Caso não encontre, confira também a caixa de spam."
      );
      setIsError(false);
      setIsSubmitted(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Erro ao enviar e-mail. Verifique se o endereço está correto.";
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
          Recuperar Senha
        </h2>

        <p className="mt-4 text-gray-500 text-center">
          Digite seu e-mail para receber um link de recuperação.
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
          onSubmit={handleSubmit(handleForgotPassword)}
        >
          <Input
            type="email"
            label="Email"
            icon={<FiMail size={20} />}
            error={errors?.email}
            {...register("email")}
            disabled={isSubmitting || isSubmitted}
          />
          <Button
            label={isSubmitting ? "Enviando..." : "Enviar"}
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting || isSubmitted}
          />
        </form>
      </div>
    </div>
  );
}
