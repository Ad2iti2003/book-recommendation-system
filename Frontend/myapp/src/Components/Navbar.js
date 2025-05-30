import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { Home } from '@mui/icons-material';
import { BookOnline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ContactPageOutlined } from '@mui/icons-material';

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = () => (
  <Box sx={{ width: 270, mt: 6}} role="presentation" onClick={toggleDrawer(false)}>
  <List>
    {[
      { label: 'Home', to: '/' },
      { label: 'Recommendation', to: '/reco' },
      { label: 'Contact', to: '/con' },
    ].map((item, index) => {
      let IconComponent;
      if (index === 0) IconComponent = <Home />;
      else if (index === 1) IconComponent = <BookOnline />;
      else IconComponent = <ContactPageOutlined />;

      return (
        <ListItem key={item.label} disablePadding>
          <ListItemButton component={Link} to={item.to}>
            <ListItemIcon>{IconComponent}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      );
    })}
  </List>
</Box>

);
  return (
    <AppBar position="sticky" elevation={3} sx={{ backgroundColor: '#1e1e2f', px: 3 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #00c6ff, #0072ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          📘 Books
        </Typography>

        {isMobile ? (
          <>
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList()}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 3 }}>
            {[
              { label: 'Home', to: '/' },
              { label: 'Recommendation', to: '/reco' },
              { label: 'Contact', to: '/con' },
            ].map(({ label, to }) => (
              <Link key={label} to={to} style={{ textDecoration: 'none' }}>
                <Button
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '15px',
                    borderRadius: '30px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#0072ff',
                      color: '#fff',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  {label}
                </Button>
              </Link>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

