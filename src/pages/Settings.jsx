import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Howl } from 'howler';
import i18n from "../services/i18next";

//components:
import { Category } from '../cmps/Category';
import { ToggleWrapper } from '../cmps/ToggleWrapper';
import { Logout } from '../cmps/Logout';

//functions:
import { updateSoundStatus, updateSound, updateLang, updateTime, updateTimeStatus, updateLevel, updateUseQStatus, updateCountry } from '../store/actions/gameAction.js'
import { logout } from '../store/actions/userAction.js'
import { loadData } from '../store/actions/dataAction.js';
import { gameService } from '../services/gameService';
import { storageService } from '../services/session-storage.js';

//icons:
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import ClassIcon from '@material-ui/icons/Class';
import DoubleArrowRoundedIcon from '@material-ui/icons/DoubleArrowRounded';
import SignalCellularNoSimOutlinedIcon from '@material-ui/icons/SignalCellularNoSimOutlined';
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

//tunes:
//piano-covers:
import p01 from '../music/piano/01.mp3'
import p02 from '../music/piano/02.mp3'
import p03 from '../music/piano/03.mp3'
import p04 from '../music/piano/04.mp3'
import p05 from '../music/piano/05.mp3'
import p06 from '../music/piano/06.mp3'
import p07 from '../music/piano/07.mp3'
import p08 from '../music/piano/08.mp3'
import p09 from '../music/piano/09.mp3'
import p10 from '../music/piano/10.mp3'
import p11 from '../music/piano/11.mp3'
import p12 from '../music/piano/12.mp3'
import p13 from '../music/piano/13.mp3'
import p14 from '../music/piano/14.mp3'
import p15 from '../music/piano/15.mp3'
import p16 from '../music/piano/16.mp3'
import p17 from '../music/piano/17.mp3'
import p18 from '../music/piano/18.mp3'
import p19 from '../music/piano/19.mp3'

//songs:
import s01 from '../music/songs/01.mp3'
import s02 from '../music/songs/02.mp3'
import s03 from '../music/songs/03.mp3'
import s04 from '../music/songs/04.mp3'
import s05 from '../music/songs/05.mp3'
import s06 from '../music/songs/06.mp3'
import s07 from '../music/songs/07.mp3'
import s08 from '../music/songs/08.mp3'
import s09 from '../music/songs/09.mp3'
import s10 from '../music/songs/10.mp3'
import s11 from '../music/songs/11.mp3'
import s12 from '../music/songs/12.mp3'


const tunes = [
    {
        title: 'covers',
        tunes: [
            { s: p01, n: 'Art of silence', isPlaying: false },
            { s: p02, n: 'friends - aura dione', isPlaying: false },
            { s: p03, n: 'bach - aria variata', isPlaying: false },
            { s: p04, n: 'the shadow of your smile', isPlaying: false },
            { s: p05, n: 'believer', isPlaying: false },
            { s: p06, n: 'everyone - monplaisir', isPlaying: false },
            { s: p07, n: 'attention - charlie puth', isPlaying: false },
            { s: p08, n: 'don\'t stop me now - queen', isPlaying: false },
            { s: p09, n: 'chandelier - sia', isPlaying: false },
            { s: p10, n: 'how long - charlie puth', isPlaying: false },
            { s: p11, n: 'demons - imagine dragons', isPlaying: false },
            { s: p12, n: 'despacito', isPlaying: false },
            { s: p13, n: 'shape of you', isPlaying: false },
            { s: p14, n: 'the hills - the weekend', isPlaying: false },
            { s: p15, n: 'dance monkey - tones and i', isPlaying: false },
            { s: p16, n: 'in dreams - scott buckley', isPlaying: false },
            { s: p17, n: 'can\'t stop my feet', isPlaying: false },
            { s: p18, n: 'empowered ending', isPlaying: false },
            { s: p19, n: 'atmosphere', isPlaying: false },
        ]
    },
    {
        title: 'songs',
        tunes: [
            { s: s01, n: 'faded - alan walker', isPlaying: false },
            { s: s02, n: 'thank u, next - ariana grande', isPlaying: false },
            { s: s03, n: 'hallo - beyonce', isPlaying: false },
            { s: s04, n: 'bad guy - biilie eilish', isPlaying: false },
            { s: s05, n: 'lovely - billie eilish', isPlaying: false },
            { s: s06, n: 'my heart will go on - celine dion', isPlaying: false },
            { s: s07, n: 'perfect - ed sheeran', isPlaying: false },
            { s: s08, n: 'photograph - ed sheeran', isPlaying: false },
            { s: s09, n: 'story of my life - one direction', isPlaying: false },
            { s: s10, n: 'what makes you beautiful - one direction', isPlaying: false },
            { s: s11, n: 'you & i - one direction', isPlaying: false },
            { s: s12, n: 'fade - tony tucker', isPlaying: false },
        ]
    }
]
var music = {
    overworld: new Howl({
        src: [p01]
    })
}
const levels = [
    { n: 'E', c: '#ff9800' },
    { n: 'M', c: '#FF5733' },
    { n: 'H', c: '#E92337' }
]
const timeOps = [60, 90, 120, 240]
const languages = ['English', 'עברית']

export const Settings = ({ history, children, isOnDesktop }) => {

    const { data } = useSelector(state => state.dataModule)
    const dispatch = useDispatch()


    const [currUser, setCurrUser] = useState({})
    const [isSoundOn, setIsSoundOn] = useState(false)
    const [useQStatus, setUseQStatus] = useState('')
    const [isTimeLevelOn, setIsTimeLevelOn] = useState(false)
    const [selectedTime, setSelectedTime] = useState(null)
    const [currCountry, setCurrCountry] = useState('')
    const [currLang, setCurrLang] = useState('')
    const [selectedSound, setSelectedSound] = useState(null)
    const [category, setCategory] = useState(null)
    const [lang, setLang] = useState(null)
    const [selectedLevel, setSelectedLevel] = useState(null)
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const [tunesArr, setTunesArr] = useState(tunes)

    var lngs = gameService.setSettLngs()

    useEffect(() => {
        setLang(currUser?.game?.lang)
        setCategory(currUser?.game?.category)
    }, [currUser])

    useEffect(() => {
        const currUser = storageService.load('currUser')
        dispatch(loadData())

        if (!currUser) return
        const { soundObj, timeObj, lang, level, useQ, country } = currUser?.game

        if (!currUser?.nickname) history?.push("/")

        setIsSoundOn(soundObj?.soundStatus)
        setUseQStatus(useQ)
        setIsTimeLevelOn(timeObj?.timeStatus)
        setCurrCountry(country)
        setCurrLang(lang)
        setCurrUser({ ...currUser })

        if (!country) dispatch(updateCountry(data, currUser, lang === 'English' ? 'Brazil' : 'ברזיל'))

        if (!soundObj?.soundStatus) {
            setIsSoundOn(false)
            setSelectedSound(tunesArr[0].tunes[0])
            dispatch(updateSound(data, currUser, tunesArr[0].tunes[0]))
            dispatch(updateSoundStatus(data, currUser, isSoundOn))
        } else setSelectedSound(soundObj.sound)

        if (!timeObj?.time) {
            setIsTimeLevelOn(false)
            setSelectedTime(60)
            dispatch(updateTime(data, currUser, 60))
            dispatch(updateTimeStatus(data, currUser, isTimeLevelOn))
        } else setSelectedTime(timeObj.time)

        if (!level) {
            setSelectedLevel(Object.values(levels)[0])
            dispatch(dispatch(updateLevel(data, currUser, selectedLevel)))
        } else setSelectedLevel(level)

        return () => {
            music.overworld.stop()
            falseAll()
        }
    }, [])

    const onUpdateLang = ({ target }) => {
        if (currLang === target.value) return
        else {
            i18n.changeLanguage(lngForChange(target.value))
            const { country, lang } = currUser?.game
            setCurrLang(target.value)
            var currC = gameService.tranCountry(target.value, country)
            dispatch(updateLang(data, currUser, target.value, currC))

        }
    }
    const lngForChange = (lng) => lng === 'English' ? 'en' : 'he'
    const onCloseCategory = () => setIsCategoryOpen(false)

    const onUpdate = async (key, value) => {
        const currUser = storageService.load('currUser')
        switch (key) {
            case 'soundStatus':
                setIsSoundOn(value)
                dispatch(updateSoundStatus(data, currUser, value))
                break
            case 'sound':
                setSelectedSound(value)
                dispatch(updateSound(data, currUser, value))
                break
            case 'timeStatus':
                setIsTimeLevelOn(value)
                dispatch(updateTimeStatus(data, currUser, value))
                break
            case 'time':
                setSelectedTime(value)
                dispatch(updateTime(data, currUser, value))
                break
            case 'level':
                setSelectedLevel({ ...value })
                dispatch(updateLevel(data, currUser, value))
                break
            case 'useQ':
                setUseQStatus(value)
                dispatch(updateUseQStatus(data, currUser, value))
                break
            default:
                break;
        }
    }
    const soundPlay = (ev, src, value) => {
        ev.stopPropagation()
        music.overworld.stop()
        checkCurrSound(src, value)
        music = { overworld: new Howl({ src }) }
        if (!music.overworld.playing()) music.overworld.play()
    }
    const checkCurrSound = (src, value) => {
        var fullTunesArr = falseAll()
        fullTunesArr.forEach(arr => arr.tunes.forEach(currSound => {
            if (currSound.s === src) currSound.isPlaying = value
        }))
        setTunesArr(fullTunesArr)
    }
    const falseAll = () => {
        var fullTunesArr = tunesArr.slice()
        fullTunesArr.forEach(arr => arr.tunes.forEach(t => t.isPlaying = false))
        console.log('fullTunesArr', fullTunesArr);
        return fullTunesArr
    }
    const soundStop = (ev, src, value) => {
        ev.stopPropagation()
        checkCurrSound(src, value)
        music.overworld.stop()
    }

    return (
        <React.Fragment>
            <section className="settings left-trans">
                <span className="span-children">{children}</span>

                <div className="categories">
                    <div>
                        <span><ClassIcon /></span>
                        <p>{lngs["sett-c"][lngForChange(currLang)]}</p>
                    </div>
                    <div className="to-category flex j-evenly a-center">
                        <p className="pa a-center flex ttc">{category?.name ? gameService.getCForDisplay(true, lang, category?.name) : <SignalCellularNoSimOutlinedIcon />}</p>
                        <DoubleArrowRoundedIcon onClick={() => setIsCategoryOpen(true)} />
                    </div>
                </div>
                <div className="levels">
                    <div>
                        <span><BarChartRoundedIcon /></span>
                        <p>{lngs["sett-l"][lngForChange(currLang)]}</p>
                    </div>
                    <div className="level-select flex j-between">
                        {levels.map((l, idx) => <div key={idx} onClick={() => onUpdate('level', l)} style={{ border: selectedLevel?.n === l.n && !isOnDesktop ? '2px solid black' : '', backgroundColor: l.c }}>
                            <p style={{ color: selectedLevel?.n === l.n ? 'black' : 'white' }}>{l.n}</p>
                        </div>)}
                    </div>
                </div>

                <div style={{ marginBottom: isSoundOn ? 0 : '3%', borderRadius: isSoundOn ? '5px 5px 0 0' : '5px' }}>
                    <div>
                        <span><VolumeUpRoundedIcon /></span>
                        <p>{lngs["sett-s"][lngForChange(currLang)]}</p>
                    </div>
                    <ToggleWrapper obj={{ value: isSoundOn, key: 'soundStatus' }} onUpdate={onUpdate} />
                </div>
                <div className={`sound-select ${isSoundOn ? 'open' : ''}`}>
                    <p className="selected-sound pa tas ma">{selectedSound?.n}</p>
                    {tunesArr.map((arr, idx) => <div key={idx}>
                        <p className="piano-p tac">{lngs[`sett-p-${arr.title}`][lngForChange(currLang)]}</p>
                        <div>
                            {arr.tunes.map((p, idx) => <div className="tune" key={idx} onClick={() => onUpdate('sound', p)} style={{ backgroundColor: selectedSound?.n === p.n ? '#ff9800' : '#e8eaed' }}>
                                {!p.isPlaying && <PlayCircleOutlineIcon onClick={(ev) => soundPlay(ev, p.s, true)} />}
                                {p.isPlaying && <PauseCircleOutlineIcon onClick={(ev) => soundStop(ev, p.s, false)} />}
                                <p>{p.n}</p>
                            </div>)}
                        </div>
                    </div>)}
                </div>

                <div style={{ marginBottom: isTimeLevelOn ? 0 : '3%', borderRadius: isTimeLevelOn ? '5px 5px 0 0' : '5px' }}>
                    <div>
                        <span><AccessAlarmRoundedIcon /></span>
                        <p>{lngs["sett-t"][lngForChange(currLang)]}</p>
                    </div>
                    <ToggleWrapper obj={{ value: isTimeLevelOn, key: 'timeStatus' }} onUpdate={onUpdate} />
                </div>
                <div className={`time-select flex j-between ${isTimeLevelOn ? 'open' : ''}`}>
                    {timeOps.map((t, idx) => <div key={idx} onClick={() => onUpdate('time', t)} style={{ backgroundColor: selectedTime === t ? '#ff9800' : !isOnDesktop ? 'white' : '#151515', boxShadow: selectedTime === t ? '' : '0px 7px 0 #80808014' }}>
                        <p>{t}</p>
                    </div>)}
                </div>

                <div>
                    <div>
                        <span><LanguageRoundedIcon /></span>
                        <p>{lngs["sett-lng"][lngForChange(currLang)]}</p>
                    </div>
                    <select name="languages" onChange={onUpdateLang}>
                        {languages.map((l, idx) => <option key={idx} style={{ backgroundColor: currLang === l ? 'orange' : 'white' }} value={l}>{l}</option>)}
                    </select>
                </div>

                <div>
                    <div>
                        <span><QuestionAnswerOutlinedIcon /></span>
                        <p>{lngs["sett-useQ"][lngForChange(currLang)]}</p>
                    </div>
                    <ToggleWrapper obj={{ value: useQStatus, key: 'useQ' }} onUpdate={onUpdate} />
                </div>

                <Logout data={data} logout={dispatch(logout)} history={history} />

            </section>
            <Category data={data} onClose={onCloseCategory} isOnDesktop={isOnDesktop} className={`category-section ${isCategoryOpen ? 'open' : ''}`} />
        </React.Fragment >
    );

}



