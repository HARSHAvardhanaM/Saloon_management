import axios from 'axios'
import React from 'react'

function Token({ custName, tokenNumber, services, total, createdAt, _id="" }) {
    const handleDelete = async()=>{
        try {
            await axios.delete(`http://localhost:7777/saloon/${_id}`,{withCredentials : true})
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="card  w-96 shadow-xl bg-slate-500 text-black mt-12">
            <div className="card-body">
                <h2 className="card-title text-2xl">Token no : {tokenNumber}</h2>
                <h1 className="card-title text-3xl">Name : {custName}</h1>
                <h3 className='text-xl'>Services</h3>
                <ul className='flex'>
                    {
                        Object.keys(services).map(service =>
                            <div key={service} className="card-actions justify-end">
                                <li className='ml-7'><p className='text-lg'>{service}</p></li>
                            </div>
                        )
                    }
                </ul>
                <h4 className='mt-2'><p className='text-md'>Total amount : {total}</p></h4>
                <p>Generated in {new Date(createdAt).toISOString().split('T')[0]}</p>
                <div className="card-actions text-center">
                    <button onClick={handleDelete} className=" mx-auto mt-6 btn bg-gray-400 border-black btn-primary">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Token
