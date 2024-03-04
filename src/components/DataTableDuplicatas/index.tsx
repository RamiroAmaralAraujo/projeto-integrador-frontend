import { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"

import NotResult from "../../assets/NotResult.svg"

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
} from '@tanstack/react-table'
import { Button } from '../ui/button';
import * as React from 'react';


interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
}

export function DataTableDuplicatas<TData, TValue>({
  columns,
  data,

  isLoading,
}: TableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [oldData, setOldData] = useState<any[]>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

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
      columnFilters
    },
  })

  useEffect(() => {
    if (!isLoading) {
      setOldData(data)
    }
  }, [isLoading, data])



  return (
    <div>
      <div className="flex items-center py-4 ">
        <Input
          label='Filtro de Pessoas'
          value={(table.getColumn("pessoaRef")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("pessoaRef")?.setFilterValue(event.target.value)
          }
        />
      </div>
      <div className="overflow-x-auto shadow-md rounded-2xl mr-14 max-h-[500px] overflow-y-auto  ">
        <table className="w-full text-sm text-left text-base-text  ">
          <thead className="text-base-subtitle uppercase bg-gray-100 text-center">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        scope="col"
                        className={`p-4 ${header.id === 'id' ? 'text-center' : ''
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
                          header.getContext(),
                        )}
                      </th>
                    )
                  })}
                </tr>
              )
            })}
          </thead>
          <tbody className='text-center'>
            {!isLoading && table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  className="bg-white border-b hover:brightness-90"
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 font-semibold">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
                  (_, index) => index,
                ).map((item) => (
                  <tr
                    key={item}
                    className="bg-white border-b hover:brightness-90"
                  >
                    {Array.from(
                      { length: table.getAllColumns().length },
                      (_, index) => index,
                    ).map((elm) => (
                      <td className="p-4" key={elm}>
                        carregando
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
            <img src={NotResult} width={185} className='m-auto mb-2' />
            <span className='font-semibold text-brand-blue-500'>Huum... não foi possível encontrar o que procura.</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 mr-14">
        <Button
          label='Anterior'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}

        >

        </Button>
        <Button
          label='Próximo'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >

        </Button>
      </div>
    </div>

  )
}
