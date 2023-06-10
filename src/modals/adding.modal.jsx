import React, { useContext, useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { ModalsContext } from '../context/modals.context';
import { DepartmentContext } from '../context/department.context';
import { FormsContext } from '../context/forms.context';
import { DoctorsContext } from '../context/doctors.context';
import { Select } from './adding.styles'
const AddModal = ({ showModal, closeModal, type }) => {
    const [formData, setFormData] = useState({});
    const { types } = useContext(ModalsContext);
    const { AddFormsDefault } = useContext(FormsContext)
    const [currentSelect, setCurrentSelect] = useState(1);
    const { Departments, addDepartmentInfo } = useContext(DepartmentContext)
    const { addDoctorInfo } = useContext(DoctorsContext)
    const specailFileds = ["department"]
    const handleSubmit = (e) => {
        e.preventDefault();
        switch (type) {
            case types.department:
                const { department_name } = formData;
                addDepartmentInfo(department_name);
                break;
            case types.doctor:
                const DoctorFromData = { ...formData, department: currentSelect };
                addDoctorInfo(DoctorFromData);
                break;
            default:


        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleSelect = (event) => {
        setCurrentSelect(event.target.value);
    }
    useEffect(() => {
        const defaultForm = AddFormsDefault[type]
        setFormData(defaultForm);
    }, [type, AddFormsDefault])

    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>add info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {Object.entries(formData).map(([key, value]) => {

                        if (specailFileds.includes(key)) {
                            return <React.Fragment key={key}></React.Fragment>;
                        }
                        return (
                            <Form.Group controlId={key} key={key} style={{ margin: "20px" }}>
                                <Form.Label>{key}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={key}
                                    value={formData[key] || ""}
                                    onChange={handleChange}
                                    disabled={key === "id"}
                                />
                            </Form.Group>
                        )
                    })}
                    {

                    }
                    {
                        types.doctor === type &&
                        <Select onChange={handleSelect} value={currentSelect} >
                            {
                                Departments.map((department, idx) => <option key={idx} value={department.id}>{department.department_name}</option>)
                            }
                        </Select>
                    }
                    {/* <input type="hidden" name="_token" value="{{ csrf_token() }}" /> */}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddModal;