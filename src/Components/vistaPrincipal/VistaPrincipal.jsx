import React from 'react';
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderG } from '../Busqueda/HeaderG';
import '../../a.css';  

export function VistaPrincipal() {
    const navigate = useNavigate();
    return (
        <Fragment>
            <HeaderG></HeaderG>
        <div className="homepage" style={styles.page}>
            {/* Encabezado con el logo y el nombre */}
            <header className="text-center mb-5">
                <img
                    src="NewLogo.png"
                    alt="logo"
                    style={styles.logo}
                />
                <h1 style={styles.title}>Mi Sitio de Películas Favorito</h1>
            </header>


            {/* Botón de acceso */}
            <div className="text-center mb-5">
                <button style={styles.mainButton} onClick={() => navigate('/peliculas')}>Entrar</button>
            </div>

            {/* Sección de información */}
            <section style={styles.infoSection} className="text-center">
                <div className="info-content">
                    <h2 style={styles.sectionTitle}>Todas las películas en un solo lugar</h2>
                    <p style={styles.sectionText}>
                        Disfruta de una experiencia única viendo tus películas y series favoritas online.
                        Nuestro sitio ofrece un catálogo variado que podrás disfrutar sin interrupciones.
                    </p>
                </div>
            </section>
        </div>
        </Fragment>
        
    );
}


const styles = {

    logo: {
        width: '150px',
        marginBottom: '20px',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#1a1c2b',
        borderRadius: '50px',
        padding: '5px 15px',
        width: '400px',
        maxWidth: '100%',
    },
    searchInput: {
        border: 'none',
        background: 'none',
        color: '#fff',
        width: '100%',
        padding: '10px',
        outline: 'none',
        fontSize: '1rem',
    },
    searchButton: {
        border: 'none',
        backgroundColor: 'transparent',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '1.2rem',
    },
    mainButton: {
        backgroundColor: '#007bff',
        border: 'none',
        color: '#fff',
        padding: '10px 30px',
        borderRadius: '30px',
        fontSize: '1.2rem',
        cursor: 'pointer',
    },
    infoSection: {
        backgroundColor: '#1a1c2b',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '600px',
        width: '100%',
    },
    sectionTitle: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        marginBottom: '15px',
    },
    sectionText: {
        fontSize: '1rem',
        lineHeight: '1.5',
    },
};
