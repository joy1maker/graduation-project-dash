import { createContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";

export const DoctorsContext = createContext({
    doctors: null,
    isDoctorsLoading: false,
    isDoctorsError: false
})
const fetchDoctors = async () => {
    return axios.get('http://localhost:8000/doctor/all');
}
export const addDoctor = async (doctor) => {
    console.log("add the doctor info is", doctor);
}
export const deleteDoctors = async (doctors) => {
    try {
        const requests = doctors.map((doctor) => axios.delete(`http://localhost:8000/doctor?id=${doctor.id}`));
        const responses = await axios.all(requests);
        return true;
    } catch (error) {
        console.error('Error:', error.message);
        return false;
    }
}
export const DoctorsProvider = ({ children }) => {
    const { isLoading: isDoctorsLoading, isError: isDoctorsError, data } = useQuery('doctors', fetchDoctors, { staleTime: 60000, retry: false });
    const doctors = data ? data.data : [];
    const value = { doctors, isDoctorsLoading, isDoctorsError };
    return <DoctorsContext.Provider value={value}>{children}</DoctorsContext.Provider>
}