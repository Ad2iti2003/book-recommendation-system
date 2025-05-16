
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  return (
    <Box bgcolor={'darksalmon'}>
        
           
                <IconButton size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}>
                    <MenuIcon sx={{color:'white',}}/>
                </IconButton>
                <Typography>
                    <Button sx={{color:'black',fontWeight: 900, mx: 4,my:2, fontSize:'20px'}}>Home</Button>
                    <Button sx={{color:'black',fontWeight: 900, mx: 4,my:2, fontSize:'20px'}}>Recommedation</Button>
                    <Button sx={{color:'black',fontWeight: 900, mx: 4,my:2, fontSize:'20px'}}>Contact</Button>
                </Typography>
           
        

    </Box>
  )
}

export default Navbar