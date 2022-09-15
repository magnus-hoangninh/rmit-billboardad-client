import "./collapse.css";

const Collapse = (props) => {
    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">
                    <a data-bs-toggle="collapse" href={"#section-" + props.sectionID} className="collapse-control"><em className="fas fa-chevron-up hide-icon"></em><em className="fas fa-chevron-down show-icon"></em> {props.sectionName}</a>
                </h3>
            </div>
            <div id={"section-" + props.sectionID} className="panel-collapse collapse show">
                <p className="content">
                    {props.sectionContent}
                </p>
            </div>
        </div>
    );
}

export default Collapse;