import React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import '../styles/Header.css';

function Header() {
    return (
        <header className="header">
            <h1>JobsNow</h1>
            <nav>
                <Link to="/jobs">Home</Link>
                <Link to="/jobs/search">Search</Link>
                <Link to="/jobs">History</Link>
            </nav>
            <SearchBox />
        </header>
    );
}

export default Header;
