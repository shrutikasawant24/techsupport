import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Ticket() {
  const [showModal, setShowModal] = useState(false);
  const [gettickets, settickets] = useState([]);
  const [userdata, setuserdata] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const [formData, setFormData] = useState({
    problem: '',
    usertid: '',
    supportid: '', 
    status: 'pending', 
  });
  
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const senddata={
      problem: formData.problem,
      supportid:formData.supportid,
      usertid:formData.usertid,
      status:formData.status
    }
    console.log(senddata);

    axios.put(`http://localhost:3000/tickets/${selectedTicketId}`, senddata) 
      .then(() => {
        console.log("Successfully updated ticket");
        getdata(); 
        handleClose(); 
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getuserdata = () => {
    axios.get('http://localhost:3000/users')
      .then((res) => {
        setuserdata(res.data);
      });
  };

  const getdata = () => {
    axios.get('http://localhost:3000/tickets')
      .then((res) => {
        settickets(res.data);
      });
  };

  const handleUpdate = (ticketId) => {
    setSelectedTicketId(ticketId); 
    handleShow();
    const selectedTicket = gettickets.find(ticket => ticket.id === ticketId);
    setFormData({
      ...formData,
      problem: selectedTicket.problem,
      usertid:selectedTicket.usertid,
      supportid: selectedTicket.supportid, 
      status: selectedTicket.status, 
    });
  };

  const handleDelete=()=>{
    axios.delete(`http://localhost:3000/tickets/${id}`)
    .then(() => {
      console.log("Successfully deleted tickets");
      getdata(); 
    })
    .catch((err) => {
      alert(`Error deleting user: ${err}`);
    });
  }

  useEffect(() => {
    getdata();
    getuserdata();
  }, []);

  const getClientName = (userId) => {
    console.log(userId);
    const user = userdata.find(user => user.id === userId);
    return user ? user.name : 'Unknown';
  };

  const gettechName = (techId) => {
    console.log(techId);
    const tech = userdata.find(tech => tech.id === techId);
    return tech ? tech.name : 'Unknown';
  };
  
  return (
    <div className="container mt-5">
      <h2>Tickets</h2>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Action</th>
              <th>No</th>
              <th>Client</th>
              <th>Ticket</th>
              <th>Support</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {gettickets.map((ticket, index) => (
              <tr key={index}>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(ticket.id)}>Delete</button>
                  <button className="btn btn-success ms-1" onClick={() => handleUpdate(ticket.id)}>Edit</button>
                </td>
                <td>{index + 1}</td>
                <td>{getClientName(ticket.usertid)}</td>
                <td>{ticket.problem}</td>
                <td>{gettechName(ticket.supportid)}</td>
                <td>{ticket.status}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
      {/* <!-- Modal --> */}
      <div className="modal" tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Ticket</h5>
              <button type="button" className="close" onClick={handleClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="usertid" id='usertid' value={gettickets.find(ticket => ticket.id === selectedTicketId)?.usertid} onChange={handleChange} /> 
                <input type="hidden" name="problem" id='problem' value={gettickets.find(ticket => ticket.id === selectedTicketId)?.problem} onChange={handleChange} /> 
                <div className="form-group">
                  <label htmlFor="supportid">Assign Support</label>
                  <select className='form-control' name="supportid" id="supportid" value={formData.supportid} onChange={handleChange}>
                    {userdata.filter(user => user.type === 'tech').map((data) => (
                      <option key={data.id} value={data.id}>{data.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select className='form-control' name="status" id="status" value={formData.status} onChange={handleChange}>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary mt-2">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
