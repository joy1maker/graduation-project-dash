import React, { useContext, useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { ModalsContext } from '../context/modals.context';
import { addDepartment } from '../context/department.context';
import { FormsContext } from '../context/forms.context';
const AddModal = ({ showModal, closeModal, type, data }) => {
    const [formData, setFormData] = useState({});
    const { types } = useContext(ModalsContext);
    const { AddFormsDefault } = useContext(FormsContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        switch (type) {
            case types.department:
                const { department_name } = data;
                addDepartment(department_name);
                break;
            case types.doctor:

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

        const defaultForm = AddFormsDefault[type]
        console.log(defaultForm);
        setFormData(defaultForm);
    }, [type])

    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>add info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {Object.entries(formData).map(([key, value]) => (
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
                    ))}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddModal;