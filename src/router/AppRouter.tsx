import { useRoutes, Link, useQueryParams } from 'raviger';
import App from '../App';
import AppContainer from '../AppContainer';
import About from '../Components/About';
import { Form } from '../Components/Form';
import { Home } from '../Components/Home';
const routes = {
  '/': () => <Home />,
  '/about': () => <About />,
  '/forms/:id': ({ id }: { id: string }) => <Form formID={Number(id)} />,
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
