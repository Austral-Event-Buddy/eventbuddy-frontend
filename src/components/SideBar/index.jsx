import './styles.css';
import Typography from '../common/Typography';
import Button from '../common/Button';
import Brand from '../common/Brand';
import { useRoute } from '../../utils/hooks';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../utils/routes';

export default function SideBar() {
  const currentRoute = useRoute();
  const navigate = useNavigate();

  const routes = [
    {
      label: 'Events',
      path: Routes.Home,
    },
    {
      label: 'Settings',
      path: Routes.Settings,
    },
  ];

  return (
    <div className={'container'}>
      <Brand className={'brand'} />
      <div className={'buttons'}>
        {routes.map((route) => (
          <Button
            key={route.path}
            text={route.label}
            size="lg"
            variant={
              Routes[currentRoute] === route.path ? 'fullfilled' : 'outlined'
            }
            onClick={() => navigate(route.path)}
          />
        ))}
      </div>
      <div className={'account-menu'}>
        <div className={'profile-picture'} />
        <Typography variant={'body1bold'}>Jane Doe</Typography>
      </div>
    </div>
  );
}
