import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const StaffRoutes = ({element}) =>{
    const user = useSelector(state => state.user.value)
    const [resolved, setResolved] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (user.type != 'Staff'){
            toast.error('Access denied')
            navigate('/')

        }else{
            setResolved(true)

        }
    }, [user])

    return  resolved ? element : null
}