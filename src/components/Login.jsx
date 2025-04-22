import React, { useState } from 'react'
import Header from './Header'
import { Box, Button, Typography } from '@mui/material'


const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        return setIsSignInForm(!isSignInForm);
    }
    return (
        <Box sx={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <Header />

            {/* background image of netflix */}
            <Box
                component="img"
                src="https://assets.nflxext.com/ffe/siteui/vlv3/69bec183-9cc8-49d4-8fc2-08228d3c91b4/web/DE-en-20250414-TRIFECTA-perspective_92261833-e69a-4a1a-bffd-453270cdbe8f_small.jpg"
                alt="background"
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: -1,
                }}
            />
            <Box

            />

            {/* Form in center */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.70)',
                    padding: 4,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    zIndex: 1,
                }}
            >
                <form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "64px",
                        height: isSignInForm ? "500px" : "600px", // ✅ Correct way
                        width: "400px"
                    }}
                >
                    <Typography variant='h3' color='white'>
                        {isSignInForm ? "Sign in" : "Sign up"}
                    </Typography>

                    {!isSignInForm && (
                        <input type="text" placeholder="Enter your name..." style={inputStyle} />
                    )}

                    <input type="email" placeholder="Email address" style={inputStyle} />
                    <input type="password" placeholder="Password" style={inputStyle} />

                    <Button type='submit' style={inputStyleSignin}>{isSignInForm ? "Sign In" : "Sign up"}</Button>

                    <Box
                        component="p"
                        sx={{ color: 'blue', cursor: "pointer" }}
                        onClick={toggleSignInForm}
                    >
                        {isSignInForm ? "New to Netflix? Sign up now." : "Already a registered user.."}
                    </Box>
                </form>

            </Box>
        </Box>
    )
}

// Simple input styling
const inputStyle = {
    padding: '12px',
    width: '300px',
    borderRadius: '4px',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
}

const inputStyleSignin = {
    padding: '8px',
    width: '300px',
    borderRadius: '8px',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    backgroundColor: "red",
    color: "white"
}
export default Login
