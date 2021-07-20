import React, { Component } from 'react';
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import GoogleLogin from 'react-google-login'

//functions:
import { loadData } from '../store/actions/dataAction.js'
import { updateNickname, updateUserImage, createUser, checkExisting } from '../store/actions/userAction.js'

//imgs:
import logoSrc from '../assets/imgs/bookLogo.png'
import clock from '../assets/imgs/time.png'
import finish from '../assets/imgs/finish.png'
import round from '../assets/imgs/round.png'
import google from '../assets/imgs/google.png'

import { userService } from '../services/userService.js';
import { storageService } from '../services/session-storage.js';


class _SignUp extends Component {

    state = {
        isGuestClicked: false,
        fields: {
            nickname: '',
            newName: '',
            password: '',
            newPass: '',
        },
        isSignShown: false,
        isExist: false,
        isCheckClicked: false,
        lang: 'en'
    }

    responseGoogle = async (response) => {
        const { data, history: { push } } = this.props
        const { givenName, imageUrl } = response.profileObj
        const pass = await userService.makeId(8)
        this.setState({ fields: { ...this.state.fields, newName: givenName, newPass: pass } })
        await this.props.createUser(data, { newName: givenName, newPass: pass, imageUrl })
        const txt = this.txtForDisplay
        Swal.fire({
            title: txt.k,
            text: pass,
            confirmButtonText: txt.l,
            confirmButtonColor: '#ff641a',
            focusConfirm: false,
            position: 'top-start',
            allowOutsideClick: false
        }).then(res => {
            if (res.isConfirmed) {
                console.log('confirmed');
                push(`/${window.screen.width < 500 ? 'home' : 'about'}`)
            }
        })
    }

    async componentDidMount() {
        await this.props.loadData()
        const currUser = storageService.load('currUser')
        let lang = currUser !== null ? currUser?.game?.lang : 'English'
        this.setState({ lang })
    }

    handleChange = ({ target }) => {
        let value = target.value
        let field = target.name
        let copyFields = { ...this.state.fields, [field]: value }
        this.setState({ fields: copyFields })
    }

    checkExisting = async () => {
        let { nickname, password } = this.state.fields
        let isExist = await this.props.checkExisting(this.props.data, { nickname, password })
        this.setState({ isExist, isGuestClicked: false, isCheckClicked: true }, () => {
            if (!this.state.isExist) this.doSwal()
            else this.props.history.push(`/${window.screen.width < 500 ? 'home' : 'about'}`)
        })
    }

    doSwal = () => {
        const txt = this.txtForDisplay
        Swal.fire({
            title: txt.h,
            showCancelButton: true,
            cancelButtonColor: '',
            cancelButtonText: txt.n,
            confirmButtonText: txt.i,
            confirmButtonColor: window.screen.height < 1000 ? '#ff5722' : '#ff7629',
            focusConfirm: false,
            allowOutsideClick: false,
            reverseButtons: true,
        }).then(res => {
            if (res.isConfirmed) {
                this.setState({ isSignShown: true, isGuestClicked: true })
            }
        })
    }

    createUser = async () => {
        const { data, history: { push } } = this.props
        let { newName, newPass } = this.state.fields
        if (newName && newPass) {
            await this.props.createUser(data, { newName, newPass })
            push(`/${window.screen.width < 500 ? 'home' : 'about'}`)
        }
    }

    get txtForDisplay() {
        const { lang } = this.state
        return lang === 'English' ? {
            a: 'Login',
            b: 'Username',
            c: 'Get In',
            d: 'Choose A username',
            e: 'Oops, Seems You Need To Signup',
            f: 'Password',
            g: 'signup',
            h: 'Seems you need to sign up',
            i: 'Sign Up',
            j: 'Hello! Please log in to start playing, or sign up and create a new user',
            k: 'Your Password is:',
            l: 'Ok, Got It',
            m: 'Choose A Password',
            n: 'Back To Fix',
            o: 'Sign Up With Google',
            p: "Let's Start",
            q: 'Or'
        } : {
            a: 'היכנס/י',
            b: 'שם משתמש',
            c: 'היכנס/י',
            d: 'בחר/י שם משתמש',
            e: 'נראה שיש צורך להירשם',
            f: 'סיסמה',
            g: 'הירשם/י',
            h: 'נראה שיש צורך להירשם',
            i: 'הירשם/י',
            j: 'היי! היכנס/י כדי להתחיל לשחק, או הירשם/י ופתח/י משתמש חדש',
            k: 'הסיסמה שלך היא',
            l: 'בסדר הבנתי',
            m: 'בחר/י סיסמה',
            n: 'חזרה',
            o: 'היכנס/י באמצעות גוגל',
            p: 'בוא/י נתחיל',
            q: 'או'
        }
    }

    render() {
        const { isGuestClicked, nickname, password, isExist, isCheckClicked, newName, newPass, isSignShown, lang } = this.state
        const txt = this.txtForDisplay
        const isEn = lang === 'English' ? true : false
        return (
            <section className="sign-up tac page" style={{ fontFamily: isEn ? 'montserrat' : 'sans-serif' }}>

                <div className="top">
                    <p>welcome to trinius</p>
                    <small>the game that will make you a genius</small>
                    <img src={logoSrc} alt="" />
                </div>
                <img src={logoSrc} alt="" className="logo flex ma" />
                {!isGuestClicked && <div className="signs-options">
                    <section className="info">
                        <p>{txt.j}</p>
                    </section>
                    <div className="enter-guest pa" style={{ color: 'black', width: '100%', fontSize: 'larger' }} onClick={() => this.setState({ isGuestClicked: !isGuestClicked })}>{txt.p}</div>
                </div>}

                {isGuestClicked && <section className="forms-section pa left-trans">
                    {!isSignShown && <div>
                        <p>{txt.a}</p>
                        <input style={{ fontFamily: isEn ? 'montserrat' : 'sans-serif' }} type="text" autoFocus placeholder={txt.b} name="nickname" autoComplete="off" onChange={this.handleChange} value={nickname} className="tac" required />
                        <input style={{ fontFamily: isEn ? 'montserrat' : 'sans-serif' }} type="password" placeholder={txt.f} name="password" value={password} onChange={this.handleChange} autoComplete="off" className="tac" required />
                        <span onClick={(ev) => this.checkExisting(ev)}>{txt.c}</span>
                    </div>}
                    {isSignShown && <div>
                        <p>{txt.i}</p>
                        <GoogleLogin
                            clientId="192799378072-sv10o18kvorg1bb9paptm1drkffvbnie.apps.googleusercontent.com"
                            buttonText=""
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            render={renderProps => (
                                <div style={{ color: 'black', fontWeight: 'normal' }} className="enter-google flex" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                    <img className="google-img pa" src={google} alt="" />
                                    <p>{txt.o}</p>
                                    </div>
                            )}
                        />
                        <h3>{txt.q}</h3>
                        <div className="opts">
                            <input style={{ fontFamily: isEn ? 'montserrat' : 'sans-serif' }} type="text" autoFocus placeholder={txt.d} name="newName" autoComplete="off" onChange={this.handleChange} value={newName} className="tac" required />
                            <input style={{ fontFamily: isEn ? 'montserrat' : 'sans-serif' }} type="password" placeholder={txt.m} name="newPass" value={newPass} onChange={this.handleChange} autoComplete="off" className="tac" required />
                            <div className="g-in pr" onClick={this.createUser}>{txt.c}</div>
                        </div>
                    </div>}
                </section>}


                <div className="backImgs">
                    <img src={finish} alt="" />
                    <img src={clock} alt="" />
                    <img src={round} alt="" />
                    <img src={round} alt="" />
                </div>

            </section >
        );
    }
}
const mapStateToProps = state => {
    return {
        data: state.dataModule.data
    }
}
const mapDispatchToProps = {
    loadData,
    updateNickname,
    updateUserImage,
    createUser,
    checkExisting
}
export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp)
