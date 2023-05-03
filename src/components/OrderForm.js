import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Container, Box, Typography, TextField, Button, FormControlLabel, Checkbox, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import bannerImage from '../images/banner.jpg';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';


const orderSchema = yup.object().shape({
    checkInDate: yup.date()
        .required('Check in date is required')
        .min(new Date(), 'Check in date cannot be in the past'),
    checkOutDate: yup.date()
        .required('Check out date is required')
        .when('checkInDate', (checkInDate, schema) => {
            if (checkInDate) {
                return schema.min(checkInDate, 'Check out date must be after check in date');
            }
            return schema;
        }),
    roomType: yup.string().required('Room type is required')
        .oneOf(['single', 'double', 'deluxe', 'executive', 'snowbyte'], 'Invalid room type'),
    rentalType: yup.string()
        .oneOf(['No rentals', 'snowboard', 'ski', 'ice-skates'], 'Invalid rental type'),
});

function OrderForm({ onSubmit, errorMessage, orderCompleted, reservationId }) {
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm({
        resolver: yupResolver(orderSchema),
    });

    // handle resizes for confetti
    const { width, height } = useWindowSize();

    return (
        <>
        {orderCompleted && 
        <Confetti
            width={width}
            height={height}
            recycle={true}
            numberOfPieces={200}
            gravity={0.03}
        />}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Container maxWidth="sm">
                {orderCompleted ? (
                    <Box
                        sx={{
                            mt: '10rem',
                            mb: '4rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'left',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            padding: 4,
                            //border: '1px solid #e0e0e0',
                            boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2)',
                        }}
                    >
                        <Typography
                            component="h1"
                            fontFamily={'Russo One, sans-serif'}
                            align={'center'}
                            sx={{
                                mb: 2,
                                fontSize: '2rem',
                                color: 'black',
                                //border: '1px solid #e0e0e0',
                                width: '100%',
                            }}
                        >
                            ORDER PLACED
                        </Typography>
                        <Typography
                            component="h2"
                            fontFamily={'Russo One, sans-serif'}
                            align={'center'}
                            sx={{
                                mb: 2,
                                fontSize: '1.5rem',
                                color: 'black',
                                //border: '1px solid #e0e0e0',
                                width: '100%',
                            }}
                        >
                            Reservation #{reservationId}
                        </Typography>
                        <Typography
                            component="h1"
                            fontFamily={'Russo One, sans-serif'}
                            align={'center'}
                            sx={{
                                mb: 8,
                                mt: 4,
                                fontSize: '1rem',
                                color: 'black',
                                //border: '1px solid #e0e0e0',
                                width: '100%',
                            }}
                        >
                            Thank you for booking with snowbyte!<br></br>
                            You'll find your reservation details below.
                        </Typography>
                        <Typography
                            component="h2"
                            fontFamily={'Russo One, sans-serif'}
                            align={'left'}
                            sx={{
                                mb: 2,
                                fontSize: '1rem',
                                color: 'grey',
                                //border: '1px solid #e0e0e0',
                                width: '100%',
                            }}
                        >
                            Room type: {watch('roomType')}
                        </Typography>
                        <Typography
                            component="h3"
                            fontFamily={'Russo One, sans-serif'}
                            align={'left'}
                            sx={{
                                mb: 2,
                                fontSize: '1rem',
                                color: 'grey',
                                //border: '1px solid #e0e0e0',
                                width: '100%',
                            }}
                        >
                            Check in {' '}
                            {watch('checkInDate').toLocaleDateString()}
                            {' '} at 3:00 PM
                        </Typography>
                        <Typography
                            component="h3"
                            fontFamily={'Russo One, sans-serif'}
                            align={'left'}
                            sx={{
                                mb: 2,
                                fontSize: '1rem',
                                color: 'grey',
                                //border: '1px solid #e0e0e0',
                                width: '100%',
                            }}
                        >
                            Check out {' '}
                            {watch('checkOutDate').toLocaleDateString()}
                            {' '} at 11:00 AM
                        </Typography>
                        <Typography
                            component="h3"
                            fontFamily={'Russo One, sans-serif'}
                            align={'left'}
                            sx={{
                                mb: 2,
                                fontSize: '1rem',
                                color: 'grey',
                                //border: '1px solid #e0e0e0',
                                width: '100%',
                            }}
                        >
                            *An adult must be present at check in to sign the rental agreement.
                        </Typography>
                        <Button
                            variant="contained"
                            component={Link}
                            to="/dashboard"
                            sx={{
                                borderColor: 'white',
                                color: 'white',
                                fontFamily: 'Russo One, sans-serif',
                                backgroundColor: 'darkorange',
                                width: '100%',
                                mt: 4,
                                mb: 2,
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
                            <HomeIcon
                                sx={{
                                    color: 'white',
                                    // move all the way to the left
                                    position: 'absolute',
                                    left: 10,
                                }}
                            />
                            BACK TO DASHBOARD
                        </Button>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            mt: '10rem',
                            mb: '4rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'left',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            padding: 4,
                            border: '1px solid #e0e0e0',
                            boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2)',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: '150px',
                                borderRadius: '5px',
                                mb: 2,
                                backgroundImage: `url(${bannerImage})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                position: 'relative',
                                backgroundPosition: 'center top 0%',
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h5"
                                fontFamily={'Russo One, sans-serif'}
                                align={'center'}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    // make text transparent with white stroke
                                    WebkitTextStroke: '2px #000',
                                    color: 'transparent',
                                    fontSize: {
                                        xs: '2rem',
                                        sm: '3rem',
                                    },
                                    letterSpacing: '4px',



                                }}
                            >
                                RESERVATIONS
                            </Typography>
                        </Box>

                        <Typography
                            component="h1"
                            variant="h5"
                            fontFamily={'Russo One, sans-serif'}
                            align={'left'}
                        >
                            Book with snowbyte
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            align="left"
                            fontFamily={'Russo One, sans-serif'}
                            sx={{
                                mb: 2
                            }}
                        >
                            Please fill out the form below to book your reservation.
                        </Typography>

                        {errorMessage && (
                            <Typography
                                variant="body2"
                                color="error"
                                sx={{ mb: 2, padding: 1, border: '1px solid red', borderRadius: '5px' }}
                            >
                                {errorMessage}
                            </Typography>
                        )}


                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography
                                        fontFamily={'Bitter , serif'}
                                    >Check in date
                                    </Typography>
                                    <Controller
                                        name="checkInDate"
                                        control={control}
                                        defaultValue={new Date()} // or defaultValue={new Date()}
                                        error={!!errors.checkInDate}
                                        render={({ field }) => (
                                            <DatePicker
                                                fullWidth
                                                inputFormat="MM/dd/yyyy"
                                                TextField={(props) => <TextField {...props} />}
                                                {...field}
                                            />
                                        )}

                                    />
                                    {/* checkin error message */}
                                    {errors.checkInDate && (
                                        <Typography variant="caption" color="error">
                                            {errors.checkInDate.message}
                                        </Typography>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        sx={{
                                            fontFamily: 'Bitter , serif'
                                        }}
                                    >Check out date
                                    </Typography>
                                    <Controller
                                        name="checkOutDate"
                                        control={control}
                                        defaultValue={
                                            // new date() + 1 day
                                            (() => { const date = new Date(); date.setDate(date.getDate() + 1); return date; })()
                                        } // or defaultValue={new Date()}
                                        render={({ field }) => (
                                            <DatePicker
                                                fullWidth
                                                inputFormat="MM/dd/yyyy"
                                                TextField={(props) => <TextField {...props} />}
                                                {...field}
                                            />
                                        )}
                                    />
                                    {/* checkout error message */}
                                    {errors.checkOutDate && (
                                        <Typography variant="caption" color="error">
                                            {errors.checkOutDate.message}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                            <FormControl
                                fullWidth
                                sx={{ mt: 2 }}
                                error={!!errors.roomType}
                            >
                                <InputLabel>Room Type</InputLabel>
                                <Select
                                    defaultValue=""
                                    label="Room Type"
                                    {...register('roomType')}
                                >
                                    <MenuItem value="single">Single</MenuItem>
                                    <MenuItem value="double">Double</MenuItem>
                                    <MenuItem value="deluxe">Deluxe Room</MenuItem>
                                    <MenuItem value="executive">Executive Suite</MenuItem>
                                    <MenuItem value="snowbyte">Snowbyte Studio</MenuItem>
                                </Select>
                                {errors.roomType && (
                                    <Typography variant="caption" color="error">
                                        {errors.roomType.message}
                                    </Typography>
                                )}
                            </FormControl>

                            {/* rentals */}
                            <Typography
                                variant="h6"
                                fontFamily={'Russo One, sans-serif'}
                                sx={{ mt: 3 }}
                            >
                                Need rentals?
                            </Typography>

                            <FormControl
                                fullWidth sx={{ mt: 2 }}
                                error={!!errors.rentalType}
                            >
                                <InputLabel>Rental Type</InputLabel>
                                <Select
                                    defaultValue=""
                                    label="Rental Type"
                                    {...register('rentalType')}
                                >
                                    <MenuItem value="No rentals">No rentals</MenuItem>
                                    <MenuItem value="snowboard">Snowboard</MenuItem>
                                    <MenuItem value="ski">Ski</MenuItem>
                                    <MenuItem value="ice-skates">Ice Skates</MenuItem>
                                </Select>
                                {/* rental type error message */}
                                {errors.rentalType && (
                                    <Typography variant="caption" color="error">
                                        {errors.rentalType.message}
                                    </Typography>
                                )}
                            </FormControl>


                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{
                                    fontFamily: 'Russo One, sans-serif',
                                    fontSize: '1rem',
                                    mt: 2,
                                    mb: 0,
                                    width: '100%',
                                    bgcolor: 'darkorange',
                                    '&:hover': {
                                        bgcolor: 'orange',
                                    },
                                }}
                            >
                                SUBMIT ORDER
                            </Button>
                        </form>
                    </Box>
                )}
            </Container>
        </LocalizationProvider>
        </>
    );
}

export default OrderForm;