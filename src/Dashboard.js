import React from "react";
import { Box, Typography } from "@mui/material";
import dashboardHeader from "./images/ski.jpg";
import { useAuth } from "./hooks/useAuth";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import dashpic1 from "./images/dashpic-1.jpg";
import dashpic2 from "./images/dashpic-2.jpg";
import dashpic3 from "./images/dashpic-3.jpg";
import CloudIcon from '@mui/icons-material/Cloud';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Reservations from "./components/Reservations";
import employeeHeader from "./images/employeeHeader.jpg";
import EmployeeLookup from "./components/EmployeeLookup";

function Dashboard() {


    // define state variable for the lift dialog
    const [openLift, setOpenLift] = useState(false);

    // define state variable for dining dialog
    const [openDining, setOpenDining] = useState(false);

    // gradient text
    const GradientText = ({ text, fromColor, toColor }) => {
        return (
            <Box
                component="span"
                sx={{
                    background: `linear-gradient(45deg, ${fromColor} 30%, ${toColor} 90%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                {text}
            </Box>
        );
    };

    // state variables for user information
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [guestId, setGuestId] = useState("");

    // state variable to check if the user is an employee
    const [employeeId, setEmployeeId] = useState(null);

    const fetchUserInfo = () => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwt_decode(token);
                setFirstName(decoded.firstName);
                setLastName(decoded.lastName);
                setEmail(decoded.email);
                setGuestId(decoded.guest_id);

                // check if they are in employee
                if (decoded.employee_id) {
                    setEmployeeId(decoded.employee_id);
                }
            } catch (error) {
                console.error("Error decoding JWT token:", error);
            }
        }
    };

    // fetch user information on component mount
    useEffect(() => {
        fetchUserInfo();
    }, []);

    // user must be logged in (with session) to view dashboard
    // otherwise, redirect to sign in page
    useAuth();

    return (
        <div
            style={{
                display: 'flex',
                minHeight: '75vh',
                flexDirection: 'column',
                paddingTop: '10em',
                paddingBottom: '2em',
                //border: '1px solid red',
                paddingLeft: '5em',
                paddingRight: '5em',
            }}>

            {/* Responsive container for the image and text */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    minHeight: '25vh',
                    overflow: 'hidden',
                    marginTop: '2em',
                    marginBottom: '4em',
                    borderRadius: '1em',
                    // box shadow

                }}>
                {/* Background image */}
                <Box

                    alt="FAQ header image"
                    sx={{
                        width: '100%',
                        height: '200%',
                        objectFit: 'cover',
                        objectPosition: 'center', // default object position
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: -1,
                        '@media (min-width: 600px)': {
                            // larger desktop screens, allows to scale image
                            objectPosition: '30% 30%',
                        },
                        backgroundImage: `url(${employeeId ? employeeHeader : dashboardHeader})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPositionY: '20%',
                        '@media (min-width: 600px)': {
                            backgroundPositionY: '30%',
                        },
                    }}
                />
                {/* Text overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        textAlign: 'left',
                        transform: 'translate(-80%, -60%)',
                    }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: {
                                sm: '2.5em',
                                md: '2.5em',
                                lg: '3.2em',
                            },
                            fontFamily: 'Russo One, sans-serif',
                            color: 'white',
                            // add slight text shadow
                            textShadow: '2px 2px 5px #000000',
                        }}>
                        
                        {employeeId ? "Do the impossible." : "Ski your way."}
                    </Typography>
                </Box>
            </Box>

            {/* Welcome section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    justifyContent: 'left',
                    textAlign: 'left',
                    marginBottom: '2em',
                    //border: '1px solid green',
                }}>

                <Typography
                    variant="h4"
                    sx={{
                        fontSize: {
                            sm: "2.5em",
                            md: "2.5em",
                            lg: "3.2em",
                        },
                        fontFamily: "Russo One, sans-serif",
                        color: "black",
                        marginBottom: "0.5em",
                    }}
                >
                    {employeeId ? "Clock in, " : "Welcome back, "}
                    <GradientText text={firstName} fromColor="#ff9966" toColor="#ff5e62" />{""}!
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        fontSize: {
                            xs: '1em',
                            sm: '1.2em',
                            md: '1.4em',
                            lg: '1.8em',
                        },
                        fontFamily: 'Russo One, sans-serif',
                        color: 'black',
                        marginBottom: '1em',
                    }}>

                    {employeeId ? "Have a great shift!" : "We're happy to see you."}
                </Typography>

            </Box>


            {/* Current offers section */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    minHeight: '25vh',
                    overflow: 'hidden',
                    marginTop: '3em',
                    marginBottom: '4em',
                    //border: '1px solid blue',
                }}
            >
                <Grid container spacing={6}>
                    <Grid item xs={12} sm={12} md={4} lg>

                        {/* Card 1 */}
                        <Card sx={{ position: 'relative', borderRadius: '20px' }}>
                            <CardMedia
                                component="img"
                                height="400"
                                image={dashpic1}
                                alt="Dashpic 1"
                            />
                            <CardContent sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                                <div style={{
                                    display: 'flex', justifyContent: 'center',
                                    alignItems: 'center', flexDirection: 'column'
                                }}>

                                    <CloudIcon sx={{
                                        fontSize: 150,
                                        color: 'white',
                                        transition: 'font-size 1.5s',
                                        '&:hover': {
                                            fontSize: 175,
                                        },
                                    }}
                                    />
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        sx={{
                                            fontSize: {
                                                xs: '1.5em',
                                                sm: '1.3em',
                                                md: '1.3em',
                                                lg: '1.6em',
                                            },
                                            fontFamily: 'Bitter, serif',
                                            color: 'white',
                                            paddingTop: '2em',
                                        }}
                                    >
                                        Currently cloudy 7° F
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            fontSize: {
                                                xs: '1em',
                                                sm: '1em',
                                                md: '1em',
                                            },
                                            fontFamily: 'Bitter, serif',
                                            color: 'white',
                                            marginBottom: '1em',
                                        }}
                                    >
                                        10 inches in the last 24 hours.
                                    </Typography>

                                    <Button
                                        variant="outlined"
                                        // link to weather.com
                                        href="https://weather.com/"
                                        target="_blank"

                                        sx={{
                                            borderColor: 'white',
                                            color: 'white',
                                            fontFamily: 'Russo One, sans-serif',

                                            '&:hover': {
                                                backgroundColor: 'white',
                                                borderColor: 'white',
                                                color: 'black'
                                            }
                                        }}
                                    >
                                        View full report
                                    </Button>

                                </div>


                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg>
                        {/* Card 2 */}
                        <Card sx={{ position: 'relative', borderRadius: '20px' }}>
                            <CardMedia
                                component="img"
                                height="400"
                                image={dashpic2}
                                alt="Dashpic 2"
                            />
                            <CardContent sx={{ position: 'absolute', bottom: -10, left: 0, right: 0 }}>
                                <div style={{
                                    display: 'flex', justifyContent: 'center',
                                    alignItems: 'center', flexDirection: 'column',
                                }}>
                                    <Button
                                        variant="contained"
                                        onClick={() => { setOpenLift(true) }}
                                        sx={{
                                            borderColor: 'white',
                                            color: 'white',
                                            fontFamily: 'Russo One, sans-serif',
                                            backgroundColor: 'forestgreen',
                                            width: '100%',
                                            '&:hover': {
                                                backgroundColor: 'white',
                                                borderColor: 'white',
                                                color: 'forestgreen',
                                                // change text content on hover
                                                '& .MuiSvgIcon-root': {
                                                    color: 'forestgreen'
                                                }
                                            },
                                            // style for the icon
                                            '& .MuiSvgIcon-root': {
                                                color: 'white',
                                                // move all the way to the left
                                                position: 'absolute',
                                                left: 10
                                            }
                                        }}
                                    >
                                        <CheckCircleOutlinedIcon
                                            sx={{
                                                color: 'white',
                                                // move all the way to the left
                                                position: 'absolute',
                                                left: 10,

                                            }}
                                        />

                                        ALL LIFTS OPERATIONAL

                                    </Button>
                                    <Dialog
                                        fullWidth
                                        maxWidth="sm"
                                        open={openLift}
                                        onClose={() =>
                                            setOpenLift(false)
                                        }>
                                        <DialogTitle
                                            sx={{
                                                fontFamily: 'Russo One, sans-serif',
                                                color: 'white',
                                                // add letter spacing
                                                letterSpacing: '0.1em',

                                                backgroundColor: 'darkorange',
                                            }}

                                        >Lift Status
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

                                                All lifts are currently operational. If you have a question about
                                                a specific lift, please contact us.
                                                <br></br>
                                                <br></br>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontFamily: 'Russo One, sans-serif',
                                                        color: 'black',
                                                        letterSpacing: '0.1em',
                                                    }}
                                                >
                                                    Super skyflyer
                                                    <span style={{
                                                        color: 'forestgreen',
                                                        // align to right
                                                        float: 'right',

                                                    }}>OPEN</span>
                                                </Typography>

                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontFamily: 'Russo One, sans-serif',
                                                        color: 'black',
                                                        letterSpacing: '0.1em',
                                                    }}
                                                >
                                                    East Village Express
                                                    <span style={{
                                                        color: 'forestgreen',
                                                        // align to right
                                                        float: 'right',

                                                    }}>OPEN</span>
                                                </Typography>

                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontFamily: 'Russo One, sans-serif',
                                                        color: 'black',
                                                        letterSpacing: '0.1em',
                                                    }}
                                                >
                                                    Little Eagle
                                                    <span style={{
                                                        color: 'forestgreen',
                                                        // align to right
                                                        float: 'right',

                                                    }}>OPEN</span>
                                                </Typography>

                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontFamily: 'Russo One, sans-serif',
                                                        color: 'black',
                                                        letterSpacing: '0.1em',
                                                    }}
                                                >
                                                    Devil's Descent
                                                    <span style={{
                                                        color: 'forestgreen',
                                                        // align to right
                                                        float: 'right',

                                                    }}>OPEN</span>
                                                </Typography>

                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontFamily: 'Russo One, sans-serif',
                                                        color: 'black',
                                                        letterSpacing: '0.1em',
                                                    }}
                                                >
                                                    Skyview cablecar
                                                    <span style={{
                                                        color: 'darkorange',
                                                        // align to right
                                                        float: 'right',

                                                    }}>SUMMER ONLY</span>
                                                </Typography>

                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontFamily: 'Russo One, sans-serif',
                                                        color: 'black',
                                                        letterSpacing: '0.1em',
                                                    }}
                                                >
                                                    Ballistic Backbowl
                                                    <span style={{
                                                        color: 'forestgreen',
                                                        // align to right
                                                        float: 'right',

                                                    }}>OPEN</span>
                                                </Typography>


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

                                                Last updated: 10:00 AM
                                            </Typography>
                                            <Button
                                                onClick={() => setOpenLift(false)}
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
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>


                    <Grid item xs={12} sm={12} md={4} lg>
                        {/* Card 3 */}
                        <Card sx={{ position: 'relative', borderRadius: '20px' }}>
                            <CardMedia
                                component="img"
                                height="400"
                                image={dashpic3}
                                alt="Dashpic 3"
                            />
                            <CardContent sx={{ position: 'absolute', bottom: -10, left: 0, right: 0 }}>
                                <div style={{
                                    display: 'flex', justifyContent: 'center',
                                    alignItems: 'center', flexDirection: 'column',
                                }}>
                                    <Button
                                        variant="contained"
                                        onClick={() => { setOpenDining(true) }}
                                        sx={{
                                            borderColor: 'white',
                                            color: 'white',
                                            fontFamily: 'Russo One, sans-serif',
                                            backgroundColor: 'darkorange',
                                            width: '100%',
                                            '&:hover': {
                                                backgroundColor: 'white',
                                                borderColor: 'white',
                                                color: 'darkorange',
                                                // change text content on hover
                                                '& .MuiSvgIcon-root': {
                                                    color: 'darkorange'
                                                }
                                            },
                                            // style for the icon
                                            '& .MuiSvgIcon-root': {
                                                color: 'white',
                                                // move all the way to the left
                                                position: 'absolute',
                                                left: 10
                                            }
                                        }}
                                    >
                                        <LunchDiningOutlinedIcon
                                            sx={{
                                                color: 'white',
                                                // move all the way to the left
                                                position: 'absolute',
                                                left: 10,

                                            }}
                                        />

                                        FREE DINING VOUCHER

                                    </Button>

                                    <Dialog
                                        fullWidth
                                        maxWidth="sm"
                                        open={openDining}
                                        onClose={() =>
                                            setOpenDining(false)
                                        }>
                                        <DialogTitle
                                            sx={{
                                                fontFamily: 'Russo One, sans-serif',
                                                color: 'white',
                                                // add letter spacing
                                                letterSpacing: '0.1em',
                                                backgroundColor: 'darkorange',
                                            }}

                                        >Congratulations!
                                        </DialogTitle>

                                        <DialogContent>
                                            <DialogContentText
                                                sx={{
                                                    fontFamily: 'Bitter, serif',
                                                    color: 'black',
                                                    marginTop: '2em',
                                                }}
                                            >
                                                Thank you for choosing Snowbyte. We've automatically added a $500 meal voucher redeemable at any dining
                                                location to your account. It is non-transferable and expires at the end of the season. If you have any
                                                questions or would like to learn more about our dining options, please visit our dine page.
                                            </DialogContentText>
                                        </DialogContent>

                                        <DialogActions>
                                            <Button
                                                onClick={() => setOpenDining(false)}
                                                sx={{
                                                    fontFamily: 'Russo One, sans-serif',
                                                    color: 'white',
                                                    backgroundColor: 'darkorange',
                                                    '&:hover': {
                                                        backgroundColor: 'orange',

                                                    }
                                                }}
                                            >
                                                THANK YOU</Button>
                                        </DialogActions>

                                    </Dialog>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>


            {/* Welcome section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    justifyContent: 'left',
                    textAlign: 'left',
                    marginBottom: '2em',
                    //border: '1px solid green',
                }}>


                <Typography
                    variant="h4"
                    sx={{
                        fontSize: {
                            sm: "2.5em",
                            md: "2.5em",
                            lg: "3.2em",
                        },
                        fontFamily: "Russo One, sans-serif",
                        color: "black",
                        marginBottom: "0.3em",
                    }}
                >
                    {employeeId ? "Employee Dashboard" : "My Account"}
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        fontSize: {
                            xs: '1em',
                            sm: '1.2em',
                            md: '1.4em',
                            lg: '1.8em',
                        },
                        fontFamily: 'Russo One, sans-serif',
                        color: 'darkorange',
                        marginBottom: '1em',
                        verticalAlign: 'middle',

                    }}>

                    <VerifiedOutlinedIcon
                        sx={{
                            fontSize: {
                                xs: '1.5em',
                                sm: '1.5em',
                                md: '1.5em',
                                lg: '1.5em',
                            },
                            marginRight: '0.5em',
                            verticalAlign: 'middle',
                            marginBottom: '-0.01em',
                            marginTop: '-0.1em',
                            color: '#darkorange'
                        }}
                    />
                    {employeeId ? "Software Developer" : "23-24 VIP season pass holder"}
                </Typography>
            </Box>

            {/* Reservation/rental section specific to guests */}
            {!employeeId && (
                <>
                    {/* Reservation section */}
                    <Typography
                        variant="h4"
                        sx={{
                            marginTop: '3rem',
                            marginBottom: '1rem',
                            fontFamily: 'Russo One, sans-serif'
                        }}
                    >
                        Reservations
                    </Typography>
                    <Reservations guest_id={guestId} />

                    {/* Rentals section */}
                    <Typography
                        variant="h4"
                        sx={{
                            marginTop: '5rem',
                            marginBottom: '1rem',
                            fontFamily: 'Russo One, sans-serif'
                        }}
                    >
                        Rentals
                    </Typography>
                </>
            )}

            {/* EMPLOYEE ONLY Employee lookup */}
            {employeeId && (
                <>

                    <EmployeeLookup />
                </>
            )}


        </div>
    );
}




export default Dashboard;

