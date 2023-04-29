import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableRow, Typography, TextField, Button } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableBody } from '@mui/material';
import { Table } from '@mui/material';
import { Paper } from '@mui/material';
import * as yup from 'yup';

// Employee lookup guest schema for form validation
const searchGuestIdSchema = yup.object().shape({
    guestId: yup
        .string()
        .matches(/^G\d{8}$/, "Guest ID must start with 'G' followed by 8 digits")
        .required('Guest ID is required'),
});


const EmployeeLookup = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchGuestId, setSearchGuestId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const fetchReservations = async (guest_id) => {
        try {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/reservations/${guest_id}`);
            setReservations(res.data.reservations);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching reservations:', error);
            setLoading(false);
        }
    };

    const handleSearchClick = () => {
        searchGuestIdSchema.validate({ guestId: searchGuestId })
            .then(() => {
                setErrorMessage('');  // clear previous error message
                fetchReservations(searchGuestId);
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };
    const handleInputChange = (event) => {
        setSearchGuestId(event.target.value);
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }




    return (
        <div>
            <Typography
                variant="h4"
                sx={{
                    fontFamily: 'Russo One, sans-serif',
                    color: 'black',
                    paddingTop: '1em',
                    paddingBottom: '1em',
                }}
            >
                Guest Reservation Lookup
            </Typography>

            <Typography 
            color="error"
            sx={{
                fontFamily: 'Bitter, serif',
                marginBottom: '1em',
            }}

            >
                {errorMessage}
                </Typography>

            <TextField
                label="Guest ID"
                value={searchGuestId}
                onChange={handleInputChange}
                sx={{
                    marginBottom: '3em',

                }
                }
                error={ !!errorMessage}
                InputLabelProps={{
                    style: errorMessage ? { color: 'red' } : {},
                }}
                InputProps={{
                    style: errorMessage ? { borderColor: 'red' } : {},
                }}
            />
            <Button
                onClick={handleSearchClick}
                variant="contained"
                sx={{
                    marginTop: '0.2em',
                    marginLeft: '2em',
                    marginBottom: '3em',
                    backgroundColor: '#005B96',
                    color: 'white',
                    fontFamily: 'Russo One, sans-serif',
                    fontSize: '1.2em',



                    '&:hover': {
                        backgroundColor: 'white',
                        color: '#005B96',
                    },
                }}

            >
                Search
            </Button>

            <div>
                <TableContainer
                    component={Paper}
                    sx={{
                        boxShadow: '0 0 10px 0 rgba(0,0,0,0.3)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                    }}
                >
                    <Table>
                        <TableHead
                            sx={{
                                backgroundColor: '#005B96',
                            }}
                        >
                            <TableRow>
                                <TableCell sx={{ fontFamily: 'Bitter, serif', color: 'white' }}>Reservation #</TableCell>
                                <TableCell sx={{ fontFamily: 'Bitter, serif', color: 'white' }}>Guest #</TableCell>
                                <TableCell sx={{ fontFamily: 'Bitter, serif', color: 'white' }}>Order Type</TableCell>
                                <TableCell sx={{ fontFamily: 'Bitter, serif', color: 'white' }}>Room #</TableCell>
                                <TableCell sx={{ fontFamily: 'Bitter, serif', color: 'white' }}>Check-in Date</TableCell>
                                <TableCell sx={{ fontFamily: 'Bitter, serif', color: 'white' }}>Check-out Date</TableCell>
                                <TableCell sx={{ fontFamily: 'Bitter, serif', color: 'white' }}>First Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reservations.map((reservation) => (
                                <TableRow key={reservation.reservation_id}>
                                    <TableCell><span style={{ fontFamily: 'Bitter, serif' }}>{reservation.reservation_id}</span></TableCell>
                                    <TableCell><span style={{ fontFamily: 'Bitter, serif' }}>{reservation.guest_id}</span></TableCell>
                                    <TableCell><span style={{ fontFamily: 'Bitter, serif' }}>{reservation.employee_id}</span></TableCell>
                                    <TableCell><span style={{ fontFamily: 'Bitter, serif' }}>{reservation.room_id}</span></TableCell>
                                    <TableCell><span style={{ fontFamily: 'Bitter, serif' }}>{formatDate(reservation.checkin_date)}</span></TableCell>
                                    <TableCell><span style={{ fontFamily: 'Bitter, serif' }}>{formatDate(reservation.checkout_date)}</span></TableCell>
                                    <TableCell><span style={{ fontFamily: 'Bitter, serif' }}>{reservation.first_name}</span></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    );
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed in JS
    const day = ("0" + date.getDate()).slice(-2);
    return `${month}/${day}/${year}`;
  };

export default EmployeeLookup;
