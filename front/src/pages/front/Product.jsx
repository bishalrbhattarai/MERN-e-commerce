import { useState } from "react"
import http from "../../http"
import moment from "moment"
import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"
import { Loading, ProductBtn, ProductsList, SubmitBtn } from "../../components"
import { imgUrl, setInForm } from "../../lib"
import { useSelector } from "react-redux";



export const Product = () => {
    const user = useSelector((state) => state.user.value)

    const [product, setProduct] = useState({})
    const [loadingPage, setLoadingPage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imgLarge, setImgLarge] = useState("")
    const [similar, setSimilar] = useState([])
    const [form, setForm] = useState({})
    const [rating, setRating] = useState(0)
    const [graph, setGraph] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 })
    const [qty, setQty] = useState(1)






    
    const params = useParams()

    useEffect(() => {
        setLoadingPage(true)
        http.get(`product/${params.id}`)
            .then(({data}) => {
                setProduct(data)
                return http.get(`product/${params.id}/similar`)
            })
            .then(({ data }) => setSimilar(data))
            .catch(err => {})
            .finally(() => setLoadingPage(false))
    
    }, [params.id])

    useEffect(() => {
        if (Object.keys(product).length) {
            setImgLarge(product.images[0]);
        }
        }, [product])

    const handleSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
        
        http.post(`product/${params.id}/review`, form)
            .then(() => {
                ev.target.reset();
            
                return http.get(`product/${params.id}`);
                })
            .then(({ data }) => setProduct(data))
            .catch((err) => {})
            .finally(() => setLoading(false));
        };

    useEffect(() => {
        if (product.reviews && product.reviews.length) {
            let sum = 0
        
            let stars = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        
            for (let review of product.reviews) {
                sum += review.rating
        
                stars[review.rating] += 1
            }
        
            for (let k in stars) {
                stars[k] = (stars[k] / product.reviews.length * 100).toFixed(1)
            }
            setGraph(stars)
        
            setRating((sum / product.reviews.length).toFixed(1))
            }
        }, [product.reviews]);

    return loadingPage ? <Loading /> : Object.keys(product).length ? <div className="col-12">
    <main className="row">
        <div className="col-12 bg-white py-3 my-3">
            <div className="row">

                <div className="col-lg-5 col-md-12 mb-3">
                    <div className="col-12 mb-3">
                        <div className="img-large border" style={{backgroundImage: `url('${imgUrl(imgLarge)}')`}}></div>
                    </div>
                    <div className="col-12">
                        <div className="row">
                        {product.images.map((image, i) => (
                    <div className="col-sm-2 col-3" key={i}>
                        <div className="img-small border" style={{backgroundImage: `url('${imgUrl(image)}')`,}} onMouseEnter={() => setImgLarge(image)} ></div>
                    </div>
                    ))}
                        </div>
                    </div>
                </div>

                <div className="col-lg-5 col-md-9">
                    <div className="col-12 product-name large">
                        {product.name}
                    <small>By{" "}<Link to={`/brand/${product.brand_id}`}>{product.brand.name}</Link></small>
                    </div>
                    <div className="col-12 px-0">
                        <hr />
                    </div>
                    <div className="col-12" dangerouslySetInnerHTML={{ __html: product.summary }}>
                    </div>
                </div>

                <div className="col-lg-2 col-md-3 text-center">
                    <div className="col-12 sidebar h-100">
                        <div className="row">
                            <div className="col-12">
                                {product.discounted_price > 0 ? <>
                        <span className="detail-price">
                            Rs. {product.discounted_price}
                        </span>
                        <span className="detail-price-old">
                            Rs. {product.price}
                        </span>
                        </> : <span className="detail-price">Rs. {product.price}
                        </span>
                    }
                            </div>
                            <div className="col-xl-5 col-md-9 col-sm-3 col-5 mx-auto mt-3">
                                <div className="mb-3">
                                    <label htmlFor="qty">Quantity</label>
                                    <input type="number" id="qty" min="1" value={qty} className="form-control" required  onChange={ev => setQty(parseInt(ev.target.value ))}/>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <ProductBtn product={product} qty={qty} />
                            </div>
                            <div className="col-12 mt-3">
                                <button className="btn btn-outline-secondary btn-sm" type="button"><i className="fas fa-heart me-2"></i>Add to wishlist</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div className="col-12 mb-3 py-3 bg-white text-justify">
            <div className="row">

                <div className="col-md-7">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 text-uppercase">
                                <h2><u>Details</u></h2>
                            </div>
                            <div className="col-12" id="details" dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="col-12 px-md-4 sidebar h-100">

                        <div className="row">
                            <div className="col-12 mt-md-0 mt-3 text-uppercase">
                                <h2><u>Ratings & Reviews</u></h2>
                            </div>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-sm-4 text-center">
                                        <div className="row">
                                            <div className="col-12 average-rating">
                                                {rating}
                                            </div>
                                            <div className="col-12">
                                                of {product.reviews.length} reviews
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <ul className="rating-list mt-3">
                                            <li>
                                                <div className="progress">
                                                    <div className="progress-bar bg-dark" role="progressbar" style= {{ width: graph[5] + '%' }} aria-valuenow={graph[5]} aria-valuemin="0" aria-valuemax="100">{graph[5]}%</div>
                                                </div>
                                                <div className="rating-progress-label">
                                                    5<i className="fas fa-star ms-1"></i>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="progress">
                                                    <div className="progress-bar bg-dark" role="progressbar" style={{ width: graph[4] + '%' }} aria-valuenow={graph[4]} aria-valuemin="0" aria-valuemax="100">{graph[4]}%</div>
                                                </div>
                                                <div className="rating-progress-label">
                                                    4<i className="fas fa-star ms-1"></i>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="progress">
                                                    <div className="progress-bar bg-dark" role="progressbar" style={{ width: graph[3] + '%' }} aria-valuenow={graph[3]} aria-valuemin="0" aria-valuemax="100">{graph[3]}%</div>
                                                </div>
                                                <div className="rating-progress-label">
                                                    3<i className="fas fa-star ms-1"></i>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="progress">
                                                    <div className="progress-bar bg-dark" role="progressbar" style={{ width: graph[2] + '%' }} aria-valuenow={graph[2]} aria-valuemin="0" aria-valuemax="100">{graph[2]}%</div>
                                                </div>
                                                <div className="rating-progress-label">
                                                    2<i className="fas fa-star ms-1"></i>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="progress">
                                                    <div className="progress-bar bg-dark" role="progressbar" style={{ width: graph[1] + '%' }} aria-valuenow={graph[1]} aria-valuemin="0" aria-valuemax="100">{graph[1]}%</div>
                                                </div>
                                                <div className="rating-progress-label">
                                                    1<i className="fas fa-star ms-1"></i>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 px-md-3 px-0">
                                <hr />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <h4>Add Review</h4>
                            </div>
                            <div className="col-12">
                                {Object.keys(user).length ? <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <textarea className="form-control" placeholder="Give your review" name="comment" onChange={(ev) => setInForm(ev, form, setForm)} required></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex ratings justify-content-end flex-row-reverse">
                                            <input type="radio" value="5" name="rating" id="rating-5" checked={form.rating == 5} onChange={(ev) => setInForm(ev, form, setForm)} />
                                                <label htmlFor="rating-5"></label>
                                            <input type="radio" value="4" name="rating" id="rating-4" checked={form.rating == 4} onChange={(ev) => setInForm(ev, form, setForm)} />
                                                <label htmlFor="rating-4"></label>
                                            <input type="radio" value="3" name="rating" id="rating-3" checked={form.rating == 3} onChange={(ev) => setInForm(ev, form, setForm)} />
                                                <label htmlFor="rating-3"></label>
                                            <input type="radio" value="2" name="rating" id="rating-2" checked={form.rating == 2} onChange={(ev) => setInForm(ev, form, setForm)} />
                                                <label htmlFor="rating-2"></label>
                                            <input type="radio" value="1" name="rating" id="rating-1" checked={form.rating == 1} onChange={(ev) => setInForm(ev, form, setForm)} />
                                                <label htmlFor="rating-1"></label>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <SubmitBtn label="Add Review" icon="fa-star" loading={loading} />
                                    </div>
                                </form> : <div className="col-12 text-center py-2 px-3 mb-3 bg-gray">
                                            Please <Link to="/login">Login</Link> to add your
                                            review.
                                        </div> }
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 px-md-3 px-0">
                                <hr />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                {product.reviews.length ? product.reviews.map(review => <div className="col-12 text-justify py-2 px-3 mb-3 bg-gray" key={review._id}>
                                    <div className="row">
                                        <div className="col-12">
                                            <strong className="me-2">{review.user.name}</strong>
                                            <small>
                                                <i className="fas fa-star"></i>
                                                <i className={`${review.rating >= 2 ? 'fas' : 'far'} fa-star `}></i>
                                                <i className={`${review.rating >= 3 ? 'fas' : 'far'} fa-star `}></i>
                                                <i className={`${review.rating >= 4 ? 'fas' : 'far'} fa-star `}></i>
                                                <i className={`${review.rating == 5 ? 'fas' : 'far'} fa-star `}></i>
                                            </small>
                                        </div>
                                        <div className="col-12">
                                            {review.comment}
                                        </div>
                                        <div className="col-12">
                                            <small>
                                                <i className="fas fa-clock me-2"></i>{moment(review.createdAt).fromNow()}
                                            </small>
                                        </div>
                                    </div>
                                </div>) : <div className="col-12 text-center py-2 px-3 mb-3 bg-gray">
                                            No review given for this product.
                                        </div> }
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        {similar.length ? (<ProductsList title="Similar Products" products={similar} loading={loadingPage}/>) : null}

    </main>
</div> : null
}