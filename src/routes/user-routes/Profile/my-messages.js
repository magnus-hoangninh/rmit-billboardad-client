import "./profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const MyMessages = () => {
  const [userEmail] = useState(sessionStorage.getItem("userEmail"));
  const [messages, setMessages] = useState([]);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const userToken = () => {
    if (!token) {
      navigate("/login");
    }
  };

  useEffect(() => {
    userToken();
  }, []);

  userToken();

  useEffect(()=>{
    fetch(`https://billboardad.herokuapp.com/messages/my-messages/${userEmail}`)
    .then(res => res.json())
    .then(data => setMessages(data))
  }, [])

  return (
    <main>
      <table className="col mes-contain">
        <tr className="mes-detail">
          <th className="col-sm-2 list-mes">From</th>
          <th className="col-sm-2 list-mes">Phone Number</th>
          <th className="col-sm-2 list-mes">Billboard's ID</th>
          <th className="col-sm-2 list-mes">Messages</th>
          <th className="col-sm-2 list-mes">At</th>
        </tr>
        {messages.map(message =>
            <tr>
              <td >{message?.senderEmail}</td>
              <td>{message?.contactPhone}</td>
              <td><Link to={`/details/${message?.billboardID}`}>{message?.billboardID}</Link></td>
              <td>{message?.message}</td>
              <td>{message?.dateCreated}</td>
            </tr>
        )}
      </table>
    </main>
  );
};

export default MyMessages;
