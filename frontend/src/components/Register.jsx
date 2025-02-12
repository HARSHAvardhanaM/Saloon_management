import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

function Register() {
    const [custName, setCustName] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [haircut, setHaircut] = useState(false)
    const [spa, setspa] = useState(false)
    const [facial, setFacial] = useState(false);
    const [error ,setError] = useState("");
    const navigate = useNavigate();
    const [token,setToken] = useState(Cookies.get('token'));

    useEffect(()=>{
        if(!token){
            navigate("/login")
        }
    },[navigate])

    const handleSubmit = async()=>{
        try {
            setError("")
            let services = {};
            if(spa){
                services.Spa = 500
            }
            if(haircut){
                services.Haircut = 300
            }
            if(facial){
                services.Facial = 350
            }
            if(Object.keys(services).length == 0){
                throw new Error("Select services")
            }
            const data = await axios.post("http://localhost:7777/token",{
                customerName : custName,
                services : services,
                mobileNum : mobileNumber
            },{withCredentials : true});
            setCustName("");
            [setFacial,setHaircut,setspa].forEach(val => val(false));
            setMobileNumber("")
            console.log(data.data.token._id)
            navigate(`/token/${data.data.token._id}`)
        } catch (error) {
            if(error.message){
                setError(error.message)
            }
            setError(error.response.data.message)
        }
    }

    return (
        <div className='flex justify-center my-6 '>
            <div className="card bg-base-100 image-full  shadow-xl w-2/3">
                <figure>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb2ypu0v6IkokzMtGvrtASf8vjWKy44y1GOg&s"
                        alt="Pic" />
                </figure>
                <div className="card-body flex ">
                    <h2 className="card-title ">Green Nature</h2>
                    <div className='py-6'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="py-2 label-text">Enter Customer Name</span>
                            </div>
                        <input  value={custName} onChange={(e) => { setCustName(e.target.value) }} type="text" className="input input-bordered w-full" />
                        </label>

                        <label className=" form-control w-full">
                            <div className="label">
                                <span className="label-text py-2">Mobile Number</span>
                            </div>
                            <input value={mobileNumber} onChange={(e) => { setMobileNumber(e.target.value) }} type="text" className="input input-bordered w-full" />
                        </label>
                        <h2 className='text-3xl my-5'>Select services</h2>
                        <div className='p-4 mx-28'>
                        <div className="form-control w-1/2">
                            <label className="cursor-pointer label">
                                <input checked={haircut}  value={haircut} onChange={()=>{setHaircut((prevVal)=> !prevVal); console.log(haircut)}} type="checkbox" defaultChecked className="checkbox checkbox-accent" />
                                <span className="label-text"><h2 className='text-2xl'>Haircut : 300</h2></span>
                            </label>
                        </div>

                        <div className="form-control w-1/2">
                            <label className="cursor-pointer label">
                                <input checked={spa}  value={spa} onChange={()=>{setspa((prevVal)=> !prevVal); console.log(haircut)}} type="checkbox" defaultChecked className="checkbox checkbox-accent" />
                                <span className="label-text"><h2 className='text-2xl'>Spa : 500</h2></span>
                            </label>
                        </div>

                        <div className="form-control w-1/2">
                            <label className="cursor-pointer label">
                                <input checked={facial}  value={facial} onChange={()=>{setFacial((prevVal)=> !prevVal); console.log(haircut)}} type="checkbox" defaultChecked className="checkbox checkbox-accent" />
                                <span className="label-text"><h2 className='text-2xl'>Facial : 350</h2></span>
                            </label>
                        </div>
                        </div>
                    </div>

                    <p className='mt-4 text-red-600'>{error && error}</p>

                    <div className="card-actions justify-end">
                        <button onClick={handleSubmit} className="btn btn-primary">Generate Token</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
