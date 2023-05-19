import React, { useContext, useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { FormsContext } from '../context/forms.context';
const ModifyModal = ({ showModal, closeModal, type, id }) => {
    const [formData, setFormData] = useState({});
    const disabled = ["id", "catigores", "image_name", "department_name"]

    const { getModifyFormData } = useContext(FormsContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
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
    }, [type, id])

    return (
        <Modal show={showModal} onHide={closeModal} >
            <Modal.Header closeButton>
                <Modal.Title>modify information</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form onSubmit={handleSubmit} style={{ maxHeight: "500px", overflowY: "scroll" }}>
                    {Object.entries(formData).map(([key, value]) => (
                        <Form.Group controlId={key} key={key} style={{ margin: "20px" }}>
                            <Form.Label>{key}</Form.Label>
                            <Form.Control
                                type="text"
                                name={key}
                                value={formData[key] || ""}
                                onChange={handleChange}
                                disabled={disabled.includes(key)}
                            />
                        </Form.Group>
                    ))}
                    <Button variant="warning" type="submit">
                        add
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModifyModal;