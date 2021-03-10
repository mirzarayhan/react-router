import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

export default function App() {
  return (
      // params adalah placeholder di url yang dimulai dengan titik 2,
      // seperti param ":id" dengan dicontohkan dengan ":netflix"
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/netflix">Netflix</Link>
            </li>
            <li>
              <Link to="/gmail">Gmail</Link>
            </li>
            <li>
              <Link to="/yahoo">Yahoo</Link>
            </li>
            <li>
              <Link to="/amazon">Amazon</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/:id" children={<Child/>}/>
        </Switch>
      </div>
    </Router>
  );
}

function Child() {
    let {id} = useParams;
    return (
        <div>
            <h2>ID: {id}</h2>
        </div>
    );
}
