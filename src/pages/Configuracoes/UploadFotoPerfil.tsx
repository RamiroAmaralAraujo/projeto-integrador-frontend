import { ImageUp } from 'lucide-react';
import { Button } from '../../components/ui/button';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


export function UploadFotoPerfil() {


  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length === 1) {
      const newFile = fileList[0];
      setSelectedFiles([newFile]);

      // Mostrar pré-visualização da imagem selecionada
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(newFile);
    }
  };


  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);

    const files = event.dataTransfer.files;
    if (files && files.length === 1) {
      const newFile = files[0];
      setSelectedFiles([newFile]);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(newFile);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadFiles = async () => {
    try {
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post<{ fileName: string }>('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const uploadedFileName = response.data.fileName;

        toast.success(`Arquivo "${uploadedFileName}" enviado com sucesso!`);
      }

      setSelectedFiles([]);
      setPreviewUrl(null);
    } catch (error) {
      toast.error('Houve um erro ao enviar os arquivos!');
      console.error('Erro ao enviar arquivos:', error);
    }
  };

  return (
    <div>
    <div
      className={` w-52 flex flex-col items-center justify-around p-5 rounded-xl border border-dashed border-base-hover border-brand-blue-500 ${isDraggingOver ? 'border-4 bg-gray-200 opacity-45' : ''
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >


      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div className='flex flex-col justify-center items-center'>
        <div className="w-[150px] flex justify-center mb-4  rounded-2xl">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="w-52 " />
          ) : (
            <img src="https://thumbs.dreamstime.com/b/s%C3%ADmbolo-de-perfil-masculino-inteligente-retrato-estilo-desenho-animado-m%C3%ADnimo-166146967.jpg" alt="" />
          )}
        </div>
        
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          icon={<ImageUp size={20} />}
          onClick={handleButtonClick}
        />
     

        {selectedFiles.length === 1 && (
          <div className='text-sm'>
            <Button type="button" label="Salvar" onClick={uploadFiles}  />
          </div>
        )}

        

      </div>
      
    </div>
    
    </div>
  );
}