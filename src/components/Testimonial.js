import React from "react";
import { Container, Grid, Typography, Card, CardContent, Avatar, Rating, Box } from "@mui/material";
import FormatQuoteOutlinedIcon from '@mui/icons-material/FormatQuoteOutlined';
import avatar1 from "../images/avatar1.jpg";
import avatar2 from "../images/avatar2.jpg";
import avatar3 from "../images/avatar3.jpg";

export default function Testimonial() {

    // const for user names
    const names = ["Shaun W.", "Ethan H.", "Emma S."];

    // const for user ratings
    const ratings = [4, 5, 3.5];

    // const for user comments
    const comments = [
        " Dude, this place is like nectar for my soul. The slopes are sick and the views are just... whoa man. Can't wait to come back next season.",
        " As a businessman, I appreciate the ease and convenience of staying at this resort with my family. The staff is professional and courteous, and the amenities are top-notch. Highly recommend.",
        " I brought my family here for a relaxing vacation and we were not disappointed. The resort had everything we needed and more, and the staff went above and beyond to make our stay comfortable. Will definitely be coming back."
    ];

    // const for avatar pics
    const avatars = [
        avatar1,
        avatar2,
        avatar3
    ];

    return (
        <Container
            maxWidth="xl"
            sx={{
                color: "#000",
                paddingTop: { xs: "6rem", sm: "10rem" },
                paddingBottom: { xs: "6rem", sm: "12rem" },
            }}
        >
            <Grid container justifyContent="center">
                <Grid
                    item xs={12} md={10} xl={8}
                    align="center"
                    sx={{
                        marginBottom: { xs: "2rem", sm: "5rem" },
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h3"
                        className="fw-bold mb-4"
                        sx={{
                            fontFamily: 'Russo One, sans-serif',
                            color: 'black',
                        }}
                    >
                        You are our{" "}
                        <Typography
                            variant="h3"
                            component="span"
                            className="fw-bold"
                            sx={{
                                fontFamily: 'Russo One, sans-serif',
                                background: 'linear-gradient(90deg, #FF8C00 10%, orange 80%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            priority

                        </Typography>
                        
                        
                        
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3} justifyContent="center">
                {[1, 2, 3].map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
                                border: '4px solid white',
                                '&:hover': {
                                    transform: 'scale(1.07)',
                                    boxShadow: '0 9px 15px 0 rgba(0, 0, 0, 0.16)',
                                    border: '4px solid darkorange',
                                    borderRadius: '10px',
                                },
                                transition: 'all 0.3s ease-in-out',
                            }}
                        >
                            <CardContent
                                className="py-4 mt-2"
                                sx={{
                                    textAlign: 'center',
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    overflow: "hidden",
                                    alignItems: 'center',
                                }}
                            >
                                <Box
                                    component={Avatar}
                                    src={`${avatars[item - 1]}`}
                                    alt="User Name"
                                    sx={{
                                        width: 56,
                                        height: 56,
                                        margin: 'auto',
                                        marginBottom: 2,
                                        transform: 'scale(1.5)',
                                        marginTop: '1rem',
                                    }}
                                />
                                <Typography
                                    variant="h5"
                                    component="h5"
                                    className="font-weight-bold"
                                    sx={{
                                        fontFamily: 'Russo One, sans-serif',
                                        color: 'black',
                                        textAlign: 'center',
                                        paddingTop: '1em',
                                    }}
                                >
                                    {names[item - 1]}
                                </Typography>
                                <Rating
                                    name="rating"
                                    value={ratings[item - 1]}
                                    precision={0.5}
                                    readOnly size="small"
                                    className="mb-2"
                                    sx={{
                                        color: 'darkorange',
                                        paddingBottom: '1em',
                                        paddingTop: '1em',
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    component="p"
                                    className="mb-2"
                                    sx={{
                                        fontFamily: 'Bitter, serif',
                                        color: 'black',
                                        textAlign: 'center',
                                    }}
                                >
                                    <FormatQuoteOutlinedIcon fontSize="small" className="pe-2" />
                                    {comments[item - 1]}
                                    <FormatQuoteOutlinedIcon fontSize="small" className="pe-2" />
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
} 