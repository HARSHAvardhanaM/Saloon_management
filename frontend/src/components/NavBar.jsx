import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios';

function NavBar() {
    const [cookie , setCookie] = useState(Cookies.get('token'))
    useEffect(()=>{
        setCookie(Cookies.get('token'))
    },[]);
    const handleLogout = async()=>{
        try {
            await axios.post("http://localhost:7777/logout",{},{withCredentials : true});
            window.location.reload();
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="navbar bg-base-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                </div>
                <a className="btn btn-ghost text-xl">Saloon-Manager</a>
            </div>
            <div className="navbar-end">
                {cookie &&  <Link to={"/set-token"} className="btn mr-8 bg-zinc-400 text-black">Set Token</Link> }
                {cookie &&  <Link to={"/tokens"} className="btn mr-8 bg-zinc-400 text-black">Tokens</Link> }
                <Link to={"/"} className="btn bg-zinc-400  text-black">Home</Link>
                {cookie ? <Link onClick={handleLogout} className="btn bg-red-400 text-black mx-8">Logout</Link> : <Link to={"/login"} className="btn mx-8 bg-green-400 text-black">Login</Link>}
            </div>
        </div>
    )
}

export default NavBar
