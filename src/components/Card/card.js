import React from "react";
import { Link } from "react-router-dom";
import thumbnail from "../../assets/ElonMusk.jpg";
import "./card.css";

const Card = props => {

    return (
      <div className="col-12 col-sm-6 col-md-3 bg-light item-container ">
        <Link to={`/details/${props.id}`}>
          <div className="image-container">
            {props.billboardImg ? (
              <img
                src={`data: ${props.billboardImg.contentType};base64, ${props.billboardImg.image}`}
              />
            ) : (
              <img src={thumbnail} alt="item-thumbnail" />
            )}
          </div>
          <p className="title">{props.title}</p>
          <p className="description">{props.description}</p>
          <p className="price">
            {props.price
              ? props.price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })
              : props.price}{" "}
            / year
          </p>
        </Link>
      </div>
    );
}

export default Card;