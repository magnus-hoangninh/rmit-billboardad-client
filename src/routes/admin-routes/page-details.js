import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getResponse, discardChanges } from "../../middleware/response";
import { LoadSections } from "../../middleware/load-data";
import "./admin-panel.css";

const PageDetails = () => {
    // PAGE DETAILS CODE
    // Load page data
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

    const [page, setPage] = useState(
        {
            pageName: '',
            description: '',
        }
    );
    const { _id } = useParams();

    useEffect(() => {
        fetch(`https://billboardad.herokuapp.com/pages/${_id}`)
            .then(res => res.json())
            .then(data => setPage(data))
    }, [_id]);

    // Handle input
    const handleInput = ({currentTarget: input}) => {
        setPage({ ...page, [input.name]: input.value })
    }

    // Submit the updated page
    const updatePage = (e, id) => {
        e.preventDefault();
        try {
            fetch(`https://billboardad.herokuapp.com/pages/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( page )
            })
                .then(res => getResponse(res))
        }
        catch (err) {
            console.error(err);
        }
    }

    // Section CODE
    const [sectionName, setSectionName] = useState('');
    const [sectionContent, setSectionContent] = useState('');
    const sections = LoadSections(_id);

    const addSection = (e, id) => {
        e.preventDefault();
        try {
            fetch(`https://billboardad.herokuapp.com/pages/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, sectionName: sectionName, sectionContent: sectionContent })
            })
                .then(res => getResponse(res))
        }
        catch (err) {
            console.error(err);
        }
    }

    const deleteSection = (e, id) => {
        e.preventDefault();
        try {
            if (!window.confirm("Are you sure you want to delete this section?")) {
                return;
            }

            fetch(`https://billboardad.herokuapp.com/pages/section/${id}`, {
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
            {/* Back to the list of pages */}
            <Link to="/admin/pages" className="back-link"><em className="fas fa-arrow-left"></em> Back to pages</Link>

            {/* Page details section */}
            <h1>Page details</h1>
            <div className="editor-box">
                <form>
                    <div className="mb-3">
                        <label htmlFor="page-name" className="form-label">Page name <span className="required-field-icon">*</span></label>
                        <input type="text" className="form-control" id="page-name" placeholder="Your Page" name="pageName" value={page.pageName} onChange={handleInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description-text" className="form-label">Description</label>
                        <textarea className="form-control" id="description-text" placeholder="Enter the description of your page" name="description" value={page.description} onChange={handleInput}></textarea>
                    </div>
                    <div className="mb-3 row editor-btn-container">
                        <div className="col-6">
                            <button type="reset" className="btn secondary" onClick={() => discardChanges("page")}>Discard</button>
                        </div>
                        <div className="col-6">
                            <button type="submit" className="btn" onClick={(e) => updatePage(e, page._id)}>Save</button>
                        </div>
                    </div>
                </form>
            </div>

            <hr />

            {/* Page sections CRUD section */}
            <h1>Sections</h1>

            {/* Create new content section */}
            <button className="btn create-new-btn" data-bs-toggle="modal" data-bs-target="#new-section-modal"><em className="fas fa-plus"></em> Create new</button>

            <div className="modal fade create-new-modal" id="new-section-modal" tabIndex="-1" aria-labelledby="newPageModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h3 className="modal-title" id="exampleModalLabel">New section</h3>
                                <button type="reset" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="section" className="form-label">Section name <span className="required-field-icon">*</span></label>
                                    <input type="text" className="form-control" id="section" placeholder="Section" onChange={(e) => { setSectionName(e.target.value) }}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">Section content</label>
                                    <textarea className="form-control" id="content" placeholder="Enter the content of the section" onChange={(e) => { setSectionContent(e.target.value) }}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="reset" className="btn secondary" data-bs-dismiss="modal">Discard</button>
                                <button type="submit" className="btn" onClick={(e) => addSection(e, page._id)}>Create new</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Data display section */}
            <div className="table-box">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Section name</th>
                            <th>Created date</th>
                            <th>Last updated</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sections.map(section =>
                                <tr>
                                    <td>{section.sectionName}</td>
                                    <td>{section.dateCreated}</td>
                                    <td>{section.lastUpdated}</td>
                                    <td>
                                        <button className="btn" onClick={() => { navigate(`/admin/section/${section._id}`) }}>Updare</button>
                                        <button className="btn danger" onClick={(e) => deleteSection(e, section._id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default PageDetails;