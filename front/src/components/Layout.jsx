import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { FrontNav } from "./FrontNav";
import { useNavigate } from "react-router-dom";
import { TopNav } from "./TopNav";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const Layout = () => {
  const cart = useSelector((state) => state.cart.value);

  const [qty, setQty] = useState(0);

  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let qt = 0;
    let tl = 0;

    for (let id in cart) {
      qt += cart[id].qty;
      tl += cart[id].total;
    }
    setQty(qt);
    setTotal(tl);
  }, [cart]);

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        <div className="col-12">
          <header className="row">
            <div className="col-12 bg-dark py-2 d-md-block d-none">
              <div className="row">
                <div className="col-auto me-auto">
                  <ul className="top-nav">
                    <li>
                      <a href="tel:+9827350001">
                        <i className="fa fa-phone-square me-2"></i>+9827350001
                      </a>
                    </li>
                    <li>
                      <a href="mailto:mail@ecom.com">
                        <i className="fa fa-envelope me-2"></i>
                        bishalrajbhattarai01@gmail.com
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-auto">
                  <TopNav />
                </div>
              </div>
            </div>

            <div className="col-12 bg-white pt-4">
              <div className="row">
                <div className="col-lg-auto">
                  <div className="site-logo text-center text-lg-left">
                    <Link to="/">E-Commerce</Link>
                  </div>
                </div>
                <div className="col-lg-5 mx-auto mt-4 mt-lg-0">
                  <form action="#">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="search"
                          className="form-control border-dark"
                          placeholder="Search..."
                          onChange={(ev) =>
                            navigate(`/search?term=${ev.target.value}`, {
                              replace: true,
                            })
                          }
                          required
                        />
                        <button className="btn btn-outline-dark">
                          <i className="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-auto text-center text-lg-left header-item-holder">
                  <a href="#" className="header-item">
                    <i className="fas fa-heart me-2"></i>
                    <span id="header-favorite">0</span>
                  </a>
                  <Link to="/cart" className="header-item">
                    <i className="fas fa-shopping-bag me-2"></i>
                    <span id="header-qty" className="me-3">
                      {qty}
                    </span>
                    <i className="fas fa-money-bill-wave me-2"></i>
                    <span id="header-price">Rs.{total}</span>
                  </Link>
                </div>
              </div>

              <FrontNav />
            </div>
          </header>
        </div>

        <Outlet />

        <div className="col-12 align-self-end">
          <footer className="row">
            <div className="col-12 bg-dark text-white pb-3 pt-5">
              <div className="row">
                <div className="col-lg-2 col-sm-4 text-center text-sm-left mb-sm-0 mb-3">
                  <div className="row">
                    <div className="col-12">
                      <div className="footer-logo">
                        <a href="index.html">E-Commerce</a>
                      </div>
                    </div>
                    <div className="col-12">
                      <address>Kathmandu, Nepal</address>
                    </div>
                    <div className="col-12">
                      <a href="#" className="social-icon">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="social-icon">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="social-icon">
                        <i className="fab fa-pinterest-p"></i>
                      </a>
                      <a href="#" className="social-icon">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#" className="social-icon">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-8 text-center text-sm-left mb-sm-0 mb-3">
                  <div className="row">
                    <div className="col-12 text-uppercase">
                      <h4>Who are we?</h4>
                    </div>
                    <div className="col-12 text-justify">
                      <p>
                        Welcome to E-commerce , where passion meets quality. We
                        are more than just an online store; we are enthusiasts
                        dedicated to bringing you the finest Your Niche or
                        Product Category products.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-sm-3 col-5 ms-lg-auto ms-sm-0 ms-auto mb-sm-0 mb-3">
                  <div className="row">
                    <div className="col-12 text-uppercase">
                      <h4>Quick Links</h4>
                    </div>
                    <div className="col-12">
                      <ul className="footer-nav">
                        <li>
                          <a href="#">Home</a>
                        </li>
                        <li>
                          <a href="#">Contact Us</a>
                        </li>
                        <li>
                          <a href="#">About Us</a>
                        </li>
                        <li>
                          <a href="#">Privacy Policy</a>
                        </li>
                        <li>
                          <a href="#">Terms & Conditions</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1 col-sm-2 col-4 me-auto mb-sm-0 mb-3">
                  <div className="row">
                    <div className="col-12 text-uppercase text-underline">
                      <h4>Help</h4>
                    </div>
                    <div className="col-12">
                      <ul className="footer-nav">
                        <li>
                          <a href="#">FAQs</a>
                        </li>
                        <li>
                          <a href="#">Shipping</a>
                        </li>
                        <li>
                          <a href="#">Returns</a>
                        </li>
                        <li>
                          <a href="#">Track Order</a>
                        </li>
                        <li>
                          <a href="#">Report Fraud</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 text-center text-sm-left">
                  <div className="row">
                    <div className="col-12 text-uppercase">
                      <h4>Write to us</h4>
                    </div>
                    <div className="col-12">
                      <form action="#">
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your email..."
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <button className="btn btn-outline-light text-uppercase">
                            Subscribe
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
