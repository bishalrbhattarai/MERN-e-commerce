import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const AdminRoutes = ({element}) =>{
    const user = useSelector(state => state.user.value)
    const [resolved, setResolved] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if(Object.keys(user).length){
            if (user.type != 'Admin'){
                toast.error('Access denied')
                navigate('/')
    
            }else{
                setResolved(true)
    
            }
        }
    }, [user])

    return  resolved ? element : null
}