import { createContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";

export const DepartmentContext = createContext({
    Departments: null,
    isDepartmentsLoading: false,
    isDepartmentsError: false
})
const fetchDepartments = async () => {
    return axios.get('http://localhost:8000/department/all');
}

export const addDepartment = async (department_name) => {
    return axios.get(`http://localhost:8000/department?department_name=${department_name}`)
}
export const deleteDepartments = async (departments) => {
    try {
        const requests = departments.map((department) => axios.delete(`http://localhost:8000/department?id=${department.id}`));
        const responses = await axios.all(requests);
        return true;
    } catch (error) {
        console.error('Error:', error.message);
        return false;
    }
}
export const DepartmentProvider = ({ children }) => {
    const { isLoading: isDepartmentsLoading, isError: isDepartmentsError, data } = useQuery('departments', fetchDepartments, { staleTime: 60000, retry: false });
    const Departments = data ? data.data : [];
    const value = { Departments, isDepartmentsLoading, isDepartmentsError };
    return <DepartmentContext.Provider value={value}>{children}</DepartmentContext.Provider>
}