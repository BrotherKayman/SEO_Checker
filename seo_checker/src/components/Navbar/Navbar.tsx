import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  // Style for hover effect
  const hoverStyle = {
    '&:hover': {
      color: 'rgb(244, 253, 252)',
      backgroundColor: 'rgb(4, 63, 87)',
    },
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          {/* Desktop Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center', gap: 2 }}>
            {['Home', 'Tools', 'Products', 'Blog'].map((text) => (
              <Button
                key={text}
                component={Link}
                to={`/${text.toLowerCase()}`}
                color="inherit"
                sx={hoverStyle}
              >
                {text}
              </Button>
            ))}
            
            <Button
              component={Link}
              to="/signin"
              color="inherit"
              sx={hoverStyle}
            >
              Admin
            </Button>
            <Button
              component={Link}
              to="/sign-up"
              variant="outlined"
              color="inherit"
              sx={hoverStyle}
            >
              Sign Up
            </Button>
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'flex', md: 'none' }, fontSize: 30 }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon sx={{ fontSize: 'inherit' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          <List>
            {['Home', 'Tools', 'Products', 'Blog', 'Sign Up'].map((text) => (
              <ListItem
                button
                key={text}
                component={Link}
                to={`/${text.toLowerCase().replace(' ', '-')}`}
                sx={{
                  ...hoverStyle,
                  '& .MuiListItemText-primary': {
                    color: 'inherit',
                  },
                }}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
            
            <ListItem
              button
              component={Link}
              to="/signin"
              sx={{
                ...hoverStyle,
                '& .MuiListItemText-primary': {
                  color: 'inherit',
                },
              }}
            >
              <ListItemText primary="Admin" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
