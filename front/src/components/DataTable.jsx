import moment from "moment"
import React from "react"
import ReactDomServer from "react-dom/server"
import { useEffect, useState } from "react"
import { Col, Form, Pagination, Row, Table } from "react-bootstrap"

export const DataTable = ({data, searchable= [], sortable=[]}) =>{
    const [filtered, setFiltered] = useState(data)
    const [paginated, setPaginated] = useState([])
    const [term, setTerm] = useState('')
    const [sortBy, setSortBY] = useState('')
    const [direction, setDirection] = useState('desc')
    const [currentNo, setCurrentNo] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [offset, setOffset] = useState(0)
    const [pageMenu, setPageMenu] = useState([])

    useEffect (() => {
        if (term.length ) {
            let temp = data.filter(item => {
                for (let k of searchable){
                    let searchTerm = ''
                    if(React.isValidElement(item[k])){
                        searchTerm = ReactDomServer.renderToString(item[k])
                    } else{
                        searchTerm = `${item[k]}`
                    }
                    if(searchTerm.toLowerCase().includes(term.toLowerCase())){
                        return true
                    }
                }

                return false
            })

            setFiltered(temp)           
        }else{
            setFiltered(data)           
        }
        setSortBY('')
        setDirection('desc')
        setCurrentNo(1) 
    },[term])

    useEffect(()=>{
        let temp = (currentNo -1) * perPage
        setOffset(temp)

    },[currentNo])

    useEffect(()=>{
        let temp = [...filtered].splice(offset, perPage)
        setPaginated(temp)
    },[offset,filtered])

    useEffect(( ) =>{
        setCurrentNo(1)

        let temp = [...filtered].splice(offset, perPage)

        let total = Math.ceil(filtered.length/perPage)

        setPaginated(temp)
        setTotalPages(total)
    },[perPage, filtered])

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

    useEffect (() =>{
        if(sortBy.length){
            let sorted = [...filtered].sort((a,b) =>{
                if(isNaN(parseFloat(a[sortBy]) || isNaN(parseFloat(b[sortBy])))){
                    if(moment(a[sortBy]).isValid() && moment(b[sortBy]).isValid()){
                        return moment(a[sortBy])-moment(b[sortBy])
                    }else{
                        let x = a[sortBy].toLowerCase()
                        let y = b[sortBy].toUpperCase()
                        if(x<y){return -1}
                        if(x>y){return 1}
                        return 0
                    }

                }else{
                    return a[sortBy] - b[sortBy]
                }
            })
            if(direction == 'desc'){
                sorted.reverse()
            }
            setFiltered(sorted)
            setCurrentNo(1)
        }
    },[sortBy, direction])

    const handelSort = key =>{

        if(key == sortBy){
            if(direction == 'asc'){
                setDirection('desc')
            }else{
                setDirection('asc')
            }
        }else{
            setDirection('desc')
        }

        setSortBY(key)
    }

    return <Row>
        {data.length ? <>
            <Col md="auto">
            <Form.Select onChange={ev => setPerPage(parseInt(ev.target.value))}>
                <option value={5} selected = {perPage == 5}> 5 </option>
                <option value={10} selected = {perPage == 10}> 10 </option>
                <option value={15} selected = {perPage == 15}> 15 </option>
                <option value={20} selected = {perPage == 20}> 20 </option>
            </Form.Select>

        </Col>
        <Col lg = "3" className="mb-3 ms-auto">
            <Form.Control type="search" name="term" id="term" onChange={ ev => setTerm(ev.target.value)} />
        </Col>
        </> : null}
        <Col xs = "12">
            {paginated.length ?
                <>
                    <Table bordered striped hover size="sm">
                    <thead className="table-dark">
                        <tr>
                            {Object.keys(paginated[0]).map((key, i) => <th key={i} className={sortable.includes(key) ? 'sortable': ''} onClick={()=> {
                                if(sortable.includes(key)) {
                                    handelSort(key)
                                }
                            }}>
                                {key}
                                {sortBy == key ? <i className= {`fa-solid fa-chevron-${direction == 'desc' ? 'down' : 'up'} ms-2`}></i> : null}
                                </th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((item, i) => <tr key={i}>
                            {Object.keys(item).map((key, j) => <td key={j}>{item[key]}</td>)}
                                </tr>)}
                    </tbody>
        
                </Table>
                    {totalPages >1 ? <Pagination>
                    {pageMenu.map((item, i) =>item)}
                </Pagination> : null}
                </> :
                <h4 className="fst-italic text-muted">No data Found</h4>
            }
        </Col>
    </Row>
}