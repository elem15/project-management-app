import React from 'react';
import { Link } from 'react-router-dom';
import './Page404.scss';

function Page404() {
  return (
    <div>
      <h2>
        Page not found (404). Go to{' '}
        <Link to="/" className="homepage-link">
          Homepage
        </Link>
      </h2>
    </div>
  );
}

export default Page404;
