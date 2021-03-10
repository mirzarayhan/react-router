import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
  Redirect,
  useLocation
} from "react-router-dom";

export default function App() {
  return (
      // terdapat 3 halaman yaitu public, private, dan login
      // untuk mengakses private page maka harus login terlebih dahulu
      // dikarenakan blum login maka akan di redirect menuju login terlebih dahulu
      // setelah login maka akan di redirect kembali menuju private page
    <Router>
      <div>
        <nav>
          <Switch>
            <AuthButton/>
          </Switch>
          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/private">Private Page</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path ="/public">
            <PublicPage />
          </Route>
          <Route path ="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path ="/private">
            <ProtectedPage />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton(){
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
}

function PrivateRoute({children, ...rest }){
  return(
    <Route
      {... rest}
      render = {({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ): ( 
          <Redirect
            to= {{
              pathname: "/login",
              state: {from: location}
            }}
          />
        )
      }
    />
  );
}

function PublicPage(){
  return <h3>Public</h3>;
}

function ProtectedPage(){
  return <h3>Private</h3>;
}

function LoginPage(){
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/"} };
  let login = () =>{
    fakeAuth.authenticate(() =>{
      history.replace(from);
    });
  };
  
  return (
    <div>
      <p>You must Login to view this page at {from.pathname}</p>
      <button onClick={login}>Login</button>
    </div>
  );
}