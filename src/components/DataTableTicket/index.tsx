import { useEffect, useState } from "react";

import NotResult from "../../assets/NotResult.svg";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Button } from "../ui/button";
import * as React from "react";
import { Skeleton } from "../ui/skeleton";
import { Select } from "../ui/select";
import { Input } from "../ui/input";
import { AuthContext } from "@/Context/AuthContext";
import SelectFilter from "../ui/selectFilter";

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
}

export function DataTableTicket<TData, TValue>({
  columns,
  data,

  isLoading,
}: TableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [oldData, setOldData] = useState<any[]>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize] = useState<number>(5);

  const categoria = Array.from(
    new Set(data.map((item: any) => item.categoria))
  ).filter(Boolean);

  const { user } = React.useContext(AuthContext);
  const userId = user?.sub;
  const isMaster = user?.master;

  const [showMeusAtendimentos, setShowMeusAtendimentos] = useState(true);
  const [showNaoAtribuidos, setShowNaoAtribuidos] = useState(false);

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const [statusFiltro, setStatusFiltro] = useState<
    "abertos" | "fechados" | "todos"
  >("abertos");

  const filteredData = React.useMemo(() => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    if (end) {
      end.setDate(end.getDate() + 1); // torna o filtro de data final inclusivo
    }

    return data
      .filter((item: any) => {
        if (statusFiltro === "abertos") return item.status !== "FECHADO";
        if (statusFiltro === "fechados") return item.status === "FECHADO";
        return true; // "todos"
      })
      .filter((item: any) =>
        isMaster && showMeusAtendimentos ? item.responsavelId === userId : true
      )
      .filter((item: any) =>
        isMaster && showNaoAtribuidos ? !item.responsavelId : true
      )
      .filter((item: any) => {
        const itemDate = new Date(item.createdAt);
        return (!start || itemDate >= start) && (!end || itemDate < end);
      });
  }, [
    data,
    showMeusAtendimentos,
    showNaoAtribuidos,
    startDate,
    endDate,
    userId,
    isMaster,
    statusFiltro,
  ]);

  const table = useReactTable({
    getPaginationRowModel: getPaginationRowModel(),
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        // Usando um updater que recebe o estado atual
        const updatedPagination = updater({ pageIndex, pageSize });
        setPageIndex(updatedPagination.pageIndex);
      } else {
        // Caso seja um objeto direto
        setPageIndex(updater.pageIndex);
      }
    },
  });

  useEffect(() => {
    if (!isLoading) {
      setOldData(data);
    }
  }, [isLoading, data]);

  return (
    <div>
      <div className="flex items-center py-4 w-28">
        <div className="flex gap-4">
          <Input
            label="Filtro de Nº Ticket"
            value={
              (table.getColumn("numero")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("numero")?.setFilterValue(event.target.value)
            }
          />
          <Select
            label="Categorias"
            text=""
            value={
              (table.getColumn("categoria")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("categoria")?.setFilterValue(event.target.value)
            }
            options={[
              { value: "", label: "Todas as Categorias" },
              ...categoria.map((categoria) => ({
                value: categoria,
                label: categoria,
              })),
            ]}
          />
          <Input
            type="date"
            label="Data Inicial"
            value={startDate ?? ""}
            onChange={(event) => setStartDate(event.target.value || null)}
          />
          <Input
            type="date"
            label="Data Final"
            value={endDate ?? ""}
            onChange={(event) => setEndDate(event.target.value || null)}
          />

          <Select
            label="Status"
            text="Selecione o status"
            value={statusFiltro}
            onChange={(event) =>
              setStatusFiltro(
                event.target.value as "abertos" | "fechados" | "todos"
              )
            }
            options={[
              { value: "abertos", label: "Abertos" },
              { value: "fechados", label: "Fechados" },
              { value: "todos", label: "Todos" },
            ]}
          />

          {isMaster && (
            <>
              <div>
                <SelectFilter
                  label="Meus Tickets"
                  isSelected={showMeusAtendimentos}
                  onClick={() => {
                    setShowMeusAtendimentos(!showMeusAtendimentos);
                    if (!showMeusAtendimentos) setShowNaoAtribuidos(false);
                  }}
                />
              </div>
              <div>
                <SelectFilter
                  label="Novos"
                  isSelected={showNaoAtribuidos}
                  onClick={() => {
                    setShowNaoAtribuidos(!showNaoAtribuidos);
                    if (!showNaoAtribuidos) setShowMeusAtendimentos(false);
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="overflow-x-auto shadow-md rounded-2xl mr-14 max-h-[500px]  overflow-y-auto  ">
        <table className="w-full text-sm text-left text-base-text ">
          <thead className="text-base-subtitle uppercase bg-gray-100 text-center">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        scope="col"
                        className={`p-4 ${
                          header.id === "id" ? "text-center" : ""
                        }`}
                        style={{
                          width:
                            header.getSize() !== 150
                              ? header.getSize()
                              : undefined,
                        }}
                        key={header.id}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody className="text-center">
            {!isLoading && table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  className="bg-white border-b hover:bg-gray-200 transition-colors"
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 font-semibold">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <></>
            )}

            {isLoading && (
              <>
                {Array.from(
                  { length: oldData.length > 0 ? oldData.length : 5 },
                  (_, index) => index
                ).map((item) => (
                  <tr
                    key={item}
                    className="bg-white border-b hover:bg-gray-200 transition-colors"
                  >
                    {Array.from(
                      { length: table.getAllColumns().length },
                      (_, index) => index
                    ).map((elm) => (
                      <td className="p-4" key={elm}>
                        <Skeleton className="h-4 w-full rounded-xl bg-gray-300" />
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
        {!isLoading && table.getRowModel().rows?.length === 0 && (
          <div className="w-full p-8 text-center bg-white ">
            <img src={NotResult} width={185} className="m-auto mb-2" />
            <span className="font-semibold text-brand-blue-500">
              Huum... não foi possível encontrar o que procura.
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 mr-14">
        <Button
          label="Anterior"
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={!table.getCanPreviousPage()}
        ></Button>
        <Button
          label="Próximo"
          onClick={() => setPageIndex((prev) => prev + 1)}
          disabled={!table.getCanNextPage()}
        ></Button>
      </div>
    </div>
  );
}
