import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
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

function SignInForm({ onSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signInSchema),
    });

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
                    Sign In
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
                    Relax. Explore. Discover.
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Email address"
                        {...register('email')}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        {...register('password')}
                    />
                    <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label={
                            <Typography
                                variant="h2"
                                color={'text.secondary'}
                                sx={{
                                    fontFamily: 'Russo One, serif',
                                    fontSize: '0.80rem',
                                    color: 'black',
                                    mt: 0.5,
                                }}
                            >
                                Keep me signed in
                            </Typography>
                        }
                        sx={{ mt: 1 }}
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
                                Log In
                            </Button>
                        </Grid>
                    <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                        <Grid item>
                            <Link to="/forgot-password" 
                            style={{ 
                                textDecoration: 'none',
                                fontFamily: 'Bitter, serif',
                                }}>
                                Forgot password?
                            </Link>
                        </Grid>
                        
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

export default SignInForm;