import { ImageUp } from 'lucide-react';
import { Button } from '../ui/button';
import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '@/Context/AuthContext';
import { useReadUsuario } from '@/hook/queries/useUsuarios';

interface UploadImageProps {
  onUploadSuccess: (fileName: string) => void;
}


export function UploadFotoPerfil({ onUploadSuccess }: UploadImageProps) {

  const { user } = useContext(AuthContext)
  const userId = user?.sub ?? "";
  const { data: userData} = useReadUsuario(userId);



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

        const apiUrl = import.meta.env.VITE_API;
        const response = await axios.post<{ fileName: string }>(`${apiUrl}upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const uploadedFileName = response.data.fileName;
        onUploadSuccess(uploadedFileName);
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
      className={` w-44 flex flex-col items-center justify-around p-5 rounded-xl border border-dashed border-base-hover border-brand-blue-500 ${isDraggingOver ? 'border-4 bg-gray-200 opacity-45' : ''
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
        <div className="w-[120px] flex justify-center mb-4  rounded-2xl">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="w-44 " />
          ) : (
            <img src={`https://core-commerce.s3.sa-east-1.amazonaws.com/${userData?.foto_url}`}  alt="" />           
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