import React, { Fragment, useState } from "react";
import './VistaParental.css';

export function VistaParental() {
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleAdultLogin = () => {
        setShowPasswordPopup(true);
        setError('');
        setSuccess('');
    };

    const handleClosePopup = () => {
        setShowPasswordPopup(false);
        setPassword('');
        setError('');
    };

    const handlePasswordVerification = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/autenticacion/controlparental', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario_id: localStorage.getItem('usuario_id'),
                    contrasena: password,
                }),
            });

            const text = await res.text();
            const data = JSON.parse(text);
            if (res.ok) {
                setSuccess('Acceso concedido');
                localStorage.setItem('esInfantil', 0); // Guardar 0 para adulto
                setTimeout(() => {
                    window.location.href = '/peliculas';
                }, 1000);
            } else {
                setError(data.error || 'Contraseña parental incorrecta.');
            }
        } catch (error) {
            setError('Error al verificar la contraseña parental.');
            console.error(error);
        }
    };

    const handleChildLogin = () => {
        localStorage.setItem('esInfantil', 1); // Guardar 1 para infantil
        window.location.href = '/peliculas';
    };

    return (
        <Fragment>
            <div className="vista-parental">
                <div className="child-section">
                    <button className="login-button" onClick={handleChildLogin}>
                        Cuevana Infantil
                    </button>
                </div>
                <div className="adult-section">
                    <button className="login-button" onClick={handleAdultLogin}>
                        Cuevana Adulto
                    </button>
                </div>
            </div>

            {showPasswordPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h3>Ingrese Contraseña</h3>
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="popup-buttons">
                            <button className="verify-button" onClick={handlePasswordVerification}>
                                Verificar
                            </button>
                            <button className="close-button" onClick={handleClosePopup}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}
