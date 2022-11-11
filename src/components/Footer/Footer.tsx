import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <footer className="footer-container">
        <div>
          <a
            className="footer-github"
            target="_blank"
            href="https://github.com/elem15"
            rel="noreferrer"
          >
            elem15
          </a>
        </div>
        <div>
          <a
            className="footer-github"
            target="_blank"
            href="https://github.com/dab10"
            rel="noreferrer"
          >
            dab10
          </a>
        </div>
        <div>
          <a
            className="footer-github"
            target="_blank"
            href="https://github.com/labatsevich"
            rel="noreferrer"
          >
            labatsevich
          </a>
        </div>
        <div className="footer-year">2022</div>
      </footer>
    </div>
  );
}

export default Footer;
