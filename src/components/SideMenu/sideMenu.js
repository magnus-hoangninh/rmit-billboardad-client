import { NavLink, Outlet } from "react-router-dom";
import "./sideMenu.css"

const SideMenu = () => {
    const handleLogout = () => {
      sessionStorage.removeItem("admin");
      window.location.reload();
    };

    const toggleMenu = () => {
        let toggle = document.querySelector('.toggle');
        let sideNav = document.querySelector('.side-nav');
        let adminMain = document.querySelector('.admin-main');
        toggle.classList.toggle('active');
        sideNav.classList.toggle('active');
        adminMain.classList.toggle('active');
    }

    return (
        <div className="admin-container">
            <div className="side-nav">
                <ul>
                    <li className="side-nav-link logo-container">
                        <span className="side-nav-icon"><em className="fas fa-bold"></em></span>
                        <span className="title">BillBoarDad</span>
                    </li>
                    <li className="side-nav-link">
                        <NavLink to="/admin/">
                            <span className="side-nav-icon"><em className="fas fa-home"></em></span>
                            <span className="title">Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="side-nav-link">
                        <NavLink to="/admin/billboards">
                            <span className="side-nav-icon"><em className="fas fa-ad"></em></span>
                            <span className="title">Billboards</span>
                        </NavLink>
                    </li>
                    <li className="side-nav-link">
                        <NavLink to="/admin/users">
                            <span className="side-nav-icon"><em className="fas fa-user"></em></span>
                            <span className="title">Users</span>
                        </NavLink>
                    </li>
                    <li className="side-nav-link">
                        <NavLink to="/admin/pages">
                            <span className="side-nav-icon"><em className="fas fa-file"></em></span>
                            <span className="title">Pages</span>
                        </NavLink>
                    </li>
    
                    <li className="side-nav-link" id="sign-out-link">
                        <NavLink to="/admin/login" onClick={handleLogout}>
                            <span className="side-nav-icon"><em className="fas fa-sign-out"></em></span>
                            <span className="title">Sign out</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="admin-main">
                <div className="top-bar">
                    <div className="toggle" onClick={() => toggleMenu()}>
                        <em className="fas fa-bars"></em>
                    </div>
                </div>
                <div className="main-container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default SideMenu;