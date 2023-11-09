import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        `&copy; {new Date().getFullYear()} MAI-Pomogator`
      </p>
    </footer>
  );
}

export default Footer;
