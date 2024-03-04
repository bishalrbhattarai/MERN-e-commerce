import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { removeStorage } from "../lib"
import { clearUser } from "../store"

export const CmsMenu = () => {
    const user = useSelector(state => state.user.value)

    const dispatch = useDispatch()
    
    const handelLogout = () =>{
        removeStorage('user_token')
        dispatch(clearUser())
    }

    return Object.keys(user).length ? <Navbar bg="dark" variant="dark" expand= "lg">
        <Container>
            <Link to = "/" className="navbar-brand"><img src="ecom.jpg" width={50}></img></Link>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav className="me-auto mb-2 mb-lg-0">
                {user.type == 'Admin' ? <Nav.Item>
                        <NavLink  to="/staffs" className="nav-link "><i className="fa-solid fa-users me-2"></i>Staffs</NavLink>
                    </Nav.Item> : null}
                    <Nav.Item>
                        <NavLink  to="/categories" className="nav-link "><i className="fa-solid fa-th-list me-2"></i>Categories</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink  to="/brands" className="nav-link "><i className="fa-solid fa-star me-2"></i>Brands</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink  to="/products" className="nav-link "><i className="fa-solid fa-gifts me-2"></i>Products</NavLink>
                    </Nav.Item>
                {user.type == 'Staff'  ? <Nav.Item>
                    <NavLink  to="/customers" className="nav-link "><i className="fa-solid fa-users me-2"></i>Customer</NavLink>
                </Nav.Item> : null}
                <Nav.Item>
                    <NavLink  to="/reviews" className="nav-link "><i className="fa-solid fa-comments me-2"></i>Reviews</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink  to="/orders" className="nav-link "><i className="fa-solid fa-money-bill me-2"></i>Orders</NavLink>
                </Nav.Item>
                </Nav>
                
                <Nav className=" mb-2 mb-lg-0">
                    <NavDropdown title={<>
                    <i className="fa-solid fa-user-circle me-2"></i> {user.name}
                    </>} align="end">
                        <Link to="/profile/edit " className="dropdown-item">
                            <i className="fa-solid fa-user-edit me-2"></i>Edit Profile
                        </Link>
                        <Link to="profile/password " className="dropdown-item">
                            <i className="fa-solid fa-asterisk me-2"></i>Change Password
                        </Link>
                        <NavDropdown.Divider />
                        <Button variant="link" className="dropdown-item rounded-0"  onClick={handelLogout}>
                            <i className="fa-solid fa-sign-out-alt me-2" ></i> Log Out
                        </Button>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>:null

}