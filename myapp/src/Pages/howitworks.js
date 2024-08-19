import React from "react";

function HowItWorks() {
    return (
        <React.StrictMode>
            <div className="container mt-5">
                <h1 className="text-center mb-4">How It Works</h1>

                <div className="row align-items-center my-5">
                    <div className="col-md-6">
                        <h2>User Registration/Login</h2>
                        <p>Sign up or log in to access our event management system. Get started by creating your profile.</p>
                    </div>
                    <div className="col-md-6">
                        <img src="/assets/img/howitworks/info1.png" alt="User Registration/Login" className="img-fluid" />
                    </div>
                </div>

                <div className="row align-items-center my-5">
                    <div className="col-md-6 order-md-2">
                        <h2>Event Creation</h2>
                        <p>Create events with details like location, date, number of attendees, and ticket prices. Manage your events effortlessly.</p>
                    </div>
                    <div className="col-md-6 order-md-1">
                        <img src="/assets/img/howitworks/info2.png" alt="Event Creation" className="img-fluid" />
                    </div>
                </div>

                <div className="row align-items-center my-5">
                    <div className="col-md-6">
                        <h2>Event Search</h2>
                        <p>Search for events by category, location, and date. Find the events that interest you the most.</p>
                    </div>
                    <div className="col-md-6">
                        <img src="path-to-your-image3.jpg" alt="Event Search" className="img-fluid" />
                    </div>
                </div>

                <div className="row align-items-center my-5">
                    <div className="col-md-6 order-md-2">
                        <h2>Ticket Purchase</h2>
                        <p>Purchase tickets for events and receive digital tickets via email. Easy and secure payment process.</p>
                    </div>
                    <div className="col-md-6 order-md-1">
                        <img src="path-to-your-image4.jpg" alt="Ticket Purchase" className="img-fluid" />
                    </div>
                </div>

                <div className="row align-items-center my-5">
                    <div className="col-md-6">
                        <h2>Notifications</h2>
                        <p>Receive notifications about upcoming events and ticket purchases. Stay informed about all your events.</p>
                    </div>
                    <div className="col-md-6">
                        <img src="path-to-your-image5.jpg" alt="Notifications" className="img-fluid" />
                    </div>
                </div>
            </div>
        </React.StrictMode>
    );
}

export default HowItWorks;