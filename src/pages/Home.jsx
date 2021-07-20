import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

//functions:
import { loadData } from '../store/actions/dataAction.js'
import { updateNickname, updateUserImage } from '../store/actions/userAction.js'
import { updateCountry } from '../store/actions/gameAction.js'

import avatarSrc from '../assets/imgs/user.png'

import a01 from '../assets/imgs/avatars/avatar-01.png'
import a02 from '../assets/imgs/avatars/avatar-02.png'
import a03 from '../assets/imgs/avatars/avatar-03.png'
import a04 from '../assets/imgs/avatars/avatar-04.png'
import a05 from '../assets/imgs/avatars/avatar-05.png'
import a06 from '../assets/imgs/avatars/avatar-06.png'
import a07 from '../assets/imgs/avatars/avatar-07.png'
import a08 from '../assets/imgs/avatars/avatar-08.png'
import a09 from '../assets/imgs/avatars/avatar-09.png'
import a10 from '../assets/imgs/avatars/avatar-10.png'
import a11 from '../assets/imgs/avatars/avatar-11.png'
import a12 from '../assets/imgs/avatars/avatar-12.png'
import a13 from '../assets/imgs/avatars/avatar-13.png'
import a14 from '../assets/imgs/avatars/avatar-14.png'
import a15 from '../assets/imgs/avatars/avatar-15.png'
import a16 from '../assets/imgs/avatars/avatar-16.png'
import a17 from '../assets/imgs/avatars/avatar-17.png'
import a18 from '../assets/imgs/avatars/avatar-18.png'
import a19 from '../assets/imgs/avatars/avatar-19.png'
import a20 from '../assets/imgs/avatars/avatar-20.png'
import a21 from '../assets/imgs/avatars/avatar-21.png'
import a22 from '../assets/imgs/avatars/avatar-22.png'
import a23 from '../assets/imgs/avatars/avatar-23.png'
import a24 from '../assets/imgs/avatars/avatar-24.png'
import a25 from '../assets/imgs/avatars/avatar-25.png'
import a26 from '../assets/imgs/avatars/avatar-26.png'
import a27 from '../assets/imgs/avatars/avatar-27.png'
import a28 from '../assets/imgs/avatars/avatar-28.png'
import a29 from '../assets/imgs/avatars/avatar-29.png'
import a30 from '../assets/imgs/avatars/avatar-30.png'
import a31 from '../assets/imgs/avatars/avatar-31.png'
import a32 from '../assets/imgs/avatars/avatar-32.png'
import a33 from '../assets/imgs/avatars/avatar-33.png'
import a34 from '../assets/imgs/avatars/avatar-34.png'
import a35 from '../assets/imgs/avatars/avatar-35.png'
import a36 from '../assets/imgs/avatars/avatar-36.png'
import a37 from '../assets/imgs/avatars/avatar-37.png'
import a38 from '../assets/imgs/avatars/avatar-38.png'
import a39 from '../assets/imgs/avatars/avatar-39.png'
import a40 from '../assets/imgs/avatars/avatar-40.png'
import a41 from '../assets/imgs/avatars/avatar-41.png'
import a42 from '../assets/imgs/avatars/avatar-42.png'
import a43 from '../assets/imgs/avatars/avatar-43.png'
import a44 from '../assets/imgs/avatars/avatar-44.png'
import a45 from '../assets/imgs/avatars/avatar-45.png'
import a46 from '../assets/imgs/avatars/avatar-46.png'
import a47 from '../assets/imgs/avatars/avatar-47.png'
import a48 from '../assets/imgs/avatars/avatar-48.png'
import a49 from '../assets/imgs/avatars/avatar-49.png'
import a50 from '../assets/imgs/avatars/avatar-50.png'
import a51 from '../assets/imgs/avatars/avatar-51.png'
import a52 from '../assets/imgs/avatars/avatar-52.png'
import a53 from '../assets/imgs/avatars/avatar-53.png'
import a54 from '../assets/imgs/avatars/avatar-54.png'
import a55 from '../assets/imgs/avatars/avatar-55.png'
import a56 from '../assets/imgs/avatars/avatar-56.png'
import a57 from '../assets/imgs/avatars/avatar-57.png'
import a58 from '../assets/imgs/avatars/avatar-58.png'
import a59 from '../assets/imgs/avatars/avatar-59.png'
import a60 from '../assets/imgs/avatars/avatar-60.png'


import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import CheckIcon from '@material-ui/icons/Check';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

//cmps:
import { LoadCycle } from '../cmps/LoadCycle.jsx'
import { storageService } from '../services/session-storage.js';

class _Home extends Component {

    state = {
        currUser: {},
        isLoadingImage: true,
        isEditClicked: false,
        nickname: '',
        countryFilter: '',
        currImg: { src: '', bgClr: '' },
        countryClass: "choose-country flex tac",
        cc: 'countries-div',
        dc: 'div',
        pc: 'p',
        countriesOpsClass: 'countries-options grid',
        isSelectImgClicked: false,
        currCountry: 'Brazil',
        imgsUrl: [a01, a02, a03, a04, a05, a06, a07, a08, a09, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23, a24, a25, a26, a27, a28, a29, a30, a31, a32, a33, a34, a35, a36, a37, a38, a39, a40, a41, a42, a43, a44, a45, a46, a47, a48, a49, a50, a51, a52, a53, a54, a55, a56, a57, a58, a59, a60],
        imgsClr: ['antiquewhite', 'cadetblue', '#7bf9adfc', '#d4ff7c', '#85a4bd', '#8c8c8c', '#63a14e', '#656f77', '#a58765', '#4e4b48', '#365041fc', '#7a3131', '#9c9c27', '#79d3de'],
        countries: [
            ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'China', 'Colombia', 'Denmark', 'England', 'Ethiopia', 'Finland', 'France', 'Germany', 'India', 'Israel', 'Italy', 'Japan', 'Mexico', 'Morocco', 'Philippines', 'Poland', 'Portugal', 'Romania', 'Russia', 'Spain', 'Sweden', 'Switzerland', 'Thailand', 'Ukraine', 'USA'],
            ['ארגנטינה', 'אוסטרליה', 'אוסטריה', 'בלגיה', 'ברזיל', 'קנדה', 'סין', 'קולומביה', 'גנמרק', 'אנגליה', 'אתיופיה', 'פינלנד', 'צרפת', 'גרמניה', 'הודו', 'ישראל', 'איטליה', 'יפן', 'מקסיקו', 'מרוקו', 'פיליפינים', 'פולין', 'פורטוגל', 'רומניה', 'רוסיה', 'ספרד', 'שוודיה', 'שווייץ', 'תאילנד', 'אוקראינה', 'ארצות הברית']
        ],
        isChooseCountryClicked: false,
        isCountryChosen: true
    }

    async componentDidMount() {
        const { data, history, isOnDesktop } = this.props
        await this.props.loadData()
        const currUser = storageService.load('currUser')
        const { nickname, image, game } = currUser
        if (!nickname) history.push("/")

        let { imgsUrl, imgsClr } = this.state
        imgsUrl = imgsUrl.map(s => s = { src: s, bgClr: imgsClr[Math.floor(Math.random() * 14)] })
        this.setState({
            nickname: nickname,
            isSelectImgClicked: image.src.slice(14, 15) === 'u' ? true : false,
            imgsUrl,
            currCountry: game.country,
            currImg: image,
            currUser
        })
        setTimeout(() => this.setState({ isLoadingImage: false }), 500)
    }

    handleChange = ({ target }) => this.setState({ nickname: target.value })
    handleCountryChange = ({ target }) => this.setState({ countryFilter: target.value })

    selectImg = async (ev, imgSrc) => {
        ev.preventDefault()
        this.setState({ isSelectImgClicked: false, currImg: imgSrc })
        const { data } = this.props
        await this.props.updateUserImage(data, this.state.currUser, imgSrc)
    }

    onUpdateCountry = async (ev, c) => {
        const { data } = this.props
        ev.preventDefault()
        this.setState({ currCountry: c })
        await this.props.updateCountry(data, this.state.currUser, c)
    }

    get countriesForDisplay() {
        let { countries, countryFilter, currUser } = this.state
        var currCountriesArr = countries[currUser?.game?.lang === 'English' ? 0 : 1]
        currCountriesArr = currCountriesArr.filter(c => c.includes(countryFilter))
        return currCountriesArr
    }

    txtObj = (v) => v ? {
        about: 'ABOUT',
        placeholder: 'A Capital Letter...',
        points: 'Points',
        avatar: 'SELECT YOUR AVATAR',
        play: 'Play'
    } : {
        about: '',
        placeholder: 'חפש/י מדינה...',
        points: 'נקודות',
        avatar: 'בחר/י תמונה',
        play: 'שחק/י'
    }

    render() {
        const { currUser, isLoadingImage, imgsUrl, isEditClicked, nickname, currImg, isSelectImgClicked, countryFilter, currCountry, countryClass, isChooseCountryClicked, cc, dc, pc, countriesOpsClass } = this.state
        const { isOnDesktop, data } = this.props
        const { pointsObj, image, game } = currUser
        var isEn = currUser?.game?.lang === 'English' ? true : false
        const countries = this.countriesForDisplay
        const txtObj = this.txtObj(isEn)
        if (!this.state || !currUser) return <LoadCycle width="30%" height="30%" top="30%"/>
        return (
            <section className="home-container main-layout pf">
                <div className={countryClass}>
                    <small>{txtObj.about}</small>
                    <small className="flex a-center j-center">{currCountry}</small>
                    <SwapHorizIcon style={{ display: isChooseCountryClicked ? 'none' : 'flex' }} onClick={() => {
                        this.setState({ isChooseCountryClicked: true, countryClass: 'choose-country flex tac wide' })
                        setTimeout(() => {
                            this.setState({ cc: 'countries-div open' })
                        }, 300);
                        setTimeout(() => {
                            this.setState({ dc: 'div shown', pc: 'p shown', countriesOpsClass: 'countries-options grid shown' })
                        }, 600);
                    }} />
                    <div className={cc}>
                        <header>
                            <div className={dc} style={{ direction: isEn ? 'ltr' : 'rtl' }}>
                                <input type="text" placeholder={txtObj.placeholder} value={countryFilter} onChange={this.handleCountryChange} />
                                <SearchRoundedIcon style={{ display: isEn ? 'block' : 'none' }} />
                            </div>
                            <p className={pc}>{currCountry}</p>
                            <CloseRoundedIcon onClick={() => {
                                this.setState({ countryClass: 'choose-country flex tac close', countriesOpsClass: 'countries-options grid', dc: 'div', pc: 'p' })
                                setTimeout(() => {
                                    this.setState({ countryClass: 'choose-country flex tac' })
                                }, 500);
                                setTimeout(() => {
                                    this.setState({ isChooseCountryClicked: false })
                                }, 1000);
                            }} />
                        </header>
                        <div className={countriesOpsClass}>
                            {countries.map((c, idx) => <div key={idx} style={{ color: !isOnDesktop ? currCountry === c ? 'black' : '' : currCountry === c ? 'white' : '' }} onClick={(ev) => this.onUpdateCountry(ev, c)}>
                                <FiberManualRecordIcon />
                                <p style={{ fontSize: c.length >= 10 ? 'smaller' : 'inherit' }}>{c}</p>
                            </div>)}
                        </div>
                    </div>
                </div>
                {!isEditClicked && <div className="avatar flex j-evenly ma" style={{ display: isChooseCountryClicked && !isOnDesktop ? 'none' : 'flex' }}>
                    <p>{nickname}</p>
                    <CreateOutlinedIcon onClick={() => this.setState({ isEditClicked: !isEditClicked })} />
                </div>}
                {isEditClicked && <div className="edit-name pa left-trans a-center">
                    <input type="text" required placeholder={nickname} value={nickname} onChange={this.handleChange} autoFocus="on" autoComplete="off" className="tac" />
                    <CheckIcon onClick={() => {
                        this.setState({ isEditClicked: nickname ? false : true }, () => {
                            if (this.state.nickname) this.props.updateNickname(data, currUser, nickname)
                        })

                    }} />
                </div>}

                {isLoadingImage && <LoadCycle width="40%" height="20%" top="40%" />}
                {!isLoadingImage && <div className="image flex j-center pa left-trans" style={{ display: isChooseCountryClicked && !isOnDesktop ? 'none' : 'flex' }}>
                    <span className="uploadFComputer"><PhotoCameraOutlinedIcon onClick={() => this.setState({ isSelectImgClicked: !isSelectImgClicked })} /></span>
                    {!image.src && <img src={avatarSrc} alt="" />}
                    {image.src && <img src={currImg.src} alt="" className="chosen-img" style={{ backgroundColor: currImg.bgClr }} />}
                    {currUser && <span className="first-letter-avatar flex a-center j-center"><small>{currUser.nickname?.slice(0, 1).toUpperCase()}</small></span>}
                </div>}

                <section className="score-section flex j-between a-center pa" style={{ opacity: isChooseCountryClicked ? '0.2' : '1' }}>
                    <span><StarsRoundedIcon /></span>
                    <div className="score tac">
                        <p>{txtObj.points}</p>
                        <p>{pointsObj?.fullPoints}</p>
                    </div>
                    <span><StarsRoundedIcon /></span>
                </section>

                <Link to="/play"><div className="playing tac pa" style={{ opacity: isChooseCountryClicked ? '0.2' : '1' }}>{txtObj.play}</div></Link>

                <section className={`imgs-section grid ${isSelectImgClicked ? 'open' : ''}`} style={{ display: !isChooseCountryClicked || isOnDesktop ? 'grid' : 'none' }}>
                    <header className="flex j-between ma">
                        <p className="ma">{txtObj.avatar}</p>
                        <CloseRoundedIcon onClick={() => this.setState({ isSelectImgClicked: false, className: 'imgs-section grid' })} className="ma" />
                    </header>
                    <div className="options grid pr">
                        {imgsUrl.map((src, idx) => <div key={idx} onClick={(ev) => this.selectImg(ev, src)} style={{ backgroundColor: src.bgClr }}><img src={src.src} alt="" /></div>)}
                    </div>
                </section>
            </section>
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
    updateCountry
}
export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)
