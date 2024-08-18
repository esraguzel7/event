import React from "react";
import ShowMessages from "../Components/ShowMessages";

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

                        <form method="post" onSubmit={LoginEvent}>
                            <div class="form-group">
                                <label for="___login__email">Email address</label>
                                <input type="email" name="email" class="form-control" id="___login__email" placeholder="Enter email" />
                            </div>
                            <div class="form-group">
                                <label for="___login__password">Password</label>
                                <input type="password" name="password" class="form-control" id="___login__password" placeholder="Password" />
                            </div>
                            <button type="submit" class="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </React.StrictMode>
    );
}

async function LoginEvent(e) {
    e.preventDefault();

    var body = {
        email: e.target.querySelector('input[name=email]').value,
        password: e.target.querySelector('input[name=password]').value
    }

    try {
        const response = await fetch('http://localhost:5001/login', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        });

        const data = await response.json();
        var result = data;

        let message = null;

        if (result.status === false) {
            message = ShowMessages.ShowErrorMessage(result.message);
        } else {
            message = ShowMessages.ShowSuccessMessage(result.message);
            localStorage.setItem('token', result.token);
            setTimeout(() => {
                window.location = '/';
            }, 2500);
        }

        e.target.insertBefore(message, e.target.querySelector('button[type=submit]'));
        setTimeout(() => {
            message.remove()
        }, 2500);

    } catch (error) {
        console.error('Error:', error);
    }
}

export default Login;