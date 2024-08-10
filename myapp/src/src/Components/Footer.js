import React from "react";

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer class="footer">
            <p>Add fun to your life with <strong>Event360</strong> &#129395; &#129395;</p>
            <p>
                <a href="#top" onClick={scrollToTop}>Back to top</a>
            </p>
        </footer>
    )
}

export default Footer;
