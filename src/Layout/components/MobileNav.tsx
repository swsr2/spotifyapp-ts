// src/layout/components/BottomNav.tsx
import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Link } from "@mui/icons-material";

const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "block", sm: "none" },
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={location.pathname}
        onChange={(_, newValue) => navigate(newValue)}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 1300,
          backgroundColor: "#121212",
          borderTop: "1px solid #2a2a2a",
          boxShadow: "0 -1px 3px rgba(0, 0, 0, 0.2)",
        }}
      >
        <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Search"
          value="/search"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          label="Playlist"
          icon={<BookmarkIcon />}
          value="/playlist"
        />
      </BottomNavigation>
    </Paper>
  );
};

export default MobileNav;
