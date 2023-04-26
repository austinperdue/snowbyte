import React from "react";
import { Box, Typography } from "@mui/material";
import dashboardHeader from "./images/ski.jpg";
import { useAuth } from "./hooks/useAuth";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
// import avatar
import Avatar from '@mui/material/Avatar';
import PersonIcon from "@mui/icons-material/Person";
import { Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import dashpic1 from "./images/dashpic-1.jpg";
import dashpic2 from "./images/dashpic-2.jpg";
import dashpic3 from "./images/dashpic-3.jpg";
import CloudIcon from '@mui/icons-material/Cloud';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { Link } from "react-router-dom";



function Dashboard() {

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

    const fetchUserInfo = () => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwt_decode(token);
                setFirstName(decoded.firstName);
                setLastName(decoded.lastName);
                setEmail(decoded.email);
                setGuestId(decoded.guest_id);
            } catch (error) {
                console.error("Error decoding JWT token:", error);
            }
        }
    };

    // fetch user information on component mount
    useEffect(() => {
        console.log("Component mounted");
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
                    component="img"
                    src={dashboardHeader}
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
                        Ski your way.
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
                    Welcome back,{" "}
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
                    We're happy to see you.
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
                                        Currently cloudy 4° F
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
                                    backgroundColor: 'rgba(28, 28, 30, 0.8)', width: '100%',
                                    borderBottom: '1px solid #333',
                                    borderRadius: '20px',
                                }}>
                                    <div style={{
                                        backgroundColor: 'black',
                                        width: '100%',
                                    }}></div>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        sx={{
                                            fontSize: {
                                                xs: '1.5em',
                                                sm: '1.3em',
                                                md: '1.4em',
                                                lg: '1.8em',
                                            },
                                            fontFamily: 'Russo One, sans-serif',
                                            color: 'white',
                                            // align text to center
                                            textAlign: 'center',
                                            marginBottom: '-0.1em',
                                        }}
                                    >
                                        <span style={{ color: '#13bf00' }}>60/62 </span>
                                        TRAILS OPEN
                                    </Typography>
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
                            <CardContent sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        height: '100%',
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        sx={{
                                            fontSize: {
                                                xs: '1.5em',
                                                sm: '1.3em',
                                                md: '1.4em',
                                                lg: '1.8em',
                                            },
                                            fontFamily: 'Russo One, sans-serif',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            textShadow: '3px 2px 2px black',
                                            paddingBottom: {
                                                xs: '10em',
                                                sm: '9em',
                                                md: '7em',
                                                lg: '8em',
                                            },
                                        }}
                                    >
                                        Fat Flame Steakhouse
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        // link to /dine
                                        component={Link}
                                        to="/dine"
                                        sx={{
                                            borderColor: 'white',
                                            color: 'black',
                                            backgroundColor: 'white',
                                            fontFamily: 'Russo One, sans-serif',

                                            '&:hover': {
                                                backgroundColor: 'darkorange',
                                                borderColor: 'white',
                                                color: 'white'
                                            }
                                        }}
                                    >
                                        Grab a byte

                                    </Button>
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
                    My Account
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
                        color: 'black',
                        marginBottom: '1em',
                        verticalAlign: 'middle',
                        background: 'linear-gradient(45deg, #36d1dc, #FFC271)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',

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
                                // #36d1dc → #5b86e5 gradient
                                color: '#3BC8DE'
                            }}
                        />
                        23-24 VIP season pass holder
                </Typography>
            </Box>





        </div>
    );
}




export default Dashboard;

