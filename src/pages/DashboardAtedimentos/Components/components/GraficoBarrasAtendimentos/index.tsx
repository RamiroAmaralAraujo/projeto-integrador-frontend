import { useRead } from '@/hook/queries/useAtendimentos';

import { BarChart } from "@tremor/react"



export function GraficoBarrasAtendimentos(){

  const { data } = useRead();
  const atendimentos = data;

  if (!atendimentos) {
    return <div>Loading...</div>;  // Exibe algo enquanto os dados não chegam
  }



  const empresas = atendimentos.filter(atendimento => atendimento.empresaId).length;
 


  const chartdata = [
    {
      name: "Amphibians",
      "Number of threatened species": 2488,
    },
    {
      name: "Birds",
      "Number of threatened species": 1445,
    },
    {
      name: "Crustaceans",
      "Number of threatened species": 743,
    },
    {
      name: "Ferns",
      "Number of threatened species": 281,
    },
    {
      name: "Arachnids",
      "Number of threatened species": 251,
    },
    {
      name: "Corals",
      "Number of threatened species": 232,
    },
    {
      name: "Algae",
      "Number of threatened species": 98,
    },
  ]


  return (
    <BarChart
      className="h-64"
      data={chartdata}
      index="name"
      categories={["Number of threatened species"]}
      yAxisWidth={80}
      layout="vertical"
    />
  )
}