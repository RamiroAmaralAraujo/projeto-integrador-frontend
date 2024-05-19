import { useRef } from "react";
import SignatureCanvas from 'react-signature-canvas';
import { Button } from "../ui/button";
import axios from 'axios';
import { toast } from "react-toastify";

interface UploadAssinaturaProps {
  onUploadSuccess: (fileName: string) => void;
}


function SignaturePad({ onUploadSuccess }: UploadAssinaturaProps) {
  const sign = useRef<any>(null);

  function handleClear() {
    event?.preventDefault()
    if (sign.current) {
      sign.current.clear();
    }
  }

  async function handleGenerate() {
    event?.preventDefault()
    if (sign.current) {
      // Convertendo a assinatura para PNG
      const signatureData = sign.current.getTrimmedCanvas().toDataURL('image/png');

      try {
        // Convertendo a assinatura em um arquivo Blob
        const blob = await (await fetch(signatureData)).blob();
        const file = new File([blob], 'signature.png', { type: 'image/png' });

        // Enviar a assinatura para a rota de upload usando Axios
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const uploadedFileName = response.data.fileName;
        onUploadSuccess(uploadedFileName);
        toast.success("Assinatura enviada com sucesso!")
      } catch (error) {
        console.error('Erro ao enviar a assinatura:', error);
      }
    }
  }

  return (
    <div>
      <h1 className="mt-2 ml-2 absolute text-brand-blue-500">Assinatura Digital</h1>
      <SignatureCanvas
        canvasProps={{ width: 520, height: 242, className: ' sigCanvas flex flex-col items-center justify-around rounded-xl border border-dashed border-base-hover border-brand-blue-500' }}
        ref={sign}
      />


      <div className="w-full  flex   justify-end -mt-12 ">
        <div className="flex gap-2 mr-2">
          <Button onClick={handleClear} className="h-full" label="Limpar" />
          <Button onClick={handleGenerate} label="Salvar" />
        </div>
      </div>
    </div>
  )
}

export default SignaturePad;
