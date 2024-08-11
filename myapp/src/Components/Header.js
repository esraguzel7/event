import React from "react";

function Header() {
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
                            <a class="btn btn-sm btn-outline-secondary" href="/singup">Sign up</a>
                        </div>
                    </div>
                </div>
            </header>
            <div class="container">
                <div class="nav-scroller py-1 mb-2">
                    <nav class="nav d-flex justify-content-between">
                        <a class="p-2 text-muted" href="/">Group 1</a>
                        <a class="p-2 text-muted" href="/">Group 2</a>
                        <a class="p-2 text-muted" href="/">Group 3</a>
                        <a class="p-2 text-muted" href="/">Group 4</a>
                        <a class="p-2 text-muted" href="/">Group 5</a>
                        <a class="p-2 text-muted" href="/">Group 6</a>
                        <a class="p-2 text-muted" href="/">Group 7</a>
                        <a class="p-2 text-muted" href="/">Group 8</a>
                        <a class="p-2 text-muted" href="/">Group 9</a>
                        <a class="p-2 text-muted" href="/">Group 10</a>
                        <a class="p-2 text-muted" href="/">Group 11</a>
                        <a class="p-2 text-muted" href="/">Group 12</a>
                    </nav>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Header;