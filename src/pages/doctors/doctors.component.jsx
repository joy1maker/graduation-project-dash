import { Container } from '../departmnts/departments.styles'
import CoulmnFilter from "../../components/table-help-components/tableFilter.component";
import ErrorPage from "../error-page/error-page.component";
import DoctorsTable from '../../components/doctor-table/doctors-table.component';
import { useContext } from 'react';
import { DoctorsContext } from '../../context/doctors.context';

const DoctorsPage = () => {
    const { doctors, isDoctorsError } = useContext(DoctorsContext);
    const COLUMNS = [
        {
            Header: "ID",
            accessor: "id",
            Filter: CoulmnFilter,
            disableFilters: true
        },
        {
            Header: 'Email',
            accessor: 'email',
            Filter: CoulmnFilter
        },
        {
            Header: 'First Name',
            accessor: 'first_name',
            Filter: CoulmnFilter
        },
        {
            Header: 'Last Name',
            accessor: 'last_name',
            Filter: CoulmnFilter
        },
        {
            Header: 'Phone Number',
            accessor: 'reservation_phone_number',
            Filter: CoulmnFilter
        },
        {
            Header: 'National ID',
            accessor: 'national_id',
            Filter: CoulmnFilter
        },
        {
            Header: 'Departmnet Name',
            accessor: 'department_name',
            Filter: CoulmnFilter,
            show: false
        },


    ]
    if (isDoctorsError) {
        return (
            <ErrorPage />
        )
    }

    return (
        <>
            <Container>
                <DoctorsTable COLUMNS={COLUMNS} DATA={doctors} />
            </Container>
        </>
    )
}
export default DoctorsPage;