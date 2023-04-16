import { Link } from 'react-router-dom';
import React from 'react';

// material ui imports
import { Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Popover, MenuList, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


import Button from '@mui/material/Button';
import { AppBar } from '@mui/material';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';

// pages for navbar
const pages = ['Home', 'Explore', 'Stay', 'Dine', 'Faq'];
// settings for user account
const settings = ['Account', 'Logout'];
// controls spacing between links
let link_spacing = 0;




export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);




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
        <AppBar
            position="fixed"
            elevation={2}
            sx={{
                backgroundColor: 'white',
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


                    {/* will add sign in button here */}

                    {/* Avatar box */}
                    {/* <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> */}
                </Toolbar>
            </Container>
        </AppBar>
    )

}
