import { Link } from 'react-router-dom';
import React from 'react';

// material ui imports
import { Avatar, Tooltip, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Popover, MenuList, ListItem, ListItemText} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


import Button from '@mui/material/Button';
import { AppBar } from '@mui/material';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import Alert from './Alert';
import FAQ from '../FAQ';

// pages for navbar
const pages = ['Home', 'Explore', 'Stay', 'Dine', 'Faq'];
// settings for user account
const settings = ['Login', 'Logout'];
// controls spacing between links
let link_spacing = 0;




export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    // state variable checking if user is logged in
    const [loggedIn, setLoggedIn] = React.useState(false);

    // function to toggle login
    const toggleLogin = () => {
        setLoggedIn(!loggedIn);
    };


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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
                top: '48px'
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AcUnitRoundedIcon
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            mr: 1,
                            color: 'black',
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
                                        color: '#FCB976',
                                        backgroundColor: 'transparent',
                                    },
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>


                {/* sign in button */}
                <Button
                    component={Link}
                    //to={loggedIn ? '/logout' : '/signin'}
                    //onClick={toggleLogin}
                    // use setting to toggle login
                    to={'SignIn'}
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
                    {loggedIn ? 'Log Out' : 'Sign In'}
                </Button>
                
                </Toolbar>


            </Container>

        </AppBar>
        </>
    )

}