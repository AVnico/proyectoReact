import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import './VistaParental.css';

export function VistaParental() {
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);

    const handleAdultLogin = () => {
        setShowPasswordPopup(true);
    };

    const handleClosePopup = () => {
        setShowPasswordPopup(false);
    };

    return (
        <Fragment>
            <div className="vista-parental">
                <div className="child-section">
                    <button className="login-button" >Cuevana Infantil</button>
                </div>
                <div className="adult-section">
                    <button className="login-button" onClick={handleAdultLogin}>Cuevana Adulto</button>
                </div>
            </div>

            {showPasswordPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h3>Ingrese Contraseña</h3>
                        <input type="password" placeholder="Contraseña" />
                        <button onClick={handleClosePopup}>Cerrar</button>
                    </div>
                </div>
            )}
        </Fragment>
    );
}
