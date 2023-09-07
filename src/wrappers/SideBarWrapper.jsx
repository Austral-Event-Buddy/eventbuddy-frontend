import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const styles={
    display:"flex",
    flexDirection:"row"
}

export default function SideBarWrapper(){
    return <main style={styles}>
        <SideBar/>
        <Outlet/>
    </main>
}