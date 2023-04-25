import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import ForgotPass from '../ForgotPass';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import * as yup from 'yup';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Grid,
} from '@mui/material';

// using YUP as a schema validator for form fields (react-hook-form)
const signInSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

function ForgotPassForm({ onSubmit, errorMessage }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signInSchema),
    });

    const [securityQuestions] = useState([
        'What was the name of your first pet?',
        'What was the name of the first school you attended?',
        'What is the name of your favorite book?',
        'What was your childhood nickname?',
        'What is your mother\'s maiden name?',
        'In what city were you born?',
        'What is your favorite color?',
        'What is the name of your favorite movie?',
        'What is your father\'s middle name?',
        'What was the make and model of your first car?',
    ])



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
                    Forgot your password?
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
                    Not a problem.
                </Typography>
                {/* Typography component to display the error message */}
                {errorMessage && (
                    <Typography
                        variant="body2"
                        color="error"
                        sx={{ mb: 2 }}
                    >
                        {errorMessage}
                    </Typography>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Email address"
                        {...register('email')}

                        error={!!errors.email}
                        helperText={errors.email?.message}
                        InputProps={{
                            style: errorMessage ? { borderColor: 'red' } : {},
                        }}
                    />


                    <TextField
                        select
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Security Question"
                        {...register('securityQuestion')}
                        defaultValue={securityQuestions[0]}
                        error={!!errors.securityQuestion || !!errorMessage}
                        helperText={errors.securityQuestion?.message}
                    >
                        {securityQuestions.map((question, index) => (
                            <MenuItem key={index} value={question}>
                                {question}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Security Answer"
                        {...register('securityAnswer')}
                        error={!!errors.securityAnswer || !!errorMessage}
                        helperText={errors.securityAnswer?.message}
                    />



                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="New password"
                        type="password"
                        {...register('password')}

                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            style: errorMessage ? { borderColor: 'red' } : {},
                        }}
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
                                bgcolor: 'darkorange',
                                '&:hover': {
                                    bgcolor: 'orange',
                                },
                            }}
                        >
                            RESET PASSWORD
                        </Button>
                    </Grid>
                    <Grid container justifyContent="center" sx={{ mt: 5 }}>
                        <Grid item>
                            <Link to="/signup" style={{ textDecoration: 'none' }}>
                                <Typography
                                    variant="body2"
                                    color="primary"
                                    fontFamily={'Bitter, serif'}
                                >
                                    New to Snowbyte? Join now
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}

export default ForgotPassForm;