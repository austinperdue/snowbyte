import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DatePicker from '@mui/lab/DatePicker';

// using YUP as a schema validator for form fields (react-hook-form)
const signUpSchema = yup.object().shape({
    firstName: yup
        .string()
        .required('First name is required'),
    lastName: yup
        .string()
        .required('Last name is required'),
    email: yup
        .string()
        .email('Invalid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

function SignUpForm({ onSubmit }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema),
    });

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setValue('dateOfBirth', date);
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    mt: 8,
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
                <Typography
                    component="h1"
                    variant="h5"
                    fontFamily={'Russo One, sans-serif'}
                    align={'left'}
                >
                    Sign Up
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
                    Create your Snowbyte account
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="First Name"
                                {...register('firstName')}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Last Name"
                                {...register('lastName')}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Email address"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Grid item align="center">
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
                            }}
                        >
                            Sign Up
                        </Button>
                    </Grid>

                    <Grid container justifyContent="center" sx={{ mt: 5 }}>
                        <Grid item>
                            <Link to="/signin" style={{ textDecoration: 'none' }}>
                                <Typography
                                    variant="body2"
                                    color="primary"
                                    fontFamily={'Bitter, serif'}
                                >
                                    Already have an account? Sign in
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>

                </form>
            </Box>
        </Container>
    );
}

export default SignUpForm;
