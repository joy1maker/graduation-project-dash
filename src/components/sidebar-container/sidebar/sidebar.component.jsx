import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ButtonContainer } from './sidebar.styles'
import Hamburger from 'hamburger-react'
import { Link } from 'react-router-dom';
const SideBar = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    return (
        <>
            <ButtonContainer>
                <Hamburger toggled={show} toggle={setShow} />
            </ButtonContainer>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header >
                    <Offcanvas.Title>Navgation</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <Link to='/' onClick={handleClose}>home page</Link>
                    <Link to='/departments' onClick={handleClose}>departements</Link>
                    <Link to='/doctors' onClick={handleClose}>doctors</Link>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
export default SideBar;