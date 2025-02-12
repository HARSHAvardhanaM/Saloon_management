import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [saloon,setSaloon] = useState("Green Nature");
    const [email,setEmail] = useState("rocky@k.com");
    const [password,setPassword] = useState("Rocky@123"); 
    const [error,setError] = useState("");
    const navigate = useNavigate()

    const handleSignup = async()=>{
        try {
            setError("")
            const data = await axios.post("http://localhost:7777/signup",
                {
                    username : saloon,
                    email : email,
                    password: password
                }
            )
            console.log(data);
            navigate("/login")
        } catch (error) {
            console.error(error)
            setError(error.response.data.message)
        }
    }

    return (
        <div className='flex justify-center my-6 '>
            <div className="card bg-base-100 image-full w-96 shadow-xl">
                <figure>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb2ypu0v6IkokzMtGvrtASf8vjWKy44y1GOg&s"
                        alt="Pic" />
                </figure>
                <div className="card-body flex ">
                    <h2 className="card-title ">Login</h2>
                    <div className='py-6'>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="py-2 label-text">Enter Saloon anme</span>
                            </div>
                            <input value={saloon} onChange={(e)=>{setSaloon(e.target.value)}} type="text" className="input input-bordered w-full max-w-xs" />
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="py-2 label-text">Enter email</span>
                            </div>
                            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" className="input input-bordered w-full max-w-xs" />
                        </label>

                        <label className=" form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text py-2">Password</span>
                            </div>
                            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" className="input input-bordered w-full max-w-xs" />
                        </label>

                        <p className='mt-4 text-red-600'>{error && error}</p>
                    </div>

                    <div className="card-actions justify-end">
                        <button onClick={handleSignup} className="btn btn-primary">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login