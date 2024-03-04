import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-toastify/dist/ReactToastify.min.css"
import "./Layout.css"
import "react-confirm-alert/src/react-confirm-alert.css"
import { Outlet } from "react-router-dom"
import { CmsMenu } from "./CmsMenu"

export const Layout = () => {
    return<>
    <CmsMenu />
    
    <Outlet />

    </>
}