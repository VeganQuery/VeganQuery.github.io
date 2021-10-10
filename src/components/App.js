import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';


// // Components
import Home from './Home';
import Footer from './Footer';
import SearchRes from './SearchRes';


const App = () => (
  <HashRouter>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/searchRes" component={SearchRes} />
        <Route component={Home} />
      </Switch>
      <Footer />
  </HashRouter>
)

export default App;
