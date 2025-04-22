import { Box } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <Box sx={{ position: 'absolute', background: 'linear-gradient(to bottom, transparent, black)' }}>
      <img
        src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7f67-86aa-d06aa27c6cc0/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
        alt='logo'
        style={{ width: '320px' }}
      />
    </Box>
  )
}

export default Header
