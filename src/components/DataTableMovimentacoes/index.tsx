import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import NotResult from "../../assets/NotResult.svg";
import { Printer } from 'lucide-react'

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

export function DataTableMovimentacoes<TData, TValue>({
  columns,
  data,
  isLoading,
}: TableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filteredData, setFilteredData] = useState<TData[]>(data);
  const [oldData, setOldData] = useState<TData[]>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize] = useState<number>(5);

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
        const updatedPagination = updater({ pageIndex, pageSize });
        setPageIndex(updatedPagination.pageIndex);
      } else {
        setPageIndex(updater.pageIndex);
      }
    },
  });

  useEffect(() => {
    if (!isLoading) {
      setOldData(data);

      // Aplica a filtragem por data
      const filtered = data.filter((item: any) => {
        const itemDate = new Date(item.data); // Ajuste caso o formato de `data` seja diferente
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        // Adiciona 1 dia na data final apenas para comparação
        if (end) {
          end.setDate(end.getDate() + 1);
        }

        return (!start || itemDate >= start) && (!end || itemDate < end); // Note que `end` agora é exclusivo
      });

      setFilteredData(filtered);
    }
  }, [isLoading, data, startDate, endDate]);

  return (
    <div>
      <div className="flex items-center py-4 gap-2">
        <Input
          label="Pesquisar"
          value={
            (table.getColumn("produtoNome")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("produtoNome")?.setFilterValue(event.target.value)
          }
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
      </div>

      <div className="overflow-x-auto shadow-md rounded-2xl mr-14 max-h-[500px] overflow-y-auto">
        <table className="w-full text-sm text-center text-base-text table-fixed">
          <thead className="text-base-subtitle uppercase bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
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
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-center">
            {!isLoading && table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  className="bg-white border-b hover:bg-gray-200 transition-colors"
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
          icon={<Printer size={20} />}
          onClick={() => {
            const printWindow = window.open(
              "",
              "_blank",
              "width=800,height=600"
            );
            if (printWindow) {
              const content = `
        <html>
          <head>
            <title>Movimentações Filtradas</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                line-height: 1.6;
                color: #333;
              }
              header {
                background-color: #08264D;
                color: white;
                padding: 20px;
                text-align: center;
              }
              header h1 {
                margin: 0;
                font-size: 1.8rem;
              }
              .content {
                padding: 20px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: center;
              }
              th {
                background-color: #f4f4f4;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <header>
              <h1>Movimentações Filtradas</h1>
            </header>
            <div class="content">
              <table>
                <thead>
                  <tr>
                  ${table
                    .getHeaderGroups()
                    .map((headerGroup) =>
                      headerGroup.headers
                        .map((header) => {
                          let headerContent = 
                            typeof header.column.columnDef.header === 'function'
                              ? header.column.columnDef.header(header.getContext())
                              : header.column.columnDef.header;
                  
                          // Caso o header seja um componente React ou objeto, extraia apenas o texto
                          if (typeof headerContent === 'object' && headerContent !== null) {
                            // Tente obter texto diretamente dos filhos (se for React)
                            headerContent = headerContent.props?.children;
                  
                            // Caso `children` seja um array, converta para string
                            if (Array.isArray(headerContent)) {
                              headerContent = headerContent
                                .map((child) => (typeof child === 'string' ? child : ''))
                                .join('');
                            }
                  
                            // Como fallback, use uma string vazia se ainda não for texto
                            headerContent = typeof headerContent === 'string' ? headerContent : '';
                          }
                  
                          return `<th>${headerContent || ''}</th>`;
                        })
                        .join("")
                    )
                    .join("")}
                  
                  
                  
                  </tr>
                </thead>
                <tbody>
                  ${filteredData
                    .map(
                      (item: any) =>
                        `<tr>${table
                          .getAllColumns()
                          .map((column) => {
                            const cellValue = column.accessorFn
                              ? column.id === "data" // Verifica se a coluna é de data
                                ? new Date(
                                    column.accessorFn(
                                      item,
                                      table.getAllColumns().indexOf(column)
                                    ) as string | number | Date
                                  ).toLocaleDateString("pt-BR")
                                : column.accessorFn(
                                    item,
                                    table.getAllColumns().indexOf(column)
                                  )
                              : "";

                            return `<td>${cellValue}</td>`;
                          })
                          .join("")}</tr>`
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          </body>
        </html>
      `;

              printWindow.document.write(content);
              printWindow.document.close();
              printWindow.print();
            }
          }}
        ></Button>

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
