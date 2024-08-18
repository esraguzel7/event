import React from "react";

function Return502() {
    return (
        <React.StrictMode>
            <div class="container">
                <div class="row py-5">
                    <div class="col-sm-12 text-center">
                        <h2>Access problem</h2>
                        <p class="text-muted">
                            You must be logged in to view this page
                        </p>
                    </div>
                    <div class="col-sm-6 text-center">
                        <a href="/login" class="btn btn-primary">Click to log in</a>
                    </div>
                    <div class="col-sm-6 text-center">
                        <a href="/signup" class="btn btn-primary">Click to sign up</a>
                    </div>
                </div>
            </div>
        </React.StrictMode>
    )
}

export default Return502;