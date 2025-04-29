import { useRead as useReadAtendimentos } from "@/hook/queries/useAtendimentos";
import { useRead as useReadEmpresas } from "@/hook/queries/useEmpresas";
import { BarChart } from "@tremor/react";
import PlaceHolderGraficoBarras from "@/assets/PlaceHolderGraficoBarras.png"

interface GraficoBarrasAtendimentosProps {
  startDate: string;
  endDate: string;
}

export function GraficoBarrasAtendimentos({ startDate, endDate }: GraficoBarrasAtendimentosProps) {
  const { data: atendimentos, isLoading: loadingAtendimentos } = useReadAtendimentos();
  const { data: empresas, isLoading: loadingEmpresas } = useReadEmpresas();

  if (loadingAtendimentos || loadingEmpresas) {
    return <div>Carregando dados...</div>;
  }

  if (!atendimentos || !empresas) {
    return <div className="text-red-500">Erro ao carregar atendimentos ou empresas.</div>;
  }

  // Filtra atendimentos pelo período selecionado
  const atendimentosFiltrados = atendimentos.filter((atendimento) => {
    const createdAt = new Date(atendimento.createdAt);
    return (
      createdAt >= new Date(startDate) &&
      createdAt <= new Date(endDate + "T23:59:59")
    );
  });

  const contagemPorEmpresa: Record<string, number> = {};
  atendimentosFiltrados.forEach((atendimento) => {
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
  ).sort((a, b) => b.Atendimentos - a.Atendimentos);

  return (
    <div className="w-full h-full items-center flex flex-col justify-around">
      <h3 className="text-tremor-content dark:text-dark-tremor-content font-semibold text-lg">
        Atendimentos por Empresa
      </h3>

      {chartdata.length > 0 ? (
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
        />
      ) : (
        <div>
          <img src={PlaceHolderGraficoBarras} alt="" className=" opacity-30 rounded-xl" />
        </div>
      )}
    </div>
  );
}
