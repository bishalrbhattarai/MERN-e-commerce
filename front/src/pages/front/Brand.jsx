import { useState } from "react"
import http from "../../http"
import { useParams } from "react-router-dom"
import { Loading, ProductCard } from "../../components"
import { useEffect } from "react"
import {  Pagination } from "react-bootstrap"

export const Brand =() =>{
    const [brand, setBrand] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentNo, setCurrentNo] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const [offset, setOffset] = useState(0)
    const [pageMenu, setPageMenu] = useState([])
    const [paginated, setPaginated] = useState([])


    const params = useParams()

    useEffect(() =>{
        setLoading(true)
        http.get(`brand/${params.id}`)
            .then(({data}) => {
                setBrand(data)
                return http.get(`brand/${params.id}/products`)
            })
            .then(({data}) => {
                setProducts(data)
                setCurrentNo(1)
            })
            .catch(err => {})
            .finally(() => setLoading(false) )
    },[params.id])

    
    useEffect(()=>{
        let temp = (currentNo -1) * perPage
        setOffset(temp)

    },[currentNo])

    useEffect(( ) =>{
        setCurrentNo(1)

        let temp = [...products].splice(offset, perPage)

        let total = Math.ceil(products.length/perPage)

        setPaginated(temp)
        setTotalPages(total)
    },[perPage, products])

    useEffect(()=>{
        let temp = [...products].splice(offset, perPage)
        setPaginated(temp)
    },[offset,products])

    useEffect(() =>{
        let temp = [
            <Pagination.Prev onClick={() => setCurrentNo(currentNo - 1)} disabled = {currentNo == 1} />
        ]

        for ( let i = 1;i<= totalPages;i++){
            temp.push(<Pagination.Item active = {i == currentNo} onClick={() => setCurrentNo(i)}>{i}</Pagination.Item>)
        }

        temp.push(<Pagination.Next onClick={() => setCurrentNo(currentNo + 1)} disabled = {currentNo == totalPages} />)

        setPageMenu(temp)
    },[currentNo,totalPages])

    return <div className="col-12">
        {loading ? <Loading /> : <main className="row">

<div className="col-12">
    <div className="row">
        <div className="col-12 py-3">
            <div className="row">
                <div className="col-12 text-center text-uppercase">
                    <h2>{brand.name}</h2>
                </div>
            </div>
            <div className="row row-cols-xl-6 row-cols-lg-4 row-cols-sm-2 justify-content-center">
                {paginated.map(product => (<ProductCard product={product} key={product._id} />))}
            </div>
        </div>
    </div>
</div>

<div className="col-12 justify-content-center d-flex">
    {totalPages >1 ? <Pagination>
        {pageMenu.map((item, i) =>item)}
    </Pagination> : null}
</div>

</main>}
    </div>

}