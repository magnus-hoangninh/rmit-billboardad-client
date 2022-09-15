import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Collapse from "../../../components/Collapse/collapse";
import { LoadPage, LoadSections } from "../../../middleware/load-data";
import "./generic-page.css";

const GenericPage = () => {
    // Load the page
    const { _id } = useParams();
    const page = LoadPage(_id);
    const sections = LoadSections(_id);

    return (
        <main>
            <div className="container">
                <h2 className="page-name">{page.pageName}</h2>
                <p className="content">{page.description}</p>

                <hr />

                {/* Page content here */}
                <div className="panel-group">
                    {
                        sections.map(section =>
                            <>
                                <Collapse sectionID={section._id} sectionName={section.sectionName} sectionContent={section.sectionContent} />
                            </>
                        )
                    }
                </div>

                <hr />

                <p className="update-txt">Last updated on {page.lastUpdated}.</p>
            </div>
        </main>
    );
}

export default GenericPage;