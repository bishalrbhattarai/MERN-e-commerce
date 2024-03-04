import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { clearUser, setUser } from "../store";
import { fromStorage, removeStorage } from "../lib";
import { useEffect } from "react";
import http from "../http"


export const TopNav = () =>{
    const user = useSelector(state => state.user.value)

    const dispatch = useDispatch()


    const handleLogout = ev => {
        ev.preventDefault()

        dispatch(clearUser())
        removeStorage('user_token')
    }

    useEffect(() => {
        if (Object.keys(user).length == 0) {
            const token = fromStorage('user_token')

            if (token) {
                http.get('/profile/details')
                    .then(({ data }) => {
                        dispatch(setUser(data))
                    })
                    .catch(err => {
                        if (err.response.status == 401) {
                            removeStorage('user_token')
                        }
                    })
            }
        }
    }, [user])


    return <ul className="top-nav">
        {Object.keys(user).length ? <>
            <li>
                <Link to= "/profile"><i className="fas fa-user-circle me-2"></i>{user.name}</Link>
            </li>
            <li>
                <Link to="/logout" onClick={handleLogout}><i className="fas fa-sign-out-alt me-2"></i>Log Out</Link>
            </li>
        </> : <>
        <li>
            <Link to= "/register"><i className="fas fa-user-edit me-2"></i>Register</Link>
        </li>
        <li>
            <Link to= "/login"><i className="fas fa-sign-in-alt me-2"></i>Login</Link>
        </li>
        </>}
    </ul>
}