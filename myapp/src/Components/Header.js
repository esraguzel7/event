import React from "react";
import Api from "./Api";

function Header() {
    var api = new Api();

    return (
        <React.Fragment>
            <header class="blog-header py-3">
                <div class="container">
                    <div class="row flex-nowrap justify-content-between align-items-center">
                        <div class="col-4 pt-1">
                            <a class="text-muted" href="/how-it-works">How it Work?</a>
                        </div>
                        <div class="col-4 text-center">
                            <a href="/">
                                <img src='/logo.png' class="logo" alt="logo" />
                            </a>
                        </div>
                        <div class="col-4 d-flex justify-content-end align-items-center">
                            <a class="btn btn-sm btn-outline-secondary" href="/login">Log in</a>&nbsp;
                            <a class="btn btn-sm btn-outline-secondary" href="/singup">Sign Up</a>
                        </div>
                    </div>
                </div>
            </header>
            <div class="container">
                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-between">
                        {api.getEventCategories().map((data, index) => (
                            <a class="p-2 text-muted" href={"/events/" + data.url}>{data.name}</a>
                        ))}
                    </nav>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Header;