import React from "react";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from './components/sidebar'
import Home from "./pages/Home/index.js";
import District from "./pages/Home/district";
import Staff from "./pages/Home/staff";
import Come from "./pages/Home/xodim";
import FiltrRegion from "./pages/Home/FiltrRegion";
import UserCount from "./pages/Home/userCount";
import SignIn from "./components/LogIn/SignIn.jsx";
import { SnackbarProvider } from "notistack";
import { Banner } from "./pages/PageFail/Pages_1.jsx";
import Login from "./components/LogIn/login.jsx";

const GlobalStyle = createGlobalStyle`
* {
  padding: 0
}

a {
  text-decoration: none;
}

body {
padding: 0;
margin: 0;
background: #F5F7FA;
}
`;

function App() {
  const Auth = localStorage.getItem("token");

  console.log(Auth);
  return (
      <div className="App">

          {!Auth ? (
              <>
                  <SnackbarProvider>
                      <BrowserRouter>
                          <GlobalStyle />
                          <Switch>
                            <Route exact path="/signin">
                                 <SignIn />
                            </Route>

                                <Redirect from="/" to="/signin" />

                          </Switch>
                      </BrowserRouter>
                  </SnackbarProvider>
              </>
          ) : (
          <div className="row">
              <div className="col-2">
                  <Sidebar />

              </div>
              <div className="col-10">
                    <SnackbarProvider>
                        <BrowserRouter>
                            <GlobalStyle />
                                <Switch>

                                      <>
                                        <Route exact path="/">
                                          <Home />
                                        </Route>
                                        <Route exact path="/banner">
                                          <Banner />
                                        </Route>
                                          <Route path='/district/:id'>
                                            <District />
                                          </Route>
                                          <Route path='/staff/:id'>
                                              <Staff />
                                          </ Route>
                                          <Route path='/work/come'>
                                            <Come />
                                          </ Route>

                                          <Route path='/user/count/:id'>
                                              <UserCount />
                                          </Route>
                                          <Route path='/filtr/region'>
                                              <FiltrRegion />
                                          </Route>
                                      </>
                                      )}
                                     <Route>404 Not Found</Route>

                                </Switch>
                        </BrowserRouter>
                    </SnackbarProvider>
              </div>
          </div>)}

      </div>

  );
}

export default App;
