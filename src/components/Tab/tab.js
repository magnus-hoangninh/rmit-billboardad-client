import { NavLink, Outlet } from "react-router-dom";
import "./tab.css";

const Tab = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-3 col-lg-auto tab-container">
                    <nav className="nav nav-fill sticky-top flex-lg-column bd-highlight justify-content-center" id="myTab" role="tablist">
                        <NavLink to="/my-billboards" className="nav-link tab"><em className="fas fa-ad"></em> <span className="tab-name">My billboards</span></NavLink>
                        <NavLink to="/my-messages" className="nav-link tab"> <em className="fas fa-shopping-cart"></em> <span className="tab-name">My messages</span></NavLink>
                        <NavLink to="/my-account" className="nav-link tab"><em className="fas fa-user"></em> <span className="tab-name">My account</span></NavLink>
                    </nav>
                </div>
                <div className="col-7 col-lg tab-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Tab;