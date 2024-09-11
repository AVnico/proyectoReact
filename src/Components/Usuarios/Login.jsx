import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();
    return (
        <Fragment>
            <div class=" "  >
                <img src="NewLogo.png" className="rounded mx-auto d-block" width={450} height={220} alt="..." />
                <h1 className="text-center" style={{padding:20}}>Please sign in</h1>
                <div className="container text-center " >
                    <div className="row justify-content-center"style={{padding:10}}>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Email Adress" aria-label="Username" aria-describedby="basic-addon1"></input>
                        </div>
                    </div>
                    <div className="row justify-content-center"style={{padding:10}}>
                        <div className=" col-auto">
                            <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"></input>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => navigate("/home")}>Sign in</button>
                </div>
            </div>
        </Fragment>

    );
}