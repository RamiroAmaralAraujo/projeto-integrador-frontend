import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

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

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
}

export function DataTablePedidos<TData, TValue>({
  columns,
  data,
  isLoading,
}: TableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [oldData, setOldData] = useState<any[]>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    getPaginationRowModel: getPaginationRowModel(),
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  useEffect(() => {
    if (!isLoading) {
      setOldData(data);
    }
  }, [isLoading, data]);

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          label="Filtro de Pedidos"
          value={
            (table.getColumn("idPedido")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) => {
            const filterValue = event.target.value;
            // Verifica se o valor digitado é um número
            const numericFilterValue = filterValue !== "" ? Number(filterValue) : null;
            table.getColumn("idPedido")?.setFilterValue(numericFilterValue);
          }}          
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-2xl mr-14 max-h-[500px] overflow-y-auto">
        <table className="w-full text-sm text-center text-base-text table-fixed">
          <thead className="text-base-subtitle uppercase bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        scope="col"
                        className={`p-4 ${header.id === "id" ? "text-center" : ""}`}
                        style={{
                          width:
                            header.id === "pedidoProdutos"
                              ? "25%"
                              : header.id === "observacao"
                                ? "35%"
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
                  className="bg-white border-b hover:brightness-90"
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-4 text-center font-semibold items-center"
                      style={{
                        maxWidth:
                          cell.column.id === "pedidoProdutos" ||
                          cell.column.id === "observacao"
                            ? "150px"
                            : undefined,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
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
                    className="bg-white border-b hover:brightness-90"
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
          <div className="w-full p-8 text-center bg-white">
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
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        ></Button>
        <Button
          label="Próximo"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        ></Button>
      </div>
    </div>
  );
}
