import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHippo } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Button } from './Button';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
        }
        return (
            <>
                <nav className='navbar'>
                    <div className='navbar-container'>
                        <Link to="/" className='navbar-logo'>
                            TEST <FontAwesomeIcon icon={faHippo} />
                        </Link>
                        <div className='menu-icon'>
                            <FontAwesomeIcon icon={faEnvelope} onClick={handleClick} />
                        </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className='nav-item'>
                                <Link to='/' className='nav-links' onclick={closeMobileMenu}>
                                    Home
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/services' className='nav-links' onclick={closeMobileMenu}>
                                    Services
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/products' className='nav-links' onclick={closeMobileMenu}>
                                    Products
                                </Link>
                            </li>
                        </ul>
                        {button && <Button buttonStyle='{btn--outline}'>SIGN UP</Button>}
                    </div>
                </nav>
            </>
        
        );

    };

    window.addEventListener('resize', showButton);

    return (
        <>
            {showButton()}
        </>
    );

    
}

export default Navbar;