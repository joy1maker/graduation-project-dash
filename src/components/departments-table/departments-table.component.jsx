import React, { useContext, useMemo, useState } from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { CheckBox } from "../table-help-components/checkbox.component";
import { Table, ButtonsContainer, Select, MyButton, TableAttatchments } from './departments-table.styles'
import { Button } from "react-bootstrap";
import ModifyModal from "../../modals/modfiying.modal";
import AddModal from "../../modals/adding.modal";
import { ModalsContext } from "../../context/modals.context";
import DeleatingModal from "../../modals/deleteing.modal";
import DeleteModal from "../../modals/deleteing.modal";
import { FormsContext } from "../../context/forms.context";

const DepartmentsTable = ({ COLUMNS, DATA }) => {

    const columns = useMemo(() => COLUMNS, [COLUMNS])

    const data = useMemo(() => DATA, [DATA]);
    const { showModifyModal, setShowModifyModal, showAddModal, setShowAddModal, showDeleteModal, setShowDeleteModal, types } = useContext(ModalsContext)
    const [modifyID, setModifyID] = useState(null);


    const handleOpenModifyModal = (id) => {
        setModifyID(id);
        setShowModifyModal(true);
    };

    const handleOpenAddModal = () => {

        setShowAddModal(true);
    };
    const handleOpenDeleteModal = () => {
        setShowDeleteModal(true);
    }
    const handleCloseModifyModal = () => {
        setShowModifyModal(false);
    };
    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };



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
    // console.log(selectedFlatRows.map(d => d.original));
    // the rows to select
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

                                            if (idx === 2) {

                                                return <td
                                                    key={idx} {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                    <Button variant="secondary" onClick={() => handleOpenModifyModal(row.values.id)}>modfiy</Button>{' '}
                                                    <Button variant="danger">delete</Button>{' '}
                                                </td>

                                            }
                                            else {
                                                return <td key={idx} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            }
                                        })
                                    }

                                </tr>
                            )

                        })
                    }

                </tbody>
            </Table>
            <TableAttatchments>
                <div>
                    <div>
                        <strong>

                            Page : {pageIndex + 1} of {pageOptions.length}
                        </strong>
                    </div>
                    <ButtonsContainer>
                        <MyButton onClick={() => previousPage()} disabled={!canPreviousPage}>previous</MyButton>
                        <MyButton onClick={() => nextPage()} disabled={!canNextPage}>next</MyButton>
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
                <Button variant="primary" onClick={handleOpenAddModal}>add department</Button>{' '}
                <Button variant="danger">delete all checked departments</Button>{' '}
                <AddModal showModal={showAddModal} closeModal={handleCloseAddModal} type={types.department} />
                <DeleteModal showModal={showDeleteModal} closeModal={handleCloseDeleteModal} deleteData={selectedFlatRows} type={types.department} />
                {modifyID && <ModifyModal showModal={showModifyModal} closeModal={handleCloseModifyModal} type={types.department} id={modifyID} />}
            </TableAttatchments>

        </>
    )
}


export default DepartmentsTable;