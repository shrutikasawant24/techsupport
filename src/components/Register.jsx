import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';


export default function Register() {
  
  let navigate = useNavigate();
  const [formValid, setFormValid] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: "user"
  })

  function handleChange(e) {
      e.preventDefault();
      setData({...data,[e.target.id]: e.target.value})
  };

  function handleSubmit(e) {
      e.preventDefault();
      // console.log(data);
      axios.post('http://localhost:3000/users',data).then((res)=>{
        console.log(res.data);
        navigate('/')
      }).catch((err)=>{
        console.log(err);
      })
     
  }
  return (
    <section class="background-radial-gradient overflow-hidden">

        <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div class="row gx-lg-5 align-items-center mb-5">
        <div class="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
            <h1 class="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
            The best offer <br />
            <span style={{ color: "hsl(218, 81%, 75%)" }}>for your business</span>
            </h1>
           <p class="mb-4 opacity-70" style={{ color: "hsl(218, 81%, 85%)" }}>
           Lorem ipsum dolor, sit amet consectetur adipisicing elit.
           Temporibus, expedita iusto veniam atque, magni tempora mollitia
           dolorum consequatur nulla, neque debitis eos reprehenderit quasi
           ab ipsum nisi dolorem modi. Quos?
           </p>
        </div>

            <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
                <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>

                <div class="card bg-glass">
                    <div class="card-body px-4 py-5 px-md-5">
                    <form>
                        {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                    {/* <!-- Name input --> */}
                    <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">User name</label>
                    <input id="name" onChange={(e)=> handleChange(e)} type="text" class="form-control" />
                     </div>

                     {/* <!-- Email input --> */}
                    <div class="form-outline mb-4">
                         <label class="form-label" for="form3Example4">Email</label>
                         <input id="email" onChange={(e) => handleChange(e)} type="email" class="form-control" />
                         </div>

                         {/* <!-- Password input --> */}
                          <div class="form-outline mb-4">
                            <label class="form-label" for="form3Example4">Password</label>
                            <input id="password" onChange={(e) => handleChange(e)} type="password" class="form-control" />
                            </div>

                            {/* <!-- Submit button --> */}
                            <button type="submit" onClick={(e) => handleSubmit(e)}    class="btn btn-primary btn-block mb-4" style={{marginLeft:"11rem"}}>
                                Register Now
                            </button>

                                {/* <!-- Register buttons --> */}
                                 <div class="text-center">
                              <NavLink to={"/"}> <a>Sign in</a></NavLink>
                            </div>
                        </form>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
  )
}