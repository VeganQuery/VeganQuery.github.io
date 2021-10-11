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
    {/* div content-wrap is here so the footer is at the bottom of the page */}
    <div id="content-wrap">
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/searchRes" component={SearchRes} />
        <Route component={Home} />
      </Switch>
    </div>
    <Footer />
  </HashRouter>
)

export default App;
