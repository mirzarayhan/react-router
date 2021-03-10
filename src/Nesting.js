import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

export default function App() {
  return (
    // route merupakan komponen regular dari react
    // maka dari itu bisa dimasukkan dalam child element
    // membantu dikarenakan pemisahan kode di app react router yang sama dengan pemecahan kode react lainnya
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path ="/">
            <Home />
          </Route>
          <Route path ="/topics">
            <Topics />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home(){
  return(
    <div>
      <h2>Home</h2>
    </div>
  );
}
function Topics(){
  // path membuat route terhadap rute induk 
  // sedangkan url membuat link
  let {path, url} = useRouteMatch();
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${url}/Sate, Nasi Goreng`}>Kuliner</Link>
        </li>
        <li>
          <Link to={`${url}/Wisata Alam, Museum`}>Traveling</Link>
        </li>
        <li>
          <Link to={`${url}/Ibis, JW Marriot`}>Review Hotel</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path ={path}>
          <Route />
        </Route>
        <Route path ={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
}

function Topic(){
  let { topicId } = useParams();

  return(
    <div>
      <h3>{topicId}</h3>
    </div>
  );
}