import { useRead as useReadAtendimentos } from "@/hook/queries/useAtendimentos";
import { useRead as useReadEmpresas } from "@/hook/queries/useEmpresas";
import { BarChart} from "@tremor/react";


export function GraficoBarrasAtendimentos() {
  const { data: atendimentos, isLoading: loadingAtendimentos } =
    useReadAtendimentos();
  const { data: empresas, isLoading: loadingEmpresas } = useReadEmpresas();

  if (loadingAtendimentos || loadingEmpresas) {
    return <div>Carregando dados...</div>;
  }

  if (!atendimentos || !empresas) {
    return <div>Erro ao carregar dados</div>;
  }

  const contagemPorEmpresa: Record<string, number> = {};
  atendimentos.forEach((atendimento) => {
    const empresaId = atendimento.empresaId;
    contagemPorEmpresa[empresaId] = (contagemPorEmpresa[empresaId] || 0) + 1;
  });

  const chartdata = Object.entries(contagemPorEmpresa).map(
    ([empresaId, count]) => {
      const empresa = empresas.find((e) => e.id === empresaId);
      return {
        name: empresa?.empresaNome || "Empresa desconhecida",
        Atendimentos: count,
      };
    }
  ).sort((a, b) => b.Atendimentos - a.Atendimentos)


  return (
    <div className="w-full h-full items-center flex flex-col justify-around">
      <h3 className=" text-tremor-content dark:text-dark-tremor-content font-semibold text-lg">
        Atendimentos por Empresa
      </h3>
      <BarChart
        className="h-64"
        data={chartdata}
        index="name"
        categories={["Atendimentos"]}
        yAxisWidth={80}
        layout="vertical"
        showLegend={false}
        showYAxis={false}
        animationDuration={500}
        onValueChange ={(v) => (v)}  
      />
    </div>
  );
}
