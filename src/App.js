import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div >
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="/home">Fujiwara Tofu Shop</a>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <Link to="/home" class ="nav-item nav-link">Home</Link>
                <Link to="/barang" class ="nav-item nav-link" >Barang</Link>
                <Link to="/bio" class ="nav-item nav-link">Bio</Link>
                <Switch class ="nav-item nav-link">
                  <AuthButton />
                </Switch>
              </div>
            </div>
          </div>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path ="/home">
            <PublicPage />
          </Route>
          <Route path ="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path ="/barang">
            <ProtectedPage />
          </PrivateRoute>
          <PrivateRoute path ="/bio">
            <AboutPage />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}
// authentification 
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
// kondisi login/ blom
function AuthButton(){
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <a class="nav-item nav-link">
      Welcome!{" "}
      <button onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
        class="btn btn-danger">
        Sign out
      </button>
    </a>
  ) : (
    <a class="nav-item nav-link disabled" >You are not logged in.</a>
  )
}
// kondisi private route apakah sudah login/belum
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
// tampilan publicpage/home
function PublicPage(){
  return (
    <div>
      <div class="jumbotron">
        <center> 
          <h2>Selamat datang di Fujiwara Tofu Shop!</h2>
          <p>Toko Tahu dengan pengiriman tercepat di ALAM SEMESTA</p><br/><br/>
          <p><a class="btn btn-primary btn-lg" href="/barang" role="button">Mulai Belanja !</a></p>
        </center>
      </div>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col">
          <div class="card">
            <img src="https://cdn1-production-images-kly.akamaized.net/BomF3WCGchra3TvEVmSuZbJAqWI=/640x640/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2825649/original/099511400_1560236129-iStock-523444303.jpg" class="card-img-top"/>
              <div class="caption">
                <h3 class="card-title">Manfaat Tahu</h3>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris</p>
                <p>
                <a href="/home" class="btn btn-primary" role="button">Lihat</a></p>
              </div>
            </div>
          </div>
          <div class="col">
          <div class="card">
            <img src="https://cdn1-production-images-kly.akamaized.net/YTS9RSf_anobLUPlqDvWix8oFuA=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2407071/original/025557100_1542095096-meals-3167100_1920_pixabay_focusonpc.JPG" class="card-img-top"/>
              <div class="caption">
                <h3 class="card-title">Proses Pembuatan</h3>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris</p>
                <p>
                <a href="/home" class="btn btn-primary" role="button">Lihat</a></p>
              </div>
            </div>
          </div>
          <div class="col">
          <div class="card">
            <img src="https://assets-a1.kompasiana.com/items/album/2018/05/12/35a6ae0199f0d22e-5af6b2a3dd0fa86001774892.jpg" class="card-img-top"/>
              <div class="caption">
                <h3 class="card-title">Jenis Tahu</h3>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris</p>
                <p>
                <a href="/barang" class="btn btn-primary" role="button">Lihat</a></p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
//tampilan protected page yang sudah login
function ProtectedPage(){
  return (
    <div>
      <div class="jumbotron">
        <center> 
          <h2>Tahu Yang Tersedia</h2>
        </center>
      </div>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col">
          <div class="card">
            <img src="https://i0.wp.com/resepkoki.id/wp-content/uploads/2016/10/Tahu-kuning.jpg?resize=300%2C210&ssl=1" class="card-img-top"/>
              <div class="caption">
                <h3 class="card-title">Tahu Kuning</h3>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris</p>
                <p>
                <a href="/home" class="btn btn-primary" role="button">Lihat</a></p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <img src="https://i1.wp.com/resepkoki.id/wp-content/uploads/2016/10/Tahu-putih.jpg?resize=300%2C150&ssl=1" class="card-img-top"/>
                <div class="caption">
                  <h3 class="card-title">Tahu Putih</h3>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris</p>
                  <p>
                  <a href="/home" class="btn btn-primary" role="button">Lihat</a></p>
                </div>
              </div>
          </div>
          <div class="col">
            <div class="card">
              <img src="https://i2.wp.com/resepkoki.id/wp-content/uploads/2016/10/tahu-pong.jpg?resize=300%2C231&ssl=1" class="card-img-top"/>
                <div class="caption">
                  <h3 class="card-title">Tahu Pong</h3>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris</p>
                  <p>
                  <a href="/barang" class="btn btn-primary" role="button">Lihat</a></p>
                </div>
              </div>
          </div>
          <div class="col">
            <div class="card">
              <img src="https://i2.wp.com/resepkoki.id/wp-content/uploads/2016/10/Tofu.jpg?resize=300%2C200&ssl=1" class="card-img-top"/>
                <div class="caption">
                  <h3 class="card-title">Tahu Sutera (Tofu)</h3>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris</p>
                  <p>
                  <a href="/barang" class="btn btn-primary" role="button">Lihat</a></p>
                </div>
              </div>
          </div>
          <div class="col">
            <div class="card">
              <img src="https://i2.wp.com/resepkoki.id/wp-content/uploads/2016/10/kuliner-tahu-sumedang.jpg?w=1080&ssl=1" class="card-img-top"/>
                <div class="caption">
                  <h3 class="card-title">Tahu Kulit</h3>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris</p>
                  <p>
                  <a href="/barang" class="btn btn-primary" role="button">Lihat</a></p>
                </div>
              </div>
          </div>
          <div class="col">
            <div class="card">
              <img src="https://i1.wp.com/resepkoki.id/wp-content/uploads/2016/10/Tahu-bulat.jpg?resize=263%2C300&ssl=1" class="card-img-top"/>
                <div class="caption">
                  <h3 class="card-title">Tahu Bulat</h3>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris</p>
                  <p>
                  <a href="/barang" class="btn btn-primary" role="button">Lihat</a></p>
                </div>
              </div>
          </div>
      </div>
    </div>
  );
}
// tampilan about yang menggunakan nesting
function AboutPage(){
  let {path, url} = useRouteMatch();
  return (
    <div>
      <h2>Biodata</h2>
      <ul>
        <li>
          <Link to={`${url}/Mirza Zarqani Rayhan`}>Nama</Link>
        </li>
        <li>
          <Link to={`${url}/1841720205`}>NIM</Link>
        </li>
        <li>
          <Link to={`${url}/TI-3F, 17`}>Kelas, NoAbsen</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path ={path}>
          <Route />
        </Route>
        <Route path ={`${path}/:bioId`}>
          <Bio />
        </Route>
      </Switch>
    </div>
  );
}

// fungsi untuk menampilkan bioId
function Bio(){
  let { bioId } = useParams();

  return(
    <div>
      <h3>{bioId}</h3>
    </div>
  );
}

// tampilan laman login
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