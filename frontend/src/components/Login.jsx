import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email,setEmail] = useState("green@gmail.com");
    const [password,setPassword] = useState("Green@123"); 
    const [error,setError] = useState("")
    const navigate = useNavigate()

    const handleLogin = async()=>{
        try {
            setError("")
            const data = await axios.post("http://localhost:7777/login",
                {
                    email,password
                },
                {
                    withCredentials : true
                }
            )
            console.log(data)
            navigate("/")
            window.location.reload();
            
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

                        {/* <label>
                            <span className="label-text "><p className='my-5'>Don't have an account <a className='text-blue-700' href='#' ><span>Signup</span></a></p></span>
                        </label> */}
                        <p className='mt-4 text-red-600'>{error && error}</p>
                    </div>

                    <div className="card-actions justify-end">
                        <button onClick={handleLogin} className="btn btn-primary">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login