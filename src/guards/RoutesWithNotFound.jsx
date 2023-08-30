import { Route, Routes } from 'react-router-dom';

export default function RoutesWithNotFound({ children }) {
  return (
    <Routes>
      {children}
      <Route path="*" element={<div>Not Found</div>} />
      {/*Habria que hacer un componente a renderizar cuando no existe la ruta*/}
    </Routes>
  );
}
