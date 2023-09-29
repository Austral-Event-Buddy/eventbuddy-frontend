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


export default function SideBar() {
  const currentRoute = useRoute();
  const navigate = useNavigate();

  const routes = [
    {
      label: 'Events',
      path: Routes.Home,
        icon : <EventIcon/>
    },
      {
          label: 'Profile',
          path: Routes.Profile,
          icon: <PersonOutlineIcon/>
        },
    {
      label: 'Settings',
      path: Routes.Settings,
        icon : <SettingsIcon/>
    },

  ];

  return (
    <div className={'container'}>
      <header className='sidebar-header'>
      <Brand className={'brand'} />
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
      
      <div className={'account-menu'}>
        <div className={'profile-picture'}></div>
        <Typography variant={'body1bold'}>Jane Doe</Typography>
      </div>
    </div>
  );
}
