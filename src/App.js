import { ApolloProvider } from '@apollo/client';
import { Switch, Route, BrowserRouter as Router, } from 'react-router-dom';

import { PokemonProvider } from './utils/contexts/pokemon-context';

import ErrorBoundary from './components/error-boundary/error-boundary';
import Header from './components/header';
import client from './utils/graphql';
import routes from './routes';

function App() {
  return (
    <ApolloProvider client={client}>
      <PokemonProvider>
        <Router>
          <Header />
          <Switch>
            <ErrorBoundary>
              {routes.map(route => <Route key={route.title} {...route} />)}
            </ErrorBoundary>
          </Switch>
        </Router>
      </PokemonProvider>
    </ApolloProvider>
  );
}

export default App;
