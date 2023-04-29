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
    Grid,
} from '@mui/material';

// using YUP as a schema validator for form fields (react-hook-form)
const signInSchema = yup.object().shape({
    employee_id: yup
        .string()
        .matches(/^E[0-9]{8}$/, 'Username must start with "E" followed by 8 numbers')
        .required('Employee username is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

function EmployeesForm({ onSubmit, errorMessage }) {
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
                    Employee Sign In
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
                    snowbyte Portal
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
                        label="Employee ID"
                        {...register('employee_id')}

                        error={!!errors.employee_id || !!errorMessage}
                        helperText={errors.employee_id?.message}
                        InputLabelProps={{
                            style: errorMessage ? { color: 'red' } : {},
                        }}
                        InputProps={{
                            style: errorMessage ? { borderColor: 'red' } : {},
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        {...register('password')}

                        error={!!errors.password || !!errorMessage}
                        helperText={errors.password?.message}
                        InputLabelProps={{
                            style: errorMessage ? { color: 'red' } : {},
                        }}
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
                                bgcolor: '#005b96',
                                '&:hover': {
                                    bgcolor: '#6497b1',
                                },
                            }}
                        >
                            Log In
                        </Button>
                    </Grid>
                    <Grid container justifyContent="center" sx={{ mt: 5 }}>
                        <Grid item>

                            <Typography
                                variant="body2"
                                color="primary"
                                fontFamily={'Bitter, serif'}
                                onClick={() => { alert('No.') }}
                                // make clickable
                                style={{
                                    textDecoration: 'none',
                                    fontFamily: 'Bitter, serif',
                                }}
                                component={Link}
                                to="#"

                            >
                                Request Admin Access
                            </Typography>

                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}

export default EmployeesForm;