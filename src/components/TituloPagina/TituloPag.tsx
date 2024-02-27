interface TituloPagProps {
  titulo: string
}

export function TituloPag(props: TituloPagProps, { children }: { children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-4xl font-bold text-brand-blue-500 mt-32">{props.titulo}</h4>
      <div>
        {children}
      </div>
    </div>
  );
}
