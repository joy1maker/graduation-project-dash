import React, { useContext, useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { FormsContext } from '../context/forms.context';
import { ModalsContext } from '../context/modals.context';
import { Select } from './adding.styles';
import { DepartmentContext } from '../context/department.context';
import { DoctorsContext } from '../context/doctors.context';
const ModifyModal = ({ showModal, closeModal, type, id }) => {
    const [formData, setFormData] = useState({});
    const hidden = ["id", "catigores", "image_name", "created_at", "updated_at", "password", "department_id"]
    const { types } = useContext(ModalsContext);
    const { Departments, updateDepartmentInfo } = useContext(DepartmentContext)
    const { updateDoctorInfo } = useContext(DoctorsContext);


    const handleSelect = (event) => {
        console.log(event.target.value);
        setCurrentSelect(event.target.value);
    }
    const [currentSelect, setCurrentSelect] = useState(1);
    const specailFileds = ["department"]
    const { getModifyFormData } = useContext(FormsContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        switch (type) {
            case types.department:
                updateDepartmentInfo(formData);
                break;
            case types.doctor:
                const DoctorFromData = { ...formData, department: currentSelect };
                updateDoctorInfo(DoctorFromData)
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
    useEffect(() => {
        const d = getModifyFormData(type, id)
        setFormData(d);
        // eslint-disable-next-line
    }, [type, id])

    return (
        <Modal show={showModal} onHide={closeModal} >
            <Modal.Header closeButton>
                <Modal.Title>modify information</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form onSubmit={handleSubmit} style={{ maxHeight: "500px", overflowY: "scroll" }}>
                    {Object.entries(formData).map(([key, value]) => {
                        if (specailFileds.includes(key)) {
                            return <React.Fragment key={key}></React.Fragment>;
                        }
                        return (
                            <Form.Group controlId={key} key={key} style={{ margin: "20px" }}>
                                <Form.Label style={{ display: hidden.includes(key) ? "none" : "unset" }}>{key}</Form.Label>
                                <Form.Control style={{ display: hidden.includes(key) ? "none" : "unset" }}
                                    type="text"
                                    name={key}
                                    value={formData[key] || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        )
                    })}
                    {
                        types.doctor === type &&
                        <Select onChange={handleSelect} value={currentSelect} >
                            {
                                Departments.map((department, idx) => <option key={idx} value={department.id}>{department.department_name}</option>)
                            }
                        </Select>
                    }
                    <Button variant="warning" type="submit">
                        add
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModifyModal;