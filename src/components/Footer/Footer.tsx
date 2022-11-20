import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <footer className="footer__container">
        <a className="footer__logo" href="https://rs.school/" target="__blank"></a>
        <ul className="nav">
          <a
            className="nav__link"
            target="_blank"
            href="https://github.com/elem15"
            rel="noreferrer"
          >
            elem15
          </a>
          <a className="nav__link" target="_blank" href="https://github.com/dab10" rel="noreferrer">
            dab10
          </a>
          <a
            className="nav__link"
            target="_blank"
            href="https://github.com/labatsevich"
            rel="noreferrer"
          >
            labatsevich
          </a>
        </ul>
        <div className="footer__year">&copy;2022</div>
      </footer>
    </div>
  );
}

export default Footer;
