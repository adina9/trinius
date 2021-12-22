import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

//cmps:
import { Settings } from '../pages/Settings'
import { Logout } from './Logout'
import { Home } from '../pages/Home';
import { AboutMe } from '../pages/AboutMe'

//imgs:
import avatarSrc from '../assets/imgs/user.png'
import logoSrc from '../assets/imgs/bookLogo.png'
import clock from '../assets/imgs/time.png'
import finish from '../assets/imgs/finish.png'
import round from '../assets/imgs/round.png'

//icons:
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import InfoIcon from '@material-ui/icons/Info';

//functions:
import { logout } from '../store/actions/userAction.js'
import { loadData } from '../store/actions/dataAction'
import { storageService } from '../services/session-storage'

const menuOptions = [{ txt: 'home', to: 'home' }, { txt: 'adding', to: 'adding' }, { txt: 'dashboard', to: 'dashboard' }, { txt: 'settings', to: 'settings' }, { txt: 'about', to: 'about' }, { txt: 'about me', to: 'me' }]

export const AppHeader = ({ history }) => {

    const { data } = useSelector(state => state.dataModule)
    const dispatch = useDispatch()

    const [currUser, setCurrUser] = useState({})
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isAboutMeOpen, setIsAboutMeOpen] = useState(false)
    const [className, setClassName] = useState(false)

    const navForDisplay = () => {
        const currUser = storageService.load('currUser')
        return currUser?.game?.lang === 'English' ?
            [{ txt: 'home', to: 'about' }, { txt: 'editor', to: 'adding' }, { txt: 'dashboard', to: 'dashboard' }]
            : [{ txt: 'בית', to: 'about' }, { txt: 'עריכה', to: 'adding' }, { txt: 'סטטיסטיקה', to: 'dashboard' }]
    }

    useEffect(async () => {
        await dispatch(loadData())
        const user = storageService.load('currUser')
        if (!user?.nickname) history.push("/")
        setCurrUser({ ...user })
    }, [])

    const navOps = navForDisplay()
    const { nickname, image, game } = currUser
    var isEn = game?.lang === 'English' ? true : false

    return (
        <React.Fragment>
            <header className="app-header pf">
                <div className="inner flex">
                    <div className="flex j-between">
                        <img src={logoSrc} alt="" />
                        <p>trinius</p>
                    </div>
                    <div className="wider-menu flex">
                        {navOps.map((o, idx) => <NavLink to={`/${o.to}`} exact={true} activeClassName="active-link" key={idx}>{o.txt}</NavLink>)}
                        <p id={`${isSettingsOpen ? 'settings' : ''}`} onClick={() => setIsSettingsOpen(!isSettingsOpen)}>{isEn ? 'Settings' : 'הגדרות'}<span><SettingsIcon /></span></p>
                        <p style={{ width: '100%' }} onClick={() => setIsAboutMeOpen(!isAboutMeOpen)}>{isEn ? 'About Me' : 'מי אני'}<span><InfoIcon /></span></p>
                        <Logout logout={dispatch(logout)} data={data} history={history} />
                    </div>
                    <MenuIcon id={`${className ? 'menu-icon' : ''}`} className="menu-icon pa" onClick={() => setClassName(!className)} alt="" />

                    <div className="backImgs">
                        <img src={clock} alt="" />
                        <img src={round} alt="" />
                        <img src={finish} alt="" />
                    </div>
                </div>
                <section id="app-menu" className={`menu ${className ? 'open' : ''}`} onBlur={(ev) => {
                    ev.stopPropagation()
                    setClassName(false)
                }}>
                    <div className="little-profile">
                        <img src={image ? image?.src : avatarSrc} style={{ backgroundColor: image?.bgClr }} alt="" className="flex" />
                        <p className="tac">{nickname}</p>
                    </div>
                    <div className="menu-options flex column">
                        {menuOptions.map((o, idx) => <NavLink to={`/${o.to}`} onClick={() => setClassName(false)} exact={true} activeClassName="active-menu-link" key={idx}>{o.txt}</NavLink>)}
                        <img src={logoSrc} alt="" />
                    </div>
                </section>

            </header>

            <section id="menu" className={`settings-menu ${isSettingsOpen ? 'open' : ''}`}><Settings data={data} isOnDesktop={true} /></section>

            <section className={`side-aboutMe ${isAboutMeOpen ? 'open' : ''}`}><AboutMe /></section>

            <div className="left-area">

                <img src={clock} alt="" />
                <img src={round} alt="" />
                <img src={finish} alt="" />
                <img src={clock} alt="" />
                <img src={round} alt="" />
                <img src={finish} alt="" />
                <img src={clock} alt="" />
                <img src={round} alt="" />
                <img src={finish} alt="" />
                <img src={clock} alt="" />
                <img src={round} alt="" />
                <img src={finish} alt="" />
                <div className="profile flex a-center j-center pa ttc tac" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                    <p>{isEn ? 'Your Profile' : 'פרופיל'}</p>
                    <ArrowRightIcon />
                </div>
            </div>

            <div className={`back-dark ${isProfileOpen ? 'shown' : ''}`}> </div>
            <div className={`profile-div ${isProfileOpen ? 'open' : ''}`}>  <Home data={data} isOnDesktop={true} /></div>

        </React.Fragment >
    )
}