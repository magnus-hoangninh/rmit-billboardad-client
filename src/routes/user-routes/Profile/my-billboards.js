import Card from "../../../components/Card/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import AddBillBoardModal from '../../../components/Add Billboard Modal/index'
import Spinner from 'react-bootstrap/Spinner';

const MyBillboards = () => {
  const [ownerEmail] = useState(sessionStorage.getItem("userEmail"));
  const [billboards, setBillboards] = useState([]);
  const [billboardType, setBillboardType] = useState("All");
  const [billboardStatus, setBillboardStatus] = useState("All");
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const userToken = () => {
    if (!token) {
      navigate("/login");
    }
  };

  useEffect(() => {
    userToken();
  }, []);

  useEffect(() => {
    fetch(`https://billboardad.herokuapp.com/billboards/my-billboards/${ownerEmail}`)
      .then(res => res.json())
      .then(data => {setBillboards(data);setLoading(true);})
  }, [billboards])

  userToken();

  return (
    <main>
      <h2 className="col col-lg-auto tab-header">My billboards</h2>
      <div className="row filters">
        <div className="col-12 col-sm-3 filter-container">
          Billboard type
            <select className="col-12 col-md-4 form-select" aria-label="Select billboard type" onChange={e => {
              let selectedType = e.target.value; setBillboardType(selectedType)
            }}>
              <option defaultValue="All">All</option>
              <option value="Traditional">Traditional</option>
              <option value="Digital">Digital</option>
            </select>
        </div>
        <div className="col-12 col-md-4 filter-container">
          Status
          <select className="form-select" aria-label="Select status" onChange={e => {
            let selectedType = e.target.value; setBillboardStatus(selectedType)
          }}>
            <option defaultValue="All">All</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
          </select>
        </div>
        <div className="col-12 col-md-4 btn-container">
          <AddBillBoardModal />
        </div>
      </div>
      {!loading ?
                <div className="loadingDiv">
                    <Spinner className="spinner" animation="grow" />
                    <Spinner className="spinner" animation="grow" />
                    <Spinner className="spinner" animation="grow" />
                </div>
                : null}
      <div className="row" id="items">
        {billboards.filter(item => {
          if (billboardType === "All" && billboardStatus === "All") {
            return item.type === "Digital" || item.type === "Traditional" || item.status === "Available" || item.status === "Occupied"
          } else if (billboardType === "All" && billboardStatus !== "All") {
            return (item.type === "Digital" || item.type === "Traditional") && item.status === billboardStatus
          } else if (billboardType !== "All" && billboardStatus === "All") {
            return item.type === billboardType && (item.status === "Available" || item.status === "Occupied")
          }
          else {
            return item.type === billboardType && item.status === billboardStatus
          }
        }).map(filteredItem => <Card id={filteredItem?._id} title={filteredItem?.title} description={filteredItem?.description} price={filteredItem?.price} billboardImg={filteredItem.billboardImg}></Card>)}

      </div>
    </main>
  );
};

export default MyBillboards;
