import { Outlet } from 'react-router';
import './theme/toxicBureaucracy.css';

/**
 * App — root component injetado pelo Wasp via `client.rootComponent`.
 * `Outlet` é onde o Wasp monta a página atual.
 */
export default function App() {
  return <Outlet />;
}
