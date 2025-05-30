
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import logo from '../../assets/Logo.svg';

export function PopupWhatsapp() {
  const options = {
    accountName: "CoreCommerce",
    phoneNumber: "22992081232",
    avatar: logo,
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