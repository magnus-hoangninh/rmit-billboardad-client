import { LoadBillboards, LoadUsers } from "../../middleware/load-data";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./admin-panel.css";

const Dashboard = () => {
  const admin = sessionStorage.getItem("admin");
  const navigate = useNavigate();

  const authenticate = () => {
    if (!admin) {
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    authenticate();
  });

  const billBoards = LoadBillboards();
  const users = LoadUsers();

  return (
    <>
      <h1 className="panel-name">Dashboard</h1>
      <div className="row general-data-container">
        <div className="col-12 col-sm-6 col-md-3 general-data-column">
          <div className="general-data-box">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
              <div className="general-data-specs">
                <span className="number">
                  {billBoards ? billBoards.length : "N/A"}
                </span>
                <br />
                Billboards
              </div>
              <div className="general-data-icon">
                <em className="fas fa-ad"></em>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 general-data-column">
          <div className="general-data-box">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
              <div className="general-data-specs">
                <span className="number">{users ? users.length : "N/A"}</span>
                <br />
                Users
              </div>
              <div className="general-data-icon">
                <em className="fas fa-user"></em>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 general-data-column">
          <div className="general-data-box">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
              <div className="general-data-specs">
                <span className="number">2.31K</span>
                <br />
                Orders
              </div>
              <div className="general-data-icon">
                <em className="fas fa-shopping-cart"></em>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 general-data-column">
          <div className="general-data-box">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
              <div className="general-data-specs">
                <span className="number">$10K</span>
                <br />
                Revenue
              </div>
              <div className="general-data-icon">
                <em className="fas fa-dollar-sign"></em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
