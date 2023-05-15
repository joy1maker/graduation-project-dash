import React, { useMemo } from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { CheckBox } from "./checkbox.component";
import { Table, ButtonsContainer, Select } from './react-table.styles'

const BasicTable = ({ COLUMNS, DATA }) => {

    const columns = useMemo(() => COLUMNS, [COLUMNS])
    const data = useMemo(() => DATA, [DATA]);


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state,
        prepareRow,
        setPageSize,
        selectedFlatRows

    } = useTable(
        {
            columns,
            data
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((coulmns) => {
                return [
                    {
                        id: 'select',
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <div>
                                <CheckBox {...getToggleAllRowsSelectedProps()} />
                            </div>
                        ),
                        Cell: ({ row }) => (
                            <div>
                                <CheckBox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...coulmns,
                ]
            })
        }
    );
    console.log(selectedFlatRows.map(d => d.original));

    const { pageIndex, pageSize } = state;
    return (
        <>
            <Table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup, idx) => (
                            <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map((column, idx) => (

                                        <th key={idx} {...column.getHeaderProps(column.getSortByToggleProps())} >
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                                            </span>
                                            <span style={{ paddingLeft: "70px" }}>{column.canFilter ? column.render('Filter') : null}</span>
                                        </th>

                                    ))
                                }


                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map((row, idx) => {
                            prepareRow(row);
                            return (
                                <tr key={idx} {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell, idx) => {

                                            return <td key={idx} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }

                                </tr>
                            )

                        })
                    }

                </tbody>
            </Table>
            <div>
                <div>
                    <strong>

                        Page : {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </div>
                <ButtonsContainer>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>previous</button>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>next</button>
                </ButtonsContainer>
            </div>
            <Select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                {
                    [10, 25, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    )

                    )
                }
            </Select>

        </>
    )
}


export default BasicTable;