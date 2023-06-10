import React, { useContext, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ModalsContext } from '../context/modals.context';
import { DepartmentContext } from '../context/department.context';
import { DoctorsContext } from '../context/doctors.context';

const DeleteModal = ({ showModal, closeModal, deleteData, type }) => {

    const { types } = useContext(ModalsContext)
    const { deleteDoctorsInfo } = useContext(DoctorsContext)
    const { deleteDepartmentsInfo } = useContext(DepartmentContext);
    const handleDeleation = () => {

        switch (type) {
            case types.department:
                return deleteDepartmentsInfo(deleteData);

            case types.doctor:
                return deleteDoctorsInfo(deleteData);

            default:

        }

    }
    useEffect(() => {
        console.log(deleteData);
    }, [deleteData])
    return (
        <>
            <Modal show={showModal} onHide={closeModal} >
                <Modal.Header closeButton>
                    <Modal.Title>delete selected information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    are you sure you want to delete selected items ?
                </Modal.Body>
                <Modal.Footer>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>no</Button>
                        <Button variant="danger" onClick={handleDeleation}>yes</Button>
                    </Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteModal;