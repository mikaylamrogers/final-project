import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [listingAPIData, setListingAPIData] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:4000`) // this will actually link to heroku
            .then(function (response) {
                if (response.data) {
                    setListingAPIData(response.data);
                }
            })
            .catch(function (error) {
                console.log('error', error);
            }); 
    }, []);

    console.log({listingAPIData});

    return (
        <div>
            <h1>hi</h1>
            {listingAPIData.map((item, i) => (
                <div key={i}>
                    <p>Iddd: {item.listingId}</p>
                    <p>Name: {item.listingName}</p>
                    <p>Author: {item.listingAuthor}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;