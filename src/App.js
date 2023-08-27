import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from "./pages/login/login";
import RoutesWithNotFound from './route_wrappers/RoutesWithNotFound';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './utils/routes';
import AuthGuard from './guards/AuthGuard';

function App() {
  return (
    <Router>
      <RoutesWithNotFound>
        {
          /*Las rutas publicas van aca*/
          /*Hay que agregar la ruta a routes.js */
          /*Usage: <Route exact path={PUBLIC_ROUTES.(ruta)} element={<Componente a Renderizar/>} /> */
        }
        <Route exact path={PUBLIC_ROUTES.LOGIN} element={<div>Login</div>} />
        <Route exact path={PUBLIC_ROUTES.REGISTER} element={<div>Register</div>} />
        <Route element={<AuthGuard />}>
          {/*A partir de aca van las rutas privadas */}
          <Route exact path={PRIVATE_ROUTES.HOME} element={<div>Home</div>} />
        </Route>
      </RoutesWithNotFound>
    </Router>
  );
}

export default App;
