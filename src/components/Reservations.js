import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableRow, Typography } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableBody } from '@mui/material';
import { Table } from '@mui/material';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';


const Reservations = ({ guest_id }) => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/reservations/${guest_id}`);
                setReservations(res.data.reservations);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reservations:', error);
                setLoading(false);
            }
        };

        if (guest_id) {
            fetchReservations();
        }
    }, [guest_id]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (reservations.length === 0) {
        return (
            <Typography
                sx={{
                    fontFamily: 'Bitter, serif',
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                }}
            >
                No reservations found.{' '}
                <Link
                    to="/explore"
                    style={{
                        fontFamily: 'Bitter, serif',
                        fontSize: '1.3rem',
                        fontWeight: 'bold',
                        color: 'darkorange',
                        textDecoration: 'none',
                    }}
                >
                    Place an order here.
                </Link>
            </Typography>
        );
    }

    return (
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
                            backgroundColor: 'darkorange',
                        }}
                    >
                        <TableRow>
                            <TableCell sx={{ fontFamily: 'Bitter, serif', color: 'white' }}>Reservation #</TableCell>
                            <TableCell sx={{ fontFamily: 'Bitter, serif', color: 'white' }}>Guest #</TableCell>
                            <TableCell sx={{ fontFamily: 'Bitter, serif', color: 'white' }}>Order Type</TableCell>
                            <TableCell sx={{ fontFamily: 'Bitter, serif', color: 'white' }}>Room #</TableCell>
                            <TableCell sx={{ fontFamily: 'Bitter, serif', color: 'white' }}>Check-in Date</TableCell>
                            <TableCell sx={{ fontFamily: 'Bitter, serif', color: 'white' }}>Check-out Date</TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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

export default Reservations;