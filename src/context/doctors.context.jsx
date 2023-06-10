import { createContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";


export const DoctorsContext = createContext({
    doctors: null,
    isDoctorsLoading: false,
    isDoctorsError: false,
    updateDoctorInfo: (doctor) => null,
    addDoctorInfo: (doctor) => null,
    deleteDoctorsInfo: (doctors) => null
})
const fetchDoctors = async () => {
    return axios.get('http://localhost:8000/api/doctor-list');
}

export const addDoctor = async (doctor) => {
    const { email, password, department, first_name, last_name, national_id, reservation_phone } = doctor;
    // eslint-disable-next-line
    const result = await axios.post(
        'http://localhost:8000/api/register-doctor',
        {
            first_name,
            last_name,
            national_id,
            email,
            password,
            reservation_phone_number: reservation_phone,
            department_id: department,
            categories: "[]",
            image_name: 'defaultjpg.jpg',
        }
    );
}

export const updateDoctor = async (doctor) => {
    const { id, email, password, department, first_name, last_name, national_id, reservation_phone_number, categories, image_name } = doctor;
    const result = await axios.post(
        `http://localhost:8000/api/doctor-update/${id}`,
        {
            first_name,
            last_name,
            national_id,
            email,
            password,
            reservation_phone_number,
            department_id: department,
            categories,
            image_name: image_name,
        }
    );
    console.log(result);

}
export const deleteDoctors = async (doctors) => {
    console.log(doctors);
    try {
        const requests = doctors.map((doctor) => axios.post(`http://localhost:8000/api/doctor-destroy/${doctor.id}`));
        await axios.all(requests);
        return { "status": "200" };
    } catch (error) {
        console.error('Error:', error.message);
        return { "status": "400" };
    }
}
export const DoctorsProvider = ({ children }) => {
    const { isLoading: isDoctorsLoading, isError: isDoctorsError, data, refetch: refetchDoctors } = useQuery('doctors', fetchDoctors, { staleTime: Infinity, retry: false });
    const doctors = data ? data.data.data : [];


    const updateDoctorInfo = async (doctor) => {
        await updateDoctor(doctor);
        refetchDoctors();
    }
    const addDoctorInfo = async (doctor) => {
        await addDoctor(doctor);
        refetchDoctors();
    }
    const deleteDoctorsInfo = async (doctors) => {
        await deleteDoctors(doctors);
        refetchDoctors();
    }

    const value = { doctors, isDoctorsLoading, isDoctorsError, updateDoctorInfo, addDoctorInfo, deleteDoctorsInfo };
    return <DoctorsContext.Provider value={value}>{children}</DoctorsContext.Provider>
}