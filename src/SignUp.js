import React from 'react';
import SignUpForm from './components/SignUpForm';

function SignUp() {
    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission here
    };

    return (
        <div style={{ display: 'flex', minHeight: '75vh', flexDirection: 'column' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <SignUpForm onSubmit={onSubmit} />
            </div>
        </div>
    );
}

export default SignUp;