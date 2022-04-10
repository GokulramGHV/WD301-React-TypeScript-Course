import { useRoutes, Link, useQueryParams } from 'raviger';
import App from '../App';
import AppContainer from '../AppContainer';
import About from '../Components/About';
import { Form } from '../Components/Form';
import FormResponses from '../Components/FormResponses';
import { Home } from '../Components/Home';
import Login from '../Components/Login';
import Preview from '../Components/Preview';
import Register from '../Components/Register';
import ResponseView from '../Components/ResponseView';
import { User } from '../types/userTypes';
import { me } from '../utils/apiUtils';

let isAuthenticated = localStorage.getItem('token') ? true : false;

const routes = {
  '/': () => (isAuthenticated ? <Home /> : <Register />),
  '/login': () => <Login />,
  '/about': () => <About />,
  '/forms/:id': ({ id }: { id: string }) => <Form formID={Number(id)} />,
  '/forms/:id/submissions': ({ id }: { id: string }) => (
    <FormResponses formID={Number(id)} />
  ),
  '/forms/:id/submissions/:resId': ({
    id,
    resId,
  }: {
    id: string;
    resId: string;
  }) => <ResponseView formID={Number(id)} responseID={Number(resId)} />,
  '/preview/:formId': ({ formId }: { formId: string }) => (
    <Preview formID={Number(formId)} />
  ),
};

export default function AppRouter(props: { currentUser: User }) {
  let routeResult = useRoutes(routes);
  return (
    <AppContainer currentUser={props.currentUser}>{routeResult}</AppContainer>
  );
}
