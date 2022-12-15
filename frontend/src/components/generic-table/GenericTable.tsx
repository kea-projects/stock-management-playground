import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

interface GenericTableProps<T> {
    data: T[]
    columns: ColumnDef<T>[]
}

export function GenericTable<T>({ data, columns }: GenericTableProps<T>) {
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })
    return (
        <Table>
            <Thead>
                {table.getHeaderGroups().map((header) => (
                    <Tr key={header.id}>
                        {header.headers.map((header) => (
                            <Th key={header.id}>
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody>
                {table.getRowModel().rows.map((row) => (
                    <Tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <Td key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
        </Table>
    )
}
