import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function SetToken() {
  const [token , setToken] = useState(0);
  const navigate = useNavigate()
  const handleSubmit = async()=>{
    try {
        await axios.post("http://localhost:7777/token/set",{
            "tokenNum" : token
        });
        navigate("/")
    } catch (error) {
       console.error(error) 
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
                    <h2 className="card-title ">Set Token</h2>
                    <div className='py-6'>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="py-2 label-text">Enter email</span>
                            </div>
                            <input value={token} onChange={(e)=>{setToken(e.target.value)}} type="number" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>

                    <div className="card-actions justify-end">
                        <button onClick={handleSubmit} className="btn btn-primary">Set Token to {token}</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default SetToken
