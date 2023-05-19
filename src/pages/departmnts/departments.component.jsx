import { useContext } from "react";
import CoulmnFilter from "../../components/table-help-components/tableFilter.component";
import { Container } from './departments.styles'
import { DepartmentContext } from "../../context/department.context";
import ErrorPage from "../error-page/error-page.component";
import DepartmentsTable from "../../components/departments-table/departments-table.component";

const DepartmentsPage = () => {

    const { Departments, isDepartmentsError } = useContext(DepartmentContext);

    const COLUMNS = [
        {
            Header: "ID",
            accessor: "id",
            Filter: CoulmnFilter,
            disableFilters: true
        },
        {
            Header: 'Department Name',
            accessor: 'department_name',
            Filter: CoulmnFilter
        }
    ]
    if (isDepartmentsError) {
        return (
            <ErrorPage />
        )
    }

    return (
        <Container>
            <DepartmentsTable COLUMNS={COLUMNS} DATA={Departments} />
        </Container>
    )
}
export default DepartmentsPage;