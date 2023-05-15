import { useContext } from "react";
import BasicTable from "../../components/react-table/react-table.component";
import CoulmnFilter from "../../components/react-table/tableFilter.component";
import { Container } from './departments.styles'
import { DepartmentContext } from "../../context/department.context";
import ErrorPage from "../error-page/error-page.component";

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
            <BasicTable COLUMNS={COLUMNS} DATA={Departments} />
        </Container>
    )
}
export default DepartmentsPage;