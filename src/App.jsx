import React from "react";

import { Route,Routes,useNavigate } from "react-router-dom";

import { Fragment } from "react";
import { Navbar } from "./Navbar";
import { ListFacebook } from "./Components/ListFacebook";
import { ListCard } from "./Components/ListCard";
import { ListTwitter } from "./Components/ListTwitter";
import { ListInstagram } from "./Components/ListInstagram";
import { ListYoutube } from "./Components/ListYoutube";
export function App(){

    const navigate = useNavigate();

    return(
    <Fragment>
        <Navbar></Navbar>
        <Routes>
            
            <Route path="/facebook" element={<ListFacebook />} />
            <Route path="/twitter" element={<ListTwitter />} />
            <Route path="/instagram" element={<ListInstagram />} />
            <Route path="/youtube" element={<ListYoutube />} />
            <Route path="*" element={<ListCard/>} />
        </Routes>
    </Fragment>);
}