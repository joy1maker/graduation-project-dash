import { createContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";

export const DepartmentContext = createContext({
    Departments: null,
    isDepartmentsLoading: false,
    isDepartmentsError: false,
    addDepartmentInfo: (department_name) => null,
    deleteDepartmentsInfo: (departments) => null,
    updateDepartmentInfo: (department) => null

})
const fetchDepartments = async () => {
    return axios.get('http://localhost:8000/api/department-list');
}

export const addDepartment = async (department_name) => {
    return axios.post(`http://localhost:8000/api/department-store?department_name=${department_name}`)
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
export const updateDepartment = async (department) => {
    const { department_name, id } = department;
    axios.post(`http://localhost:8000/api/department-update/${id}?department_name=${department_name}`)
}
export const DepartmentProvider = ({ children }) => {
    const { isLoading: isDepartmentsLoading, isError: isDepartmentsError, data, refetch: refetchDepartments } = useQuery('departments', fetchDepartments, { staleTime: Infinity, retry: false });
    const Departments = data ? data.data.data : [];
    const addDepartmentInfo = async (department_name) => {
        await addDepartment(department_name);
        refetchDepartments();
    }
    const deleteDepartmentsInfo = async (departments) => {
        await deleteDepartments(departments);
        refetchDepartments();
    }
    const updateDepartmentInfo = async (department) => {
        await updateDepartment(department);
        refetchDepartments();
    }
    const value = { Departments, isDepartmentsLoading, isDepartmentsError, addDepartmentInfo, deleteDepartmentsInfo, updateDepartmentInfo };
    return <DepartmentContext.Provider value={value}>{children}</DepartmentContext.Provider>
}