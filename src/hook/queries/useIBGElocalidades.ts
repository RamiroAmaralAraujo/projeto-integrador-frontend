import { useEffect, useState } from "react";

export function useIBGELocalidades() {
  const [estados, setEstados] = useState<{ label: string; value: string }[]>([]);
  const [cidades, setCidades] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
      .then((res) => res.json())
      .then((data) => {
        const options = data.map((estado: any) => ({
          label: estado.sigla,
          value: estado.sigla,
        }));
        setEstados(options);
      });
  }, []);

  const fetchCidades = async (uf: string) => {
    setLoading(true);
    const res = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    );
    const data = await res.json();
    const options = data.map((cidade: any) => ({
      label: cidade.nome,
      value: cidade.nome,
    }));
    setCidades(options);
    setLoading(false);
  };

  return { estados, cidades, fetchCidades, loading };
}
