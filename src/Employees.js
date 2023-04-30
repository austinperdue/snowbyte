import React, {useState} from 'react';
import EmployeesForm from './components/EmployeesForm';
import { useNavigate } from 'react-router-dom';

function Employees( {onAuthentication} ) {
    
    // user state for error message when login fails
    const [errorMessage, setErrorMessage] = useState(null);

    // navigate
    const navigate = useNavigate();
    
    
    const onSubmit = async (data) => {
        try {
            // Handle form submission here
            // call an API to authenticate the user:
            console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/employees`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });

            const result = await response.json();
            if (response.ok) {
                // Login successful, handle user login (e.g., set user data in context, navigate to the dashboard, etc.)
                console.log('Login successful:', result);

                // create token for user authentication
                localStorage.setItem('token', result.token);

                // set user authentication
                onAuthentication(true);

                // redirect to user employee dashboard
                navigate('/dashboard');

                
            } else {
                // Show an error message
                console.error('Login failed:', result.message);
                setErrorMessage('Invalid employee ID or password');
            }
        } catch (error) {
            // Show an error message
            console.error('Error during login:', error);
            setErrorMessage('An error occurred during login');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '75vh', flexDirection: 'column', paddingTop: '4em', paddingBottom: '4em' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <EmployeesForm onSubmit={onSubmit} errorMessage={errorMessage} />
            </div>
        </div>
    );
}

export default Employees;