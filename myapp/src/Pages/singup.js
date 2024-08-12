import React from "react";

function SingUp() {
    return (
        <React.StrictMode>
            <div className="container mt-5">
                <div className="row align-items-center my-5">
                    <div className="col-md-6">
                        <img src="/assets/img/party-raccoon.jpeg" alt="User Registration/Login" className="img-fluid rounded shadow-sm" />
                    </div>

                    <div className="col-md-6 pt-5 pt-sm-0">
                        <h2>Join Us</h2>
                        <p>We are here for you to find the missing colors in your life...</p>

                        <form>
                            <div class="form-group">
                                <label for="___singup__name">Name</label>
                                <input type="email" class="form-control" id="___singup__name" placeholder="Enter your name" />
                            </div>
                            <div class="form-group">
                                <label for="___singup__surname">Surname</label>
                                <input type="email" class="form-control" id="___singup__surname" placeholder="Enter your surname" />
                            </div>
                            <div class="form-group">
                                <label for="___singup__email">Email address</label>
                                <input type="email" class="form-control" id="___singup__email" placeholder="Enter email" />
                            </div>
                            <div class="form-group">
                                <label for="___singup__password">Password</label>
                                <input type="password" class="form-control" id="___singup__password" placeholder="Password" />
                            </div>
                            <div class="form-group">
                                <label for="___singup__confirmpassword">Confirm Password</label>
                                <input type="password" class="form-control" id="___singup__confirmpassword" placeholder="Confirm Password" />
                            </div>
                            <button type="submit" class="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </React.StrictMode>
    );
}

export default SingUp;