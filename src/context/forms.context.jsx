import { createContext, useContext } from "react";
import { DoctorsContext } from "./doctors.context";
import { DepartmentContext } from "./department.context";
import { ModalsContext } from "./modals.context";

export const FormsContext = createContext({
    AddFormsDefault: null,
    getModifyFormData: (type) => null
})


export const FormsProvider = ({ children }) => {
    const { doctors } = useContext(DoctorsContext);
    const { Departments } = useContext(DepartmentContext);
    const { types } = useContext(ModalsContext);
    const AddFormsDefault = {
        [types.department]: { department_name: "" },
        [types.doctor]: {
            email: '',
            password: '',
            department: '',
            first_name: '',
            last_name: ''
        }
    }
    const getModifyFormData = (type, id) => {
        switch (type) {
            case types.department:
                return Departments.find((department) => department.id === id)
            case types.doctor:
                return doctors.find((doctor) => doctor.id === id)

            default:
                return {}

        }
    }
    const value = { AddFormsDefault, getModifyFormData };
    return <FormsContext.Provider value={value}>{children}</FormsContext.Provider>
}