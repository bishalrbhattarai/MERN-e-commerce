import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { imgUrl } from "../../lib";
import { clearCart, editCart, removeCart } from "../../store/cart.slice";
import http from "../../http";

export const Cart = () => {
    const cart = useSelector((state) => state.cart.value);

    const [qty, setQty] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleClear = () => {
        dispatch(clearCart());
    };

    const handleEdit = (id, qty) => {
        dispatch(editCart({ id, qty }));
    };

    const handleDelete = (id) => {
        dispatch(removeCart({ id }));
    };

    const handleCheckout = () => {
        setLoading(true)

        http.post('checkout', cart)
            .then(() => {
                dispatch(clearCart())
                navigate('/profile')
            })
            .catch(err => { })
            .finally(() => setLoading(false))
    }

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
        <div className="col-12">
            <div className="row">
                <div className="col-12 mt-3 text-center text-uppercase">
                    <h2>Shopping Cart</h2>
                </div>
            </div>

            <main className="row">
                <div className="col-12 bg-white py-3 mb-3">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 col-sm-10 mx-auto table-responsive">
                            {Object.keys(cart).length ? (
                                <form className="row">
                                    <div className="col-12">
                                        <table className="table table-striped table-hover table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Price</th>
                                                    <th>Qty</th>
                                                    <th>Amount</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.keys(cart).map((id) => {
                                                    const item = cart[id];

                                                    return (
                                                        <tr key={id}>
                                                            <td>
                                                                <img src={imgUrl(item.image)} className="img-fluid me-3"
                                                                />
                                                                {item.name}
                                                            </td>
                                                            <td>Rs. {item.price}</td>
                                                            <td>
                                                                <input type="number" min="1" value={item.qty} onChange={(ev) => handleEdit(id, parseInt(ev.target.value))}
                                                                />
                                                            </td>
                                                            <td>Rs. {item.total}</td>
                                                            <td>
                                                                <button className="btn btn-link text-danger" type="button" onClick={() => handleDelete(id)}>
                                                                    <i className="fas fa-times"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th colspan="2" className="text-right">
                                                        Total
                                                    </th>
                                                    <th>{qty}</th>
                                                    <th>Rs. {total}</th>
                                                    <th></th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div className="col-12 text-right">
                                        <button className="btn btn-outline-secondary me-3" type="button" onClick={handleClear}>Clear Cart
                                        </button>
                                        <button type="button" className="btn btn-outline-success" disabled={loading} onClick={handleCheckout}>
                                            {loading ? <i className="fa-solid fa-spinner fa-spin me-2"></i> : null}
                                            Checkout
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <h4 className="text-center fst-italic text-muted">Shopping Cart is empty</h4>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
