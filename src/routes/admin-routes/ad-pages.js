import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getResponse } from "../../middleware/response";
import { LoadPages } from "../../middleware/load-data";
import "./admin-panel.css";

const Pages = () => {
    
    const [pageName, setPageName] = useState('');
    const [description, setDescription] = useState('');
    const pages = LoadPages();
    const navigate = useNavigate();

    const admin = sessionStorage.getItem("admin");

    const authenticate = () => {
      if (!admin) {
        navigate("/admin/login");
      }
    };

    useEffect(() => {
      authenticate();
    });

    const addPage = (e) => {
        e.preventDefault();
        try {
            fetch("https://billboardad.herokuapp.com/pages/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pageName: pageName, description: description })
            })
                .then(res => getResponse(res))
        }
        catch (err) {
            console.error(err);
        }
    }

    const deletePage = (e, id) => {
        e.preventDefault();
        try {
            if (!window.confirm("Deleting the page also deletes all of its contents.\nAre you sure you want to proceed?")) {
                return;
            }

            fetch(`https://billboardad.herokuapp.com/pages/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => getResponse(res));
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h1>Pages</h1>

            {/* Create new page section */}
            <button className="btn create-new-btn" data-bs-toggle="modal" data-bs-target="#new-page-modal"><em className="fas fa-plus"></em> Create new</button>

            <div className="modal fade create-new-modal" id="new-page-modal" tabIndex="-1" aria-labelledby="newPageModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h3 className="modal-title" id="exampleModalLabel">New page</h3>
                                <button type="reset" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="page-name" className="form-label">Page name <span className="required-field-icon">*</span></label>
                                    <input type="text" className="form-control" id="page-name" placeholder="Your Page" onChange={(e) => { setPageName(e.target.value) }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description-text" className="form-label">Description</label>
                                    <textarea className="form-control" id="description-text" placeholder="Enter the description of your page" onChange={(e) => { setDescription(e.target.value) }}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="reset" className="btn secondary" data-bs-dismiss="modal">Discard</button>
                                <button type="submit" className="btn" onClick={e => addPage(e)}>Create new</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Data display section */}
            <div className="table-box">
                <table className="table pages">
                    <thead>
                        <tr>
                            <th>Page name</th>
                            <th>Created date</th>
                            <th>Last updated</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pages.map(page =>
                                <tr>
                                    <td>{page.pageName}</td>
                                    <td>{page.dateCreated}</td>
                                    <td>{page.lastUpdated}</td>
                                    <td>
                                        <button className="btn" onClick={() => { navigate(`/admin/page-details/${page._id}`) }}>Update</button>
                                        <button className="btn danger" onClick={(e) => deletePage(e, page._id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Pages;