import axios from 'axios'
import React, { useEffect,useState } from 'react'
import Token from './Token';

function Tokens() {

    const [tokens,setTokens] = useState([]);
    const [error,setError] = useState("")

    useEffect(() => {
        axios.get("http://localhost:7777/saloon/data",{withCredentials : true})
            .then((res) => {
              console.log(res.data.tokens)
                setTokens(res.data.tokens);  // Set the state here
            })
            .catch((error) => {
                setError(error)
            });
    }); 

    useEffect(()=>{console.log(tokens)},[tokens])

  return (
    <div className='flex flex-wrap justify-evenly mt-10'>
      
      { tokens.length ?
        tokens.map((token)=>{
          return(<Token _id={token._id} custName={token.customerName} tokenNumber={token.tokenNumber} services={token.services || {}} total={token.totalAmount} createdAt={token.createdAt}/>)
        }) :
        <div className='flex justify-center mt-60'>
            <h1 className='text-4xl justify-center'>No data found</h1>
        </div>
      }
    </div>
  )
}

export default Tokens
