import React from "react";
import ShowMessages from "../Components/ShowMessages";
import API_URL from "../Components/Api";

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

                        <form method="post" onSubmit={SingUpEvent}>
                            <div class="form-group">
                                <label for="___singup__name">Name</label>
                                <input type="text" name="name" class="form-control" id="___singup__name" placeholder="Enter your name" />
                            </div>
                            <div class="form-group">
                                <label for="___singup__surname">Surname</label>
                                <input type="text" name="surname" class="form-control" id="___singup__surname" placeholder="Enter your surname" />
                            </div>
                            <div class="form-group">
                                <label for="___singup__email">Email address</label>
                                <input type="email" name="email" class="form-control" id="___singup__email" placeholder="Enter email" />
                            </div>
                            <div class="form-group">
                                <label for="___singup__password">Password</label>
                                <input type="password" name="password" class="form-control" id="___singup__password" placeholder="Password" />
                            </div>
                            <div class="form-group">
                                <label for="___singup__confirmpassword">Confirm Password</label>
                                <input type="password" name="confirm_password" class="form-control" id="___singup__confirmpassword" placeholder="Confirm Password" />
                            </div>
                            <button type="submit" class="btn btn-primary">Sing Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </React.StrictMode>
    );
}

async function SingUpEvent(e) {
    e.preventDefault();

    const password = e.target.querySelector('input[name=password]').value;
    const confirm_password = e.target.querySelector('input[name=confirm_password]').value;

    if (password !== confirm_password) {
        let message = ShowMessages.ShowErrorMessage('Passwords do not match. Check the passwords you entered');
        e.target.insertBefore(message, e.target.querySelector('button[type=submit]'));

        setTimeout(() => {
            message.remove()
        }, 2500);
        return;
    }

    var body = {
        name: e.target.querySelector('input[name=name]').value,
        surname: e.target.querySelector('input[name=surname]').value,
        email: e.target.querySelector('input[name=email]').value,
        password: e.target.querySelector('input[name=password]').value
    }

    try {
        console.log(API_URL);
        
        const response = await fetch('http://localhost:5001/signup', {
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
            setTimeout(() => {
                window.location = '/login';
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

export default SingUp;