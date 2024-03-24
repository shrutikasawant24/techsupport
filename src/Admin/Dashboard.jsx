  import axios from 'axios';
  import React, { useEffect, useState } from 'react';

  export default function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      type: 'tech'
    });
    const [tableData, setTableData] = useState([]);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const [id, setId] = useState(undefined);


    const handleChange = (e) => {
      const dt = { ...formData };
      dt[e.target.name] = e.target.value;
      setFormData(dt);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (id === undefined) {
        axios.post('http://localhost:3000/users', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          type: formData.type
        }).then((result) => {
          // refresh()
          setFormData({
            name: "",
            email: "",
            password: "",
            type:"tech",
          })
          setFormData(result.data)
          getdata();
        }).catch((err) => {
          console.log(err);
        })
        console.log(formData);

      } else {
        axios.put("http://localhost:3000/users/" + id, formData)
          .then((res) => {
            console.log(res.data);
            setFormData({
              name: "",
              email: "",
              password: "",
              type: "tech"
            })
            setId(undefined)
            getdata();
          })
      }

      setShowModal(false);
    };

    const handleDelete = (id) => {
      axios.delete(`http://localhost:3000/users/${id}`)
        .then(() => {
          console.log("Successfully deleted user");
          getdata(); // Refresh data after deletion
        })
        .catch((err) => {
          alert(`Error deleting user: ${err}`);
        });
    };

    const getdata = () => {
      axios.get('http://localhost:3000/users')
        .then((res) => {
          setTableData(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          alert(`Error fetching data: ${err}`);
        });
    };

    const handleUpdate = (id) => {
      setId(id);
      axios.get(`http://localhost:3000/users/${id}`)
        .then((res) => {
          const { name, email, password } = res.data;
          setFormData({
            name,
            email,
            password
          });
          handleShow(); 
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const refresh = () => {
      setFormData({
        name: "",
        email: "",
        password: ""
      });
    };

    useEffect(() => {
      getdata();
      refresh()
    }, []);

    return (
      <div className="container mt-5">
        <h2>Tech Support</h2>
        <button className="btn btn-primary mb-3" onClick={handleShow}>Add</button>

        <div className="modal" tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add </h5>
                <button type="button" className="close" onClick={handleClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label> 
                    <input type="text" className="form-control" id="name" placeholder="Enter Name" name="name" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Email" name="email" value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter Password" value={formData.password} name="password" onChange={handleChange} />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleDelete(data.id)}>Delete</button>
                      <button className="btn btn-success ms-1" onClick={() => handleUpdate(data.id)}>Edit</button>
                    </td>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
