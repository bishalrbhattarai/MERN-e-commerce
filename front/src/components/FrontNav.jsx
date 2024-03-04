import { useEffect, useState } from "react"
import http from "../http"
import {NavLink, Link} from "react-router-dom"
import {NavDropdown} from "react-bootstrap"

export const FrontNav = () =>{
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])

    useEffect(() => {
        http.get('category/all')
            .then(({data}) => {
                setCategories(data)

                return http.get('brand/all')
            })
            .then(({data}) => setBrands(data))
            .catch(err => {})
    },[])

    return <div className="row">
        <nav className="navbar navbar-expand-lg navbar-light bg-white col-12">
            <button className="navbar-toggler d-lg-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mainNav">
                <ul className="navbar-nav mx-auto mt-2 mt-lg-0">
                    <li className="nav-item ">
                        <NavLink to="/" className="nav-link">Home</NavLink> 
                    </li>
                    <NavDropdown title="Categories">
                        {categories.map(category => <Link className="dropdown-item" to={`/category/${category._id}`} key={category._id}>{category.name}</Link>) }
                    </NavDropdown>
                    <NavDropdown title="Brands">
                        {brands.map(brand => <Link className="dropdown-item" to={`/brand/${brand._id}`} key={brand._id}>{brand.name}</Link>) }
                    </NavDropdown>

                </ul>
            </div>
        </nav>
    </div>
}