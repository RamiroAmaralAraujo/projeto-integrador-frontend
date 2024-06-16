
import { FloatingWhatsApp } from 'react-floating-whatsapp';

export function PopupWhatsapp() {
  const options = {
    accountName: "CoreCommerce",
    phoneNumber: "22992081232",
    avatar: "https://core-commerce.s3.sa-east-1.amazonaws.com/Logo+(1).png",
    chatMessage: "Olá, como podemos te ajudar?",
    statusMessage: "Online",
    placeholder: "Digite uma mensagem...",
    allowClickAway: true,
    allowEsc: true,
  };

  return (
    <>
      <FloatingWhatsApp {...options} />
    </>
  );
}