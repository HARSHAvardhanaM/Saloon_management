import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Token from './Token';

function TokenView() {
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const { tokenId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:7777/saloon/${tokenId}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data.data); 
        setData(res.data.data); 
      })
      .catch((err) => {
        setError("An error occurred while fetching data.");
        console.error(err);
      });
  }, [tokenId]);
  
  useEffect(() => {
    if (data) {
      console.log(data.customerName); // this will log the updated data when it changes
    }
  }, [data]);

  return (
    <div className='flex flex-wrap justify-evenly mt-10'>
      {data ? (
        <Token 
          custName={data.customerName} 
          services={data.services} 
          tokenNumber={data.tokenNumber} 
          total={data.totalAmount} 
          createdAt={data.createdAt}
        />
      ) : (
        <p>Loading...</p> // This will show while data is being fetched
      )}
    </div>
  );
}

export default TokenView;
