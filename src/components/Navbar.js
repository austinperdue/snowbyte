import { Link } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


// material ui imports
import { Avatar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Button from '@mui/material/Button';
import { AppBar } from '@mui/material';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import Alert from './Alert';

// pages for navbar
const pages = ['Home', 'Explore', 'Stay', 'Faq'];
// controls spacing between links
let link_spacing = 0;


export default function Navbar({ isAuthenticated, handleLogout }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleUserLogout = () => {
        handleLogout();
        handleCloseUserMenu();
        navigate('/');

    };

    return (
        <>
            <Alert />
            <AppBar
                position="fixed"
                elevation={2}
                sx={{
                    backgroundColor: 'white',
                    // temporary fix for alert bar covering navbar, can remove later
                    top: '48px',
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AcUnitRoundedIcon
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                mr: 1,
                                color: 'darkorange',
                            }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            className='logo-text'
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                letterSpacing: '.1rem',
                                color: 'black',
                                textDecoration: 'none',
                                fontSize: { xs: '1.5rem', md: '1.8rem' },
                                fontFamily: 'Russo One, sans-serif',
                            }}
                        >
                            snowbyte
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="black"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none', },
                                }}
                            >
                                {pages.map((page) => (
                                    <Link
                                        key={page}
                                        to={`/${page.toLowerCase()}`}
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                        </Box>
                        <AcUnitRoundedIcon
                            sx={{
                                display: {
                                    xs: 'flex',
                                    md: 'none'
                                },
                                mr: 1,
                                color: 'black',
                            }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            className='logo-text'
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                letterSpacing: '.1rem',
                                color: 'black',
                                textDecoration: 'none',
                                fontSize: { xs: '1.5rem', md: '1.8rem' },
                                fontFamily: 'Russo One, sans-serif',
                            }}
                        >
                            snowbyte
                        </Typography>


                        <Box sx={{ flexGrow: 3, display: { xs: 'none', md: 'flex', marginLeft: 75 } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    component={Link}
                                    to={`/${page.toLowerCase()}`}
                                    sx={{
                                        my: 2,
                                        color: 'black',
                                        display: 'block',
                                        fontFamily: 'Russo One, sans-serif',
                                        fontSize: '1rem',
                                        marginLeft: link_spacing === 0 ? 3 : 1,
                                        // change color on hover
                                        '&:hover': {
                                            color: 'darkorange',
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>


                        {/* sign in button */}
                        {isAuthenticated ? (
                            <IconButton onClick={handleOpenUserMenu}>
                                <Avatar
                                    sx={{
                                        bgcolor: (() => {
                                            const token = localStorage.getItem('token');
                                            const decoded = jwt_decode(token);
                                            const firstName = decoded.firstName;
                                            const lastName = decoded.lastName;
                                            return stringToColor(firstName + lastName);
                                        })(),
                                        color: (() => {
                                            const token = localStorage.getItem('token');
                                            const decoded = jwt_decode(token);
                                            const firstName = decoded.firstName;
                                            const lastName = decoded.lastName;
                                            const bgColor = stringToColor(firstName + lastName);
                                            return isDarkColor(bgColor) ? 'white' : 'black';
                                        })(),
                                        // change font
                                        fontFamily: 'Russo One, sans-serif',
                                        fontSize: '1rem',

                                    }}
                                >
                                    {isAuthenticated
                                        ? (() => {
                                            const token = localStorage.getItem('token');
                                            const decoded = jwt_decode(token);
                                            const firstName = decoded.firstName;
                                            const lastName = decoded.lastName;
                                            return (
                                                firstName.charAt(0).toUpperCase() +
                                                lastName.charAt(0).toUpperCase()
                                            );
                                        })()
                                        : ''}
                                </Avatar>
                            </IconButton>
                        ) : (
                            <Button
                                component={Link}
                                to={'/signin'}
                                variant="outlined"
                                sx={{
                                    fontFamily: 'Russo One, sans-serif',
                                    color: 'black',
                                    borderColor: 'black',
                                    borderWidth: '2px',
                                    '&:hover': {
                                        backgroundColor: 'black',
                                        color: 'white',
                                    },
                                }}
                            >
                                Sign In
                            </Button>
                        )}

                        {/* user menu if logged in */}
                        <Menu
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            <MenuItem component={Link} to="/dashboard" onClick={handleCloseUserMenu}>
                                My Account
                            </MenuItem>
                            <MenuItem onClick={handleUserLogout}>Log out</MenuItem>
                        </Menu>

                    </Toolbar>


                </Container>

            </AppBar>
        </>
    )

}

// generates random color based on user's name in string for avatar
function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

// helper function to determine if the random color is dark or light, 
// and changes the text color to either black or white
function isDarkColor(color) {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
}