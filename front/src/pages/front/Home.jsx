import { Carousel } from "react-bootstrap"
import slider1 from "../../assets/slider-1.jpg"
import slider2 from "../../assets/slider-2.jpg"
import slider3 from "../../assets/slider-3.jpg"
import { useEffect, useState } from "react"
import http from "../../http"
import { ProductsList } from "../../components"

export const Home = () =>{

    const [featured, setFeatured] = useState([])
    const [latest, setLatest] = useState([])
    const [topSelling, setTopSelling] = useState([])
    const [loadingFeat, setLoadingFeat] = useState(false)
    const [loadingLate, setLoadingLate] = useState(false)
    const [loadingTop, setLoadingTop] = useState(false)


    useEffect(() => {
        setLoadingFeat(true)
        setLoadingLate(true)
        setLoadingTop(true)

        http.get('product/featured')
            .then(({data}) => setFeatured(data))
            .catch( err => {})
            .finally(() => setLoadingFeat(false))

        http.get('product/latest')
            .then(({data}) => setLatest(data))
            .catch( err => {})
            .finally(() => setLoadingLate(false))


        http.get('product/top-selling')
            .then(({data}) => setTopSelling(data))
            .catch( err => {})
            .finally(() => setLoadingTop(false))

    }, [])

    return <div className="col-12">
        <main className="row">
            <div className="col-12 px-0">
                <Carousel>
                    <Carousel.Item>
                        <img className="d-block w-100"  src={slider1} alt="First slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100"  src={slider2} alt="First slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100"  src={slider3} alt="First slide"/>
                    </Carousel.Item>
                </Carousel>
            </div>

            <ProductsList title= "Featured Products" products={[...featured].splice(0,4)} loading={loadingFeat} />
            
            <div className="col-12">
                <hr />
            </div>

            <ProductsList title= "Latest Products" products={[...latest].splice(0,4)} loading={loadingLate} latest />
            
            <div className="col-12">
                <hr />
            </div>

            <ProductsList title= "Top Selling Products" products={[...topSelling].splice(0,4)} loading={loadingTop} />
            

            <div className="col-12 py-3 bg-light d-sm-block d-none">
                <div className="row">
                    <div className="col-lg-3 col ms-auto large-holder">
                        <div className="row">
                            <div className="col-auto ms-auto large-icon">
                                <i className="fas fa-money-bill"></i>
                            </div>
                            <div className="col-auto me-auto large-text">
                                Best Price
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col large-holder">
                        <div className="row">
                            <div className="col-auto ms-auto large-icon">
                                <i className="fas fa-truck-moving"></i>
                            </div>
                            <div className="col-auto me-auto large-text">
                                Fast Delivery
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col me-auto large-holder">
                        <div className="row">
                            <div className="col-auto ms-auto large-icon">
                                <i className="fas fa-check"></i>
                            </div>
                            <div className="col-auto me-auto large-text">
                                Genuine Products
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
}