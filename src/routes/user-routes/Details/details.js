// import React from "react";
// import { useParams } from "react-router-dom";
// import "./details.css";

// // This is the billboard details page of the web application
// const Details = () => {
//     const {_id} = useParams();
//     return(
//         <p>Billboard's ID: {_id}</p>
//     )
// };

// export default Details;

import "bootstrap/dist/css/bootstrap.min.css";
import "./details.css";
import ProfileCard from "../../../components/Profile Card/Card";
import Features from "../../../components/Profile Card/MediaTable";
import EditBillboardModal from "../../../components/Edit Billboard Modal";
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from "react-router-dom";
import { React, useState, useEffect } from "react";

function Details() {
  const { _id } = useParams();
  const [billboards, setBillboard] = useState();
  const [billboardOwnerEmail, setBillboardOwnerEmail] = useState(null);

  const specificBillboard = async () => {
    await fetch(`https://billboardad.herokuapp.com/billboards/specific/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setBillboard(data);
        setBillboardOwnerEmail(data[0].owner);
      }); 
  };

  useEffect(() => {
    specificBillboard();
  }, []);


{
  billboards && console.log(billboards)
} 

if (billboards) {
    return (
      <main>
        <div className="container">
          <div className="row">
            <div className="col-auto">
              {billboards && (
                <ProfileCard
                  _id={billboards[0]._id}
                  title={billboards[0].title}
                  type={billboards[0].type}
                  area={billboards[0].area}
                  price={billboards[0].price}
                  description={billboards[0].description}
                  billboardImg={billboards[0].billboardImg}
                  billboardOwnerEmail={billboardOwnerEmail}
                />
              )}
            </div>
            <div className="col p-3">
              <Features
                description={billboards[0].description}
                area={billboards[0].area}
                price={billboards[0].price}
              />
            </div>
          </div>
        </div>
      </main>
    );
}else{
  return(
    <div className="loadingDiv">
      <Spinner className="spinner" animation="grow" />
      <Spinner className="spinner" animation="grow" />
      <Spinner className="spinner" animation="grow" />
  </div>
  )
}

}

export default Details;
