import { useRoutes, Link, useQueryParams } from 'raviger';
import App from '../App';
import AppContainer from '../AppContainer';
import About from '../Components/About';
import { Form } from '../Components/Form';
import { Home } from '../Components/Home';
import Preview from '../Components/Preview';
const routes = {
  '/': () => <Home />,
  '/about': () => <About />,
  '/forms/:id': ({ id }: { id: string }) => <Form formID={Number(id)} />,
  '/preview/:formId': ({ formId }: { formId: string }) => (
    <Preview formID={Number(formId)} />
  ),
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
