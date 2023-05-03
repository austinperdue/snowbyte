import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableRow, Typography, TableContainer, TableHead, TableCell, TableBody, Table, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Rentals = ({ guest_id }) => {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/rentals/${guest_id}`);
                setRentals(res.data.rentals);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching rentals:', error);
                setLoading(false);
            }
        };

        if (guest_id) {
            fetchRentals();
        }
    }, [guest_id]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (rentals.length === 0) {
        return (
            <Typography
                sx={{
                    fontFamily: 'Bitter, serif',
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                }}
            >
                No rentals found.{' '}
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
                    Rent something here.
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
                            <TableCell sx={{ fontFamily: 'Bitter, serif', color: 'white' }}>Rental #</TableCell>
                            <TableCell sx={{ fontFamily: 'Bitter, serif', color: 'white' }}>Guest #</TableCell>
                            <TableCell sx={{ fontFamily: 'Bitter, serif', color: 'white' }}>Rental Type</TableCell>
                            <TableCell sx={{ fontFamily: 'Bitter, serif', color: 'white' }}>Rental Date</TableCell>
                            <TableCell sx={{ fontFamily: 'Bitter, serif', color: 'white' }}>Return Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rentals.map((rental) => (
                            <TableRow key={rental.rental_id}>
                                <TableCell><span style={{ fontFamily: 'Bitter, serif' }}>{rental.rental_id}</span></TableCell>
                                <TableCell><span style={{ fontFamily: 'Bitter, serif' }}>{rental.guest_id}</span></TableCell>
                                <TableCell><span style={{ fontFamily: 'Bitter, serif' }}>{rental.rental_type}</span></TableCell>
                                <TableCell><span style={{ fontFamily: 'Bitter, serif' }}>{formatDate(rental.rental_date)}</span></TableCell>
                                <TableCell><span style={{ fontFamily: 'Bitter, serif' }}>{formatDate(rental.return_date)}</span></TableCell>
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

export default Rentals;