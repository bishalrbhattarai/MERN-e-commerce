import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fromStorage, removeStorage } from "../lib"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import http from "../http"
import {  setUser } from "../store"
import { Loading } from "../components"

 export const PrivateRoutes = ({element}) =>{
    const [loading, setLoading] = useState(false)

    const user = useSelector(state => state.user.value)

    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        if(Object.keys(user).length == 0){
            const token = fromStorage('user_token')

            if (token){
                setLoading(true)

                http.get('/profile/details')
                    .then(({data}) =>{
                        dispatch(setUser(data))
                    })
                    .catch(err=>{
                        if(err.response.status == 401){
                        removeStorage('user_token')
                        toast.error('please login to continue')
                        navigate('/login')
                        }
                    })
                    .finally(()=> setLoading(false))
            }else{
                toast.error('please login to continue')
                navigate('/login')
            }
        }
    }, [user])

    return loading ? <Loading /> : element
}