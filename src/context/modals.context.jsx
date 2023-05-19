import { createContext, useState } from "react";

export const ModalsContext = createContext({
    showModifyModal: false,
    setShowModifyModal: () => null,
    showAddModal: false,
    setShowAddModal: () => null,
    showDeleteModal: false,
    setShowDeleteModal: () => null,
    types: {
        department: "department",
        doctor: "doctor"
    }
})

export const ModalsProvider = ({ children }) => {
    const types = {
        department: "department",
        doctor: "doctor"
    }
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const value = { showModifyModal, setShowModifyModal, showAddModal, setShowAddModal, showDeleteModal, setShowDeleteModal, types };
    return <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>
}