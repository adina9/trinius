import { Switch, Route, useLocation, HashRouter as Router } from 'react-router-dom'
import { useSelector } from 'react-redux'
import i18n from "./services/i18next.js"
import React from 'react';
import Swal from 'sweetalert2'

//cmps:
import { Home } from './pages/Home';
import { About } from './pages/About';
import { SignUp } from './pages/SignUp';
import { Settings } from './pages/Settings';
import { Adding } from './pages/Adding';
import { Playing } from './pages/Playing';
import { Dashboard } from './pages/Dashboard';
import { AppHeader } from './cmps/AppHeader';
import { AppNav } from './cmps/AppNav';
import { storageService } from './services/session-storage.js';
import { AboutMe } from './pages/AboutMe.jsx';


export const App = () => {

  const { data } = useSelector(state => state.dataModule)

  var { pathname } = useLocation()

  const currUser = storageService.load('currUser')
  var currLng = currUser ? currUser.game.lang === 'עברית' ? 'he' : 'en' : 'en'
  i18n.changeLanguage(currLng)

  if (!currUser?.nickname) pathname = "/"

  var { width, height } = window.screen
  window.addEventListener('resize', () => {

    var w = window.screen.width
    var h = window.screen.height

    var isMobile = (w < 1000 && h < 500) || (w < 500 && h < 1000)
    var totalCheck = isMobile && w > width

    if ((width === h && height === w) && isMobile)

      Swal.fire({
        title: currUser?.game?.lang === 'English' ? totalCheck ? 'Please Rotate Your Device' : 'Great!' : totalCheck ? 'בבקשה סובב/י את המסך' : 'מצוין',
        icon: totalCheck ? 'warning' : 'success',
        showConfirmButton: false,
        allowOutsideClick: !totalCheck,
        backdrop: '#e8eaed',
        background: '#e8eaed',
        iconColor: totalCheck ? '#ff3737c2' : '#ff955a',
        timer: totalCheck ? false : 1200
      })

    width = window.screen.width
    height = window.screen.height
  })

  return (
    <div className="App">
      {pathname !== '/play' && pathname !== "/" && <AppHeader data={data} />}
      {pathname !== '/play' && pathname !== "/" && <AppNav />}
      <Router>
        <Switch>
          <Route path="/me" component={AboutMe} />
          <Route path='/about' component={About} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path='/settings' component={Settings} />
          <Route path='/adding' component={Adding} />
          <Route path="/play" component={Playing} />
          <Route path='/home' component={Home} />
          <Route path="/" component={SignUp} />
        </Switch>
      </Router>
    </div >
  )
}