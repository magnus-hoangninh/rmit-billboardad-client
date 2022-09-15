import React from 'react'
import { Link } from 'react-router-dom';
import { LoadPages } from "../../middleware/load-data";
import '../Footer/style.css'

function Footer() {
  const pages = LoadPages();

  return (
    <div className='footer-container'>
      <nav className='nav-link'>
        {
          pages.map(page =>
           <Link to={`/article/${page._id}`}>{page.pageName}</Link> 
          )
        }
      </nav>
      <h6 style={{margin:"10px 10px 0px 10px"}}>RMIT - MERN Noob &copy; 2022. All right reserved.</h6>
    </div>
  )
}

export default Footer