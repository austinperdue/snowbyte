import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderForm from './components/OrderForm';
import { useAuth } from './hooks/useAuth';
import jwt_decode from 'jwt-decode';


function Order() {

    // use auth() to verify users are logged in, if not redirect to signin
    useAuth();

    // user state for error message when order fails
    const [errorMessage, setErrorMessage] = useState(null);

    // navigate
    const navigate = useNavigate();

    // get guest_id from local session in jwt token
    const [guestId, setGuestId] = useState("");

    // state for order completed
    const [orderCompleted, setOrderCompleted] = useState(false);

    // state for reservationId
    const [reservationId, setReservationId] = useState("");


    // get guest_id from local session in jwt token
    const fetchGuestId = () => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwt_decode(token);
                setGuestId(decoded.guest_id);
            } catch (error) {
                console.error("Error decoding JWT token:", error);
            }
        }
    }

    useEffect(() => {
        fetchGuestId();
    }, []);


    const onSubmit = async (data) => {

        console.log('Order submitted:', data);
        console.log('guest_id:', guestId);
        // add guestid to data
        data.guestId = guestId;
        // add rentalDate and returnDate using same dates as checkindate and checkoutdate
        data.rentalDate = data.checkInDate;
        data.returnDate = data.checkOutDate;

        try {
            // Handle form submission here
            // if rentalType selection is 'No rentals' then do not call API
            if (data.rentalType === 'No rentals') {
                console.log('No rentals selected');
            }

            // call an API to authenticate the user:
            console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                // Order successful, handle order success (e.g., set user data in context, navigate to the dashboard, etc.)
                console.log('Order successful:', result);

                // redirect to order confirmation page
                //navigate('/dashboard'); // NEED TO CHANGE
                setOrderCompleted(true);

                // set reservationId
                setReservationId(result.reservationId);
            } else {
                // Show an error message
                console.error('Order failed:', result.message);
                setErrorMessage(result.message);
            }
        } catch (error) {
            // Show an error message
            console.error('Error during order:', error);
            setErrorMessage('An error occurred during order');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '75vh', flexDirection: 'column', paddingTop: '4em', paddingBottom: '4em' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* <OrderForm onSubmit={onSubmit} errorMessage={errorMessage} />*/}
                <OrderForm 
                onSubmit={onSubmit} 
                errorMessage={errorMessage} 
                orderCompleted={orderCompleted}
                reservationId={reservationId}

                />
            </div>
        </div>
    );
}

export default Order;