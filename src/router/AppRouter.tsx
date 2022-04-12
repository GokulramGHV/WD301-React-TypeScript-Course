import React, { Suspense } from 'react';
import { useRoutes } from 'raviger';
import AppContainer from '../AppContainer';
import { User } from '../types/userTypes';

const Home = React.lazy(() => import('../Components/Home'));
const Register = React.lazy(() => import('../Components/Register'));
const Login = React.lazy(() => import('../Components/Login'));
const About = React.lazy(() => import('../Components/About'));
const FormEditor = React.lazy(() => import('../Components/Form'));
const Preview = React.lazy(() => import('../Components/Preview'));
const FormResponses = React.lazy(() => import('../Components/FormResponses'));
const ResponseView = React.lazy(() => import('../Components/ResponseView'));

let isAuthenticated = localStorage.getItem('token') ? true : false;

const routes = {
  '/': () =>
    isAuthenticated ? (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ) : (
      <Suspense fallback={<div>Loading...</div>}>
        <Register />
      </Suspense>
    ),
  '/login': () => (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  ),
  '/about': () => (
    <Suspense fallback={<div>Loading...</div>}>
      <About />
    </Suspense>
  ),
  '/forms/:id': ({ id }: { id: string }) => (
    <Suspense fallback={<div>Loading...</div>}>
      {' '}
      <FormEditor formID={Number(id)} />{' '}
    </Suspense>
  ),
  '/forms/:id/submissions': ({ id }: { id: string }) => (
    <Suspense fallback={<div>Loading...</div>}>
      <FormResponses formID={Number(id)} />
    </Suspense>
  ),
  '/forms/:id/submissions/:resId': ({
    id,
    resId,
  }: {
    id: string;
    resId: string;
  }) => (
    <Suspense fallback={<div>Loading...</div>}>
      <ResponseView formID={Number(id)} responseID={Number(resId)} />
    </Suspense>
  ),
  '/preview/:formId': ({ formId }: { formId: string }) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Preview formID={Number(formId)} />
    </Suspense>
  ),
};

export default function AppRouter(props: { currentUser: User }) {
  let routeResult = useRoutes(routes);
  return (
    <AppContainer currentUser={props.currentUser}>{routeResult}</AppContainer>
  );
}
