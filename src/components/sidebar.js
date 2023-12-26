import React, {Component} from "react";
import logo from './../111.png'
import  './../assets/main.css'
function SideBar(){
    return <div>
        <aside>
            <p className="text-center"> <img src={logo} alt="Logo" width="70%"/> </p>
            <a href="/">
                <i className="fa fa-user-o" aria-hidden="true"></i>
                Bosh sahifa
            </a>
            <a href="/staff/task">
                <i className="fa fa-laptop" aria-hidden="true"></i>
                Xodimlar
            </a>

        </aside>

        <div className="social">
            <a href="https://www.linkedin.com/in/florin-cornea-b5118057/" target="_blank">
                <i className="fa fa-linkedin"></i>
            </a>
        </div>
    </div>
}
export default SideBar