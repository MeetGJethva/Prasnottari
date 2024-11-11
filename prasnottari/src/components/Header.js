// Navbar.js
import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Link,
} from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CustomButton from "../components/Button";

// Custom styles
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#ffffff",
  boxShadow: "none",
  borderBottom: "1px solid #344e41",
}));

const BrandTypography = styled(Typography)(({ theme }) => ({
  color: "#344e41",
  fontSize: "2rem",
  fontWeight: "bold",
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: "#344e41",
  fontSize: "1.3rem",
  textDecoration: "none",
  margin: "0 1rem",
  "&:hover": {
    color: "#588157",
  },
}));

const SearchButton = styled("button")(({ theme }) => ({
  border: "1px solid #588157",
  color: "#588157",
  backgroundColor: "transparent",
  padding: "0.5rem 1rem",
  borderRadius: "1rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#3a5a40",
    borderColor: "#3a5a40",
  },
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    // navigate("/login");
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <BrandTypography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Prasnottari
        </BrandTypography>

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuItem onClick={handleMenuClose}>
            <NavLink href="/">Home</NavLink>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <NavLink href="/question">Questions</NavLink>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <NavLink href="/questionpaper">Papers</NavLink>
          </MenuItem>
          {isLoggedIn && (
            <MenuItem onClick={handleMenuClose}>
              <NavLink href="/bookamark">Bookmarked</NavLink>
            </MenuItem>
          )}
          {isLoggedIn ? (
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          ) : (
            <MenuItem onClick={handleLogin}>Login</MenuItem>
          )}
        </Menu>

        <div
          style={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NavLink href="/">Home</NavLink>
          <NavLink href="/question">Questions</NavLink>
          <NavLink href="/questionpaper">Papers</NavLink>
          {isLoggedIn ? (
            <>
              <NavLink href="/bookamark">Bookmarked</NavLink>
              <NavLink href="#" onClick={handleLogout}>
                Logout
              </NavLink>
            </>
          ) : (
            <NavLink href="#" onClick={handleLogin}>
              Login
            </NavLink>
          )}
        </div>

        {/* <TextField
          variant="outlined"
          placeholder="Search"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            style: {
              borderColor: "#588157",
              color: "#588157",
              borderRadius: 10,
            },
          }}
          sx={{ marginRight: 2 }}
        /> */}

        {/* <CustomButton>Search</CustomButton> */}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
