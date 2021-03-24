import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Switch, Route, BrowserRouter as Router, } from 'react-router-dom';

import { PokemonProvider } from './utils/contexts/pokemon-context';
import ErrorBoundary from './components/error-boundary/error-boundary';
import client from './utils/graphql';
import Header from './components/header';
import routes from './routes';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PokemonProvider>
        <Router>
          <Header />
          <Switch>
            <ErrorBoundary>
              <React.Suspense fallback={<h3>Loading page content...</h3>}>
                {routes.map(route => <Route key={route.title} {...route} />)}
              </React.Suspense>
            </ErrorBoundary>
          </Switch>
        </Router>
      </PokemonProvider>
    </ApolloProvider>
  )
}