import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getResponse, discardChanges } from "../../middleware/response";
import "./admin-panel.css";

const Section = () => {
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

    // Load section data
    const [section, setSection] = useState({
        sectionName: '',
        sectionContent: '',
    });
    const {_id} = useParams();

    useEffect(() => {
        fetch(`https://billboardad.herokuapp.com/pages/section/${_id}`)
            .then(res => res.json())
            .then(data => setSection(data))
    },[_id]);

    // Handle input
    const handleInput = ({currentTarget: input}) => {
        setSection({ ...section, [input.name]: input.value })
    }

    // Update sections
    const updateSection = (e, id) => {
        e.preventDefault();
        try {
            fetch(`https://billboardad.herokuapp.com/pages/section/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( section )
            })
                .then(res => getResponse(res))
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            {/* Back to the list of pages */}
            <Link to={`/admin/page-details/${section.pageID}`} className="back-link"><em className="fas fa-arrow-left"></em> Back to page details</Link>

            {/* Page details section */}
            <h1>Section</h1>
            <div className="editor-box">
                <form>
                    <div className="mb-3">
                        <label htmlFor="section-name" className="form-label">Section name <span className="required-field-icon">*</span></label>
                        <input type="text" className="form-control" id="section-name" placeholder="Section" name="sectionName" value={section.sectionName} onChange={handleInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Section content</label>
                        <textarea className="form-control" id="content" placeholder="Enter the content of the section" name="sectionContent" value={section.sectionContent} onChange={handleInput}></textarea>
                    </div>
                    <div className="mb-3 row editor-btn-container">
                        <div className="col-6">
                            <button type="reset" className="btn secondary" onClick={() => discardChanges("section")}>Discard</button>
                        </div>
                        <div className="col-6">
                            <button type="submit" className="btn" onClick={(e) => updateSection(e, section._id)}>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Section;