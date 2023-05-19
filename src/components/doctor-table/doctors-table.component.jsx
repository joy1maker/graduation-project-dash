import React, { useMemo, useState } from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { CheckBox } from "../table-help-components/checkbox.component";
import { Table, ButtonsContainer, Select } from './doctor-table.styles'
import { Button } from "react-bootstrap";
import { ModalsContext } from "../../context/modals.context";
import { useContext } from "react";
import ModifyModal from "../../modals/modfiying.modal";
import AddModal from "../../modals/adding.modal";
import DeleteModal from "../../modals/deleteing.modal";

const DoctorsTable = ({ COLUMNS, DATA }) => {

    const columns = useMemo(() => COLUMNS, [COLUMNS])

    const data = useMemo(() => DATA, [DATA]);
    const { showModifyModal, setShowModifyModal, showAddModal, setShowAddModal, showDeleteModal, setShowDeleteModal, types } = useContext(ModalsContext)
    const [modifyID, setModifyID] = useState(null);
    const [deleteData, setDeleteData] = useState([]);

    const handleOpenModifyModal = (id) => {
        setModifyID(id);
        setShowModifyModal(true);
    };

    const handleOpenAddModal = () => {

        setShowAddModal(true);
    };
    const handleOpenDeleteModal = (data) => {
        console.log("called")
        setDeleteData(data);
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
        selectedFlatRows,
        allColumns,
        getToggleHideAllColumnsProps,
        setHiddenColumns

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
    React.useEffect(
        () => {
            setHiddenColumns(
                columns.filter(column => !column.show).map(column => column.id)
            );
        },
        [columns]
    );
    // console.log(selectedFlatRows.map(d => d.original));

    const { pageIndex, pageSize } = state;
    return (
        <>
            <div style={{ display: "flex", gap: "30px" }}>
                <div>
                    <CheckBox {...getToggleHideAllColumnsProps()} />
                    Toggle All
                </div>
                {
                    allColumns.map((coulmn) => (
                        <div key={coulmn.id}>
                            {coulmn.id !== "select" &&
                                <div>

                                    <input type="checkbox" {...coulmn.getToggleHiddenProps({ checked: false })} />
                                    {coulmn.render('Header')}
                                </div>}
                        </div>
                    ))
                }
            </div>
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
                                                    <Button variant="danger" onClick={() => handleOpenDeleteModal(row.values)}>delete</Button>{' '}
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
            <Button variant="primary" onClick={handleOpenAddModal}>add doctor</Button>{' '}
            <Button variant="danger" onClick={() => handleOpenDeleteModal(selectedFlatRows.map(d => d.original))}>delete all checked departments</Button>{' '}
            <AddModal showModal={showAddModal} closeModal={handleCloseAddModal} type={types.doctor} />
            <DeleteModal showModal={showDeleteModal} closeModal={handleCloseDeleteModal} deleteData={deleteData} type={types.doctor} />
            {modifyID && <ModifyModal showModal={showModifyModal} closeModal={handleCloseModifyModal} type={types.doctor} id={modifyID} />}
        </>
    )
}


export default DoctorsTable;