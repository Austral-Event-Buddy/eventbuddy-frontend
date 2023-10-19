import { Outlet } from "react-router-dom";

import SideBar from "../components/SideBar";


const styles = {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    overflow: "hidden"
}

export default function SideBarWrapper(){
    return <main style={styles}>
        <SideBar/>
        <Outlet/>
    </main>
}