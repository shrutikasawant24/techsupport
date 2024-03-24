import React from 'react'
import '../../src/App.css'

function Header() {
    function openbutton(){
        var element = document.getElementById("side_nav");
        element.classList.add("active");
    }
  return (
    <div>
    <button className=" btn d-md-none d-block open-btn px-1 py-0 " onClick={openbutton}><i className="fas fa-stream"></i></button>
    <div >
   
<nav class="navbar navbar-light bg-light">
  <a class="navbar-brand" href="#">
    <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" alt=""/>
  </a>
</nav>
    </div>
</div>
  )
}

export default Header