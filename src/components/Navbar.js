import React from "react";
import Identicon from 'react-identicons';

export default function Navbar({account}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container-fluid container">
        <a target="_blank" className="navbar-brand" href="https://tupaginaonline.net">
          Bienvenidos a  <b>Decentagram</b>
        </a>
          <ul className="navbar-nav">
            <li className="nav-item ">
              <a className="nav-link text-white" href="#">
                Mi cuenta: {account} &nbsp;
                <Identicon size="25" string={account} />
              </a>
            </li>
            
          </ul>
        
      </div>
    </nav>
  );
}
