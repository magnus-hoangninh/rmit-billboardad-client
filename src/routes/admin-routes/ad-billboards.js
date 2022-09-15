import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../user-routes/Home/home.css";
import Spinner from "react-bootstrap/Spinner";
import CardAd from "../../components/Card/cardAdmin";

// This is the home page of the web application
const Home = () => {
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

  const [billboards, setBillboard] = useState([]);
  const [billboardType, setBillboardType] = useState("All");
  const [billboardArea, setBillboardArea] = useState("All");
  const [billboardPrice, setBillboardPrice] = useState("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`https://billboardad.herokuapp.com/billboards`)
      .then((res) => res.json())
      .then((data) => {
        setBillboard(data);
        setLoading(true);
      });
  }, []);
  return (
    <main>
      <>
        <h1>Billboards</h1>
        <div className="row filters">
          <div className="col-6 col-sm-4 col-md-4 filter-container">
            Billboard type
            <select
              className="form-select"
              aria-label="Select billboard type"
              onChange={(e) => {
                let selectedType = e.target.value;
                setBillboardType(selectedType);
              }}
            >
              <option defaultValue="All">All</option>
              <option value="Traditional">Traditional</option>
              <option value="Digital">Digital</option>
            </select>
          </div>
          {/* <div className="col-6 col-sm-4 col-md-3 filter-container">
                        Topic
                        <select className="form-select" aria-label="Select topic">
                            <option defaultValue="All">All</option>
                            <option value="Topic 1">Topic 1</option>
                            <option value="Topic 2">Topic 2</option>
                            <option value="Topic 3">Topic 3</option>
                        </select>
                    </div> */}
          <div className="col-6 col-sm-4 col-md-4 filter-container">
            Price range
            <select
              className="form-select"
              aria-label="Select price range"
              onChange={(e) => {
                let selectedType;
                e.target.value === "All"
                  ? (selectedType = String(e.target.value))
                  : (selectedType = Number(e.target.value));
                setBillboardPrice(selectedType);
              }}
            >
              <option value={"All"}>All</option>
              <option value={10000000}>{"<"} 10.000.000 VND</option>
              <option value={30000000}>{"<"} 30.000.000 VND</option>
              <option value={50000000}>{"<"} 50.000.000 VND</option>
            </select>
          </div>
          <div className="col-6 col-sm-4 col-md-4 filter-container">
            Area
            <select
              className="form-select"
              aria-label="Select area"
              onChange={(e) => {
                let selectedType = e.target.value;
                setBillboardArea(selectedType);
              }}
            >
              <option defaultValue="All">All</option>
              <option value="District 1">District 1</option>
              <option value="District 2">District 2</option>
              <option value="District 3">District 3</option>
            </select>
          </div>
        </div>

        {!loading ? (
          <div>
            <Spinner animation="grow" />
            <Spinner animation="grow" />
            <Spinner animation="grow" />
          </div>
        ) : null}

        <div className="row" id="items">
          {billboards
            .filter((item) => {
              if (
                billboardType === "All" &&
                billboardArea === "All" &&
                billboardPrice === "All"
              ) {
                return (
                  item.type === "Digital" ||
                  item.type === "Traditional" ||
                  item.area === "District 1" ||
                  item.area === "District 2" ||
                  item.area === "District 3" ||
                  item.price !== null
                );
              } else if (
                billboardType !== "All" &&
                billboardArea === "All" &&
                billboardPrice === "All"
              ) {
                return (
                  item.type === billboardType &&
                  (item.area === "District 1" ||
                    item.area === "District 2" ||
                    item.area === "District 3" ||
                    item.price !== null)
                );
              } else if (
                billboardType === "All" &&
                billboardArea !== "All" &&
                billboardPrice === "All"
              ) {
                return (
                  (item.type === "Digital" || item.type === "Traditional") &&
                  item.area === billboardArea &&
                  item.price !== null
                );
              } else if (
                billboardType === "All" &&
                billboardArea === "All" &&
                billboardPrice !== "All"
              ) {
                return (
                  (item.type === "Digital" || item.type === "Traditional") &&
                  (item.area === "District 1" ||
                    item.area === "District 2" ||
                    item.area === "District 3") &&
                  item.price < billboardPrice
                );
              } else if (
                billboardType !== "All" &&
                billboardArea !== "All" &&
                billboardPrice === "All"
              ) {
                return (
                  item.type === billboardType &&
                  item.area === billboardArea &&
                  item.price !== null
                );
              } else if (
                billboardType !== "All" &&
                billboardArea === "All" &&
                billboardPrice !== "All"
              ) {
                return (
                  item.type === billboardType &&
                  (item.area === "District 1" ||
                    item.area === "District 2" ||
                    item.area === "District 3") &&
                  item.price < billboardPrice
                );
              } else if (
                billboardType === "All" &&
                billboardArea !== "All" &&
                billboardPrice !== "All"
              ) {
                return (
                  (item.type === "Digital" || item.type === "Traditional") &&
                  item.area === billboardArea &&
                  item.price < billboardPrice
                );
              } else {
                return (
                  item.type === billboardType &&
                  item.area === billboardArea &&
                  item.price < billboardPrice
                );
              }
            })
            .map((filteredItem) => (
              <CardAd
                id={filteredItem?._id}
                title={filteredItem?.title}
                description={filteredItem?.description}
                price={filteredItem?.price}
                billboardImg={filteredItem.billboardImg}
              ></CardAd>
            ))}
        </div>
      </>
    </main>
  );
};

export default Home;
