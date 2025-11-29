import { useEffect } from "react";
import { useState } from "react";

export const useFetch =  (url, options= {}, dependencies=[])=> {
    const [data, setData] = useState()
    const [loading, setLoading]= useState(false)
    const [error, setError]= useState()

    useEffect(()=>{
       
            const fetData = async ()=>{
                setLoading(true)
                try {
                const responce = await fetch(url,options) 
                const responceData = await responce.json()
                if(!responce){
                    throw new Error(`Error: ${responce.responce.statusText}, ${responce.responce.status}`)
                }
                setData(responceData)
                setError()
            }
        catch (error) {
            setError(error)
        }finally {
            setLoading(false)
        }
    } 
            fetData()
        },dependencies)
   
    return {data, loading, error}
}