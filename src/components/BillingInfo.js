import React, { useState, useEffect } from 'react';
import { Avatar, TextField, Grid, Typography, Box } from '@mui/material';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import RoomServiceIcon from '@mui/icons-material/RoomService';

const BillingInfo = ({ firstName, lastName, email, guestId, isAuthenticated }) => {
    const [billingInfo, setBillingInfo] = useState({
        firstName: firstName,
        lastName: lastName,
        email: email,
        guestId: guestId,
        streetAddress: '1818 College Ave',
        aptNumber: '1C',
        city: 'Harrisonburg',
        state: 'VA',
        zip: '22801',
    });

    // define state variable for the maintenance
    const [openMan, setOpenMan] = useState(false);

    // define state variable for the housekeeping
    const [openHouse, setOpenHouse] = useState(false);

    // define state variable for the room service
    const [openRoom, setOpenRoom] = useState(false);

    // update billing info when user changes their name or email
    useEffect(() => {
        setBillingInfo({
            firstName: firstName,
            lastName: lastName,
            email: email,
            guestId: guestId,
            streetAddress: '1818 College Ave',
            aptNumber: '1C',
            city: 'Harrisonburg',
            state: 'VA',
            zip: '22801',
        });
    }, [firstName, lastName, email, guestId]);


    return (
        <div>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                marginTop={1}
                marginBottom={'5rem'}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 'auto',
                        //border: '1px solid red',
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: (() => {
                                return stringToColor(firstName + lastName);
                            })(),
                            color: (() => {
                                const bgColor = stringToColor(firstName + lastName);
                                return isDarkColor(bgColor) ? 'white' : 'black';
                            })(),
                            fontFamily: 'Russo One, sans-serif',
                            fontSize: '4rem',
                            height: 150,
                            width: 150,
                        }}
                    >
                        {`${(firstName || '')[0] || ''}${(lastName || '')[0] || ''}`}
                    </Avatar>
                    <Typography
                        // onclick javascript popup
                        onClick={() => { alert('Not currently supported') }}
                        sx={{
                            color: '#1876d2',
                            fontFamily: 'Bitter, serif',
                            cursor: 'pointer',
                            marginTop: '2rem',
                        }}>
                        Upload a picture
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        //border: '1px solid blue',
                        marginLeft: {
                            xs: '0rem',
                            sm: '1rem',
                            md: '4rem',
                        }
                    }}
                >
                    {/* buttons */}
                    <Button
                        onClick={() => { setOpenMan(true) }}
                        sx={{
                            fontFamily: 'Russo One, sans-serif',
                            fontSize: '1rem',
                            color: 'white',
                            backgroundColor: 'darkorange',
                            marginBottom: '1rem',
                            width: '20rem',
                            height: '3rem',
                            '&:hover': {
                                backgroundColor: 'orange',
                            },
                            marginTop: {
                                xs: '1rem',
                                sm: '0rem',
                            },
                        }}
                        >
                            <EngineeringIcon 
                                sx={{
                                    marginRight: '1rem',
                                }}

                            />
                        Maintenance
                    </Button>
                    <Button
                        onClick={() => { setOpenHouse(true) }}
                        sx={{
                            fontFamily: 'Russo One, sans-serif',
                            fontSize: '1rem',
                            color: 'white',
                            backgroundColor: '#005B96',
                            marginTop: '1rem',
                            marginBottom: '1rem',
                            width: '20rem',
                            height: '3rem',
                            '&:hover': {
                                backgroundColor: '#0276c2',
                            },
                        }}
                        >
                            <DryCleaningIcon 
                                sx={{
                                    marginRight: '1rem',
                                }}

                            />
                        Housekeeping
                    </Button>
                    <Button
                        onClick={() => { setOpenRoom(true) }}
                        sx={{
                            fontFamily: 'Russo One, sans-serif',
                            fontSize: '1rem',
                            color: 'white',
                            backgroundColor: '#D21312',
                            marginTop: '1rem',

                            width: '20rem',
                            height: '3rem',
                            '&:hover': {
                                backgroundColor: '#ED2B2A',
                            },
                            
                        }}
                        >
                            <RoomServiceIcon 
                                sx={{
                                    marginRight: '1rem',
                                }}

                            />
                        Room service
                    </Button>
                </Box>


                {/* maintenance dialog */}
                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={openMan}
                    onClose={() =>
                        setOpenMan(false)
                    }>
                    <DialogTitle
                        sx={{
                            fontFamily: 'Russo One, sans-serif',
                            color: 'white',
                            // add letter spacing
                            letterSpacing: '0.1em',

                            backgroundColor: 'darkorange',
                        }}

                    >Request received!
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            component={'div'}
                            sx={{
                                fontFamily: 'Bitter, serif',
                                color: 'black',
                                marginTop: '1em',
                                marginBottom: '1em',
                            }}
                        >
                            Thank you for your request! We will be in touch shortly.
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>

                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontFamily: 'Russo One, sans-serif',
                                color: 'grey',
                                fontSize: '0.8em',
                                letterSpacing: '0.1em',
                                position: 'absolute',
                                left: 10,
                                paddingTop: '0.5em',
                                paddingBottom: '0.5em',
                                paddingLeft: '1em',
                            }}
                        >
                            Request submitted at: {new Date().toLocaleTimeString()}
                        </Typography>
                        <Button
                            onClick={() => setOpenMan(false)}
                            sx={{
                                fontFamily: 'Russo One, sans-serif',
                                color: 'white',
                                backgroundColor: 'darkorange',
                                '&:hover': {
                                    backgroundColor: 'orange',

                                }
                            }}
                        >
                            CLOSE</Button>
                    </DialogActions>

                </Dialog>

                {/* housekeeping dialog */}
                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={openHouse}
                    onClose={() =>
                        setOpenHouse(false)
                    }>
                    <DialogTitle
                        sx={{
                            fontFamily: 'Russo One, sans-serif',
                            color: 'white',
                            // add letter spacing
                            letterSpacing: '0.1em',
                            backgroundColor: '#005B96',
                        }}

                    >Request received!
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            component={'div'}
                            sx={{
                                fontFamily: 'Bitter, serif',
                                color: 'black',
                                marginTop: '1em',
                                marginBottom: '1em',
                            }}
                        >
                            Thank you for your request! We will be in touch shortly.
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>

                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontFamily: 'Russo One, sans-serif',
                                color: 'grey',
                                fontSize: '0.8em',
                                letterSpacing: '0.1em',
                                position: 'absolute',
                                left: 10,
                                paddingTop: '0.5em',
                                paddingBottom: '0.5em',
                                paddingLeft: '1em',
                            }}
                        >
                            Request submitted at: {new Date().toLocaleTimeString()}
                        </Typography>
                        <Button
                            onClick={() => setOpenHouse(false)}
                            sx={{
                                fontFamily: 'Russo One, sans-serif',
                                color: 'white',
                                backgroundColor: '#005B96',
                                '&:hover': {
                                    backgroundColor: '#0276c2',

                                }
                            }}
                        >
                            CLOSE</Button>
                    </DialogActions>
                </Dialog>

                {/* room service dialog */}
                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={openRoom}
                    onClose={() =>
                        setOpenRoom(false)
                    }>
                    <DialogTitle
                        sx={{
                            fontFamily: 'Russo One, sans-serif',
                            color: 'white',
                            letterSpacing: '0.1em',
                            backgroundColor: '#D21312',
                        }}

                    >Request received!
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            component={'div'}
                            sx={{
                                fontFamily: 'Bitter, serif',
                                color: 'black',
                                marginTop: '1em',
                                marginBottom: '1em',
                            }}
                        >
                            Thank you for your request! We will be in touch shortly.
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>

                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontFamily: 'Russo One, sans-serif',
                                color: 'grey',
                                fontSize: '0.8em',
                                letterSpacing: '0.1em',
                                position: 'absolute',
                                left: 10,
                                paddingTop: '0.5em',
                                paddingBottom: '0.5em',
                                paddingLeft: '1em',
                            }}
                        >
                            Request submitted at: {new Date().toLocaleTimeString()}
                        </Typography>
                        <Button
                            onClick={() => setOpenRoom(false)}
                            sx={{
                                fontFamily: 'Russo One, sans-serif',
                                color: 'white',
                                backgroundColor: '#D21312',
                                '&:hover': {
                                    backgroundColor: '#ED2B2A',

                                }
                            }}
                        >
                            CLOSE</Button>
                    </DialogActions>
                </Dialog>

            </Grid>

            <Grid item xs={12} sm={8}>
                <Grid
                    container spacing={3}
                    sx={{
                        //border: '1px solid green',
                        width: {
                            lg: '100%',
                        },
                    }}
                >

                    {/* form */}
                    <Grid
                        container spacing={2}
                        sx={{
                            //border: '1px solid orange',
                            // on medium screens and higher, width 50%
                            width: {
                                lg: '75%',
                            },
                            marginLeft: '5px',
                        }}
                    >

                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                value={billingInfo.firstName}
                                InputProps={{
                                    disabled: true,
                                }}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                value={billingInfo.lastName}
                                InputProps={{
                                    disabled: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="email"
                                name="email"
                                label="Email Address"
                                fullWidth
                                value={billingInfo.email}
                                InputProps={{
                                    disabled: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="guestId"
                                name="guestId"
                                label="Guest ID"
                                fullWidth
                                value={billingInfo.guestId}
                                InputProps={{
                                    disabled: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="streetAddress"
                                name="streetAddress"
                                label="Street Address"
                                fullWidth
                                value={billingInfo.streetAddress}
                                InputProps={{
                                    disabled: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="aptNumber"
                                name="aptNumber"
                                label="Apartment Number"
                                fullWidth
                                value={billingInfo.aptNumber}
                                InputProps={{
                                    disabled: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="city"
                                name="city"
                                label="City"
                                fullWidth
                                value={billingInfo.city}
                                InputProps={{
                                    disabled: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="state"
                                name="state"
                                label="State"
                                fullWidth
                                value={billingInfo.state}
                                InputProps={{
                                    disabled: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="zip"
                                name="zip"
                                label="Zip / Postal code"
                                fullWidth
                                value={billingInfo.zip}
                                InputProps={{
                                    disabled: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    {/* end form */}

                </Grid>
            </Grid>




        </div>
    );
};

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

// helper function to get current time and format it to be more readable
function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export default BillingInfo;