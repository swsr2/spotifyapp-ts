import { Box } from '@mui/material'
import React from 'react'
import LoginButton from '../../common/components/LoginButton'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'
const DEFAULT_PROFILE_IMAGE = "/profile.png"; 

const Navbar = () => {
  const { data : userProfile } = useGetCurrentUserProfile()

  const profileImageUrl = userProfile?.images?.[0]?.url || DEFAULT_PROFILE_IMAGE;

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
      {userProfile ? (
        <img
          src={profileImageUrl}
          alt="profile"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default Navbar;