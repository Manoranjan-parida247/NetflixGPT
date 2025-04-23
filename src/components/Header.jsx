import { Box, Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { removeUser, addUser } from '../utils/userSlice';

const Header = () => {
  const user = useSelector((store)=> store.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(removeUser());
      
    }).catch((error) => {
      console.error("Sign-out error:", error);
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {

            const { uid, email, displayName } = user;
            dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
            navigate('/browse')
            // ...
        } else {
            // User is signed out
            // ...
            dispatch(removeUser());
            navigate('/')
        }
    });
}, [])

  return (
    <Box sx={{ position: 'absolute', background: 'linear-gradient(to bottom, transparent, black)',width:"100%", display:"flex",justifyContent:"space-between", alignItems:"center" }}>
      <img
        src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7f67-86aa-d06aa27c6cc0/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
        alt='logo'
        style={{ width: '250px' }}
      />
      {user && (<Button variant="contained" color="error" sx={{mr:4}} onClick={handleSignout}>
        SignOut
      </Button>)}
    </Box>
  )
}

export default Header
