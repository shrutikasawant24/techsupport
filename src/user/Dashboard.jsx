import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

export default function Dashboard(props) {
  const location = useLocation(); 
  const [userId, setUserId] = useState(null); 
  const Navigate =useNavigate()
  console.log(userId);
  const [showModal, setShowModal] = useState(false);
  const [getticketdata, setTicketdata] = useState([]);
  const [postticketdata, postsetTicketdata] = useState();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    if (location.state && location.state.userId) {
      setUserId(location.state.userId);
      console.log("Updated userId:", location.state.userId); // Log the updated userId
    }
  }, []);
  

  const [ticket, setTicket] = useState({
    problem: '',
    status: 'pending', 
    supportid:0,
    // userId:userId
  });


  const handleChange = (e) => {
    const dt = { ...ticket };
    dt[e.target.name] = e.target.value;
    setTicket(dt);
  };



  console.log(userId); // Log the user ID


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("per",ticket);

  const senddata={
    problem:ticket.problem,
    status:ticket.status,
    supportid:ticket.supportid,
    usertid:userId
  }

    axios.post("http://localhost:3000/tickets", senddata)
    .then((response) => {
      postsetTicketdata(response.data); 
      console.log('Ticket Submitted:', response.data);
      handleClose();
      getdata()
    })
    .catch((error) => {
      console.error('Error submitting ticket:', error);
    });
 
  };

  const getdata = () => {
    axios.get('http://localhost:3000/tickets')
    .then((response) => {
      const filteredTickets = response.data.filter(ticket => ticket.usertid === userId);
      setTicketdata(filteredTickets); 
      console.log(response.data);
    })
    .catch((err) => {
      alert(`Error fetching data: ${err}`);
    });
 
  };
  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/tickets/${id}`)
      .then(() => {
        console.log("Successfully deleted user");
        getdata(); 
      })
      .catch((err) => {
        alert(`Error deleting user: ${err}`);
      });
  };

  const logout=()=>{
    Navigate("/")
  }

  console.log(getticketdata);
  useEffect(()=>{
    getdata()
  },[])

  return (
    <div>
      <nav className="navbar navbar-light bg-light justify-content-between ps-5 pe-5">
        <a className="navbar-brand">Support</a>
        <a>Tickets</a>
        <form className="form-inline">
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={logout}>Logout</button>
        </form>
      </nav>

      <div className="container mt-5">
        <h2>Tickets</h2>
        <button className="btn btn-primary mb-3" onClick={handleShow}>Add</button>

        <table className="table">
          <thead>
            <tr>
              <th>Action</th>
              <th>No</th>
              <th>Problem</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {getticketdata.map((data,i)=>{
              return(
                <tr key={i}>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(data.id)} >Delete</button>
                  <button className="btn btn-success ms-1">Edit</button>
                </td>
                <td>{(i+1)}</td>
                <td>{data.problem}</td>
                <td>{data.status}</td>
              </tr>
              )
              
            })}
          </tbody>
        </table>
      </div>

      {/* Modal for adding ticket */}
      <div className="modal" tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Ticket</h5>
              <button type="button" className="close" onClick={handleClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Form for adding ticket */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="problem" className="form-label">Problem:</label>
                  <input type="text" className="form-control" name='problem' id="problem" onChange={handleChange}  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status:</label>
                  <select className="form-control" name='status' id="status" onChange={handleChange} >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
