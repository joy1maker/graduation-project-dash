import { Outlet } from 'react-router-dom';
import SideBar from './sidebar/sidebar.component';
const Navgation = () => {
    return (
        <>
            <SideBar />
            <Outlet />
        </>

    )
}
export default Navgation;