import './styles.css';
import Typography from '../common/Typography';
import Button from '../common/Button';
import Brand from '../common/Brand';
import { useRoute } from '../../utils/hooks';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../utils/routes';
import SettingsIcon from '@mui/icons-material/Settings';
import EventIcon from '@mui/icons-material/Event';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {removeToken} from "../../api/token";
import {useEffect, useState} from "react";
import { getMe } from '../../api/api';


export default function SideBar() {
  const currentRoute = useRoute();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false)
  const [name, setName] = useState("Account")

  const routes = [
    {
      label: 'Events',
      path: Routes.Home,
      icon: <EventIcon />
    },
    {
      label: 'Profile',
      path: Routes.Profile,
      icon: <PersonOutlineIcon />
    },
    {
      label: 'Settings',
      path: Routes.Settings,
      icon: <SettingsIcon />
    },

  ];

  const handleLogOut = () => {
    removeToken();
    localStorage.removeItem('user');
    window.location.assign('/login')
  }

  const handleOpenModal = () => {
    setOpen(!open);
  }

  useEffect(() => {
    getMe().then(data => {
      setName(data.name || data.email)
    })
  }, [])


  // setInterval(() => {
  //   getMe().then(data => {
  //     setName(data.name || data.email)
  //   })
  // }, 2000);

  return (
    <div className={'container'}>
      <header className='sidebar-header'>
        <Brand className={'brand'} onClick={() => navigate('/')} />
        <div className={'buttons'}>
          {routes.map((route) => (
            <Button
              key={route.path}
              text={route.label}
              startIcon={route.icon}
              size="lg"
              variant={
                Routes[currentRoute] === route.path ? 'fullfilled' : 'outlined'
              }
              onClick={() => navigate(route.path)}
            />
          ))}
        </div>
      </header>
      <div className="logout-container">
        {open && <div className='logout-modal'>
          <Button onClick={handleLogOut} size={'sm'} variant={'outlined-error'} text={'Log out'}/>
        </div>}
        <div onClick={handleOpenModal} className={'account-menu'}>
          <div className={'profile-picture'} />
          <Typography variant={'body1bold'}>{name}</Typography>
        </div>
      </div>
    </div>
  );
}
