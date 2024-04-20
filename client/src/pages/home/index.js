import { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { home } from "../../constants/home";
import './home.css';
import { currentDate, currentTime } from "../../utils/helper";

export default function Home({ toggleTheme }) {
  const { title, button } = home;
  const [time, setTime] = useState(currentTime());
  const [monthDayYear, setMonthDayYear] = useState(currentDate());
  const theme = useTheme();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(currentTime());
      setMonthDayYear(currentDate());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box className='home-container' bgcolor={theme.palette.background.default} >
      <Button className="home-theme-button" onClick={toggleTheme}>
        {theme.palette.mode === 'dark' ? (
          <>
            <Brightness7Icon fontSize='large' />
            <Typography className='home-light-txt'>Light</Typography>
          </>
        ) : (
          <>
            <Brightness4Icon fontSize="large" />
            <Typography className='home-dark-txt'>Dark</Typography>
          </>
        )}
      </Button>
      <Typography className='home-title' color={theme.palette.text.primary}>
        {title}
      </Typography>
      <Box className='home-dateTime-container'>
        <Typography className='home-date' color={theme.palette.text.primary}>
          {monthDayYear}
        </Typography>
        <Typography className='home-time' color={theme.palette.text.primary}>
          {time}
        </Typography>
      </Box>
      <Button className='home-button' variant="contained" href="/todo">
        {button}
      </Button>
    </Box>
  )
}
