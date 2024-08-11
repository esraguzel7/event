import React from "react";

function Login() {
    return (
        <React.StrictMode>
            <div className="container mt-5">
                <div className="row align-items-center my-5">
                    <div className="col-md-6">
                        <img src="/assets/img/party-raccoon.jpeg" alt="User Registration/Login" className="img-fluid rounded shadow-sm" />
                    </div>

                    <div className="col-md-6 pt-5 pt-sm-0">
                        <h2>Login Your Account</h2>
                        <p>Log in to your account and manage your events or join a new event. Fun is waiting for you...</p>

                        <form>
                            <div class="form-group">
                                <label for="___login__email">Email address</label>
                                <input type="email" class="form-control" id="___login__email" placeholder="Enter email" />
                            </div>
                            <div class="form-group">
                                <label for="___login__password">Password</label>
                                <input type="password" class="form-control" id="___login__password" placeholder="Password" />
                            </div>
                            <button type="submit" class="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </React.StrictMode>
    );
}

export default Login;