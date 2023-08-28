import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import RoutesWithNotFound from './guards/RoutesWithNotFound';
import { Routes } from './utils/routes';
import AuthGuard from './guards/AuthGuard';

import Login from './pages/login/login';
import Register from './pages/register/register';

function App() {
  return (
    <Router>
      <RoutesWithNotFound>
        {/*Las rutas publicas van aca*/
        /*Hay que agregar la ruta a routes.js */
        /*Usage: <Route exact path={PUBLIC_ROUTES.(ruta)} element={<Componente a Renderizar/>} /> */}
        <Route exact path={Routes.Login} element={<Login />} />
        <Route exact path={Routes.Register} element={<Register />} />
        <Route element={<AuthGuard />}>
          {/*A partir de aca van las rutas privadas */}
          <Route exact path={Routes.Home} element={<div>Home</div>} />
        </Route>
      </RoutesWithNotFound>
    </Router>
  );
}

export default App;
