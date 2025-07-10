import React from "react";
import { NavLink, Outlet } from "react-router";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";
import PlaylistHead from "./components/PlaylistHead";
import Playlist from "./components/Playlist";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px",
});
const Sidebar = styled("div")(({ theme }) => ({
  width: "331px",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  marginRight: "8px",
  overflow: "hidden",
  // 모바일ver
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
const ContentBox = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
  width: "100%",
  padding: "8px",
  marginBottom: "8px",
  marginRight: "8px",
}));
const OutletContentBox = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: "#121212",
  borderRadius: "8px",
  width: "100%",
  padding: "8px",
  marginBottom: "8px",
  marginRight: "8px",
  height: "100%",
  display: "flex",
  flexDirection: "column", //
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding: "0",
  margin: "0",
});
const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  padding: "10px",
  gap: "20px",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
  "&.active": {
    color: theme.palette.text.primary,
  },
}));
const PlaylistContainer = styled(ContentBox)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const PlaylistScrollArea = styled("div")({
  flexGrow: 1,
  overflowY: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <ContentBox>
          <NavList>
            <StyledNavLink to="/">
              <HomeIcon />
              <Typography variant="h2" fontWeight={700}>
                Home
              </Typography>
            </StyledNavLink>
            <StyledNavLink to="/search">
              <SearchIcon />
              <Typography variant="h2" fontWeight={700}>
                Search
              </Typography>
            </StyledNavLink>
          </NavList>
        </ContentBox>

        <PlaylistContainer>
          <Box sx={{ flexShrink: 0 }}>
            <PlaylistHead />
          </Box>
          <PlaylistScrollArea>
            <Playlist />
          </PlaylistScrollArea>
        </PlaylistContainer>
      </Sidebar>
      <OutletContentBox>
        <Navbar />
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            backgroundColor: "#121212",
            paddingBottom: "64px",
            height: "100%",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Outlet />
        </Box>
      </OutletContentBox>
      <MobileNav />
    </Layout>
  );
};

export default AppLayout;
