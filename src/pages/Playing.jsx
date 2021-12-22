import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Howl } from 'howler';
import { gameService } from '../services/gameService.js';

//cmps:
import { RoundIsFinished } from '../cmps/RoundIsFinished.jsx';
import { Timer } from '../cmps/Timer.jsx';
import { DynamicChildCmp } from '../cmps/DynamicChildCmp.jsx';
import { LoadCycle } from '../cmps/LoadCycle.jsx';

//functions:
import { updateRoundIdx, updateLevel, updateCategory } from '../store/actions/gameAction.js'
import { loadData } from '../store/actions/dataAction.js';
import { updatePointsObj } from '../store/actions/userAction.js'

//imgs:
import clock from '../assets/imgs/time.png'
import finish from '../assets/imgs/finish.png'
import round from '../assets/imgs/round.png'
import { storageService } from '../services/session-storage.js';


var music = {
    overworld: new Howl({ src: [''] })
}

class _Playing extends Component {

    state = {
        currUser: {},
        items: [],
        roundIndex: null,
        firstC: '',
        objIndex: 0,
        currL: {},
        q: '',
        answers: [],
        correctAns: '',
        correctCounter: 0,
        answersClass: 'come',
        countryQ: false,
        currCategory: '',
        currCountry: '',
        IndicationClass: 'indication-label flex',
        indicationClassObj: '',
        isSpliced: false,
        roundIsFinished: false,
        isTimeOver: false,
        isResetTime: false,
        isFinishLevel: false,
        roundFinishObj: '',
        isCategoryFinished: false,
        isLoadingQ: true
    }

    async componentDidMount() {

        await this.props.loadData()

        const { data, history } = this.props
        const currUser = storageService.load('currUser')
        if (!currUser?.nickname) history.push("/")
        const { items } = data
        const { soundObj, useQ, level, lang, roundIdx, category, country } = currUser?.game
        this.setState({ currUser })

        if (roundIdx === null) {
            this.setState({ roundIndex: 0 })
            await this.props.updateRoundIdx(data, currUser, 0)
        } else this.setState({ roundIndex: roundIdx })

        if (!level) this.props.updateLevel(data, currUser, { n: 'E', c: '#ff9800' })
        this.setState({
            currCategory: gameService.getCForDisplay(true, lang, category?.name),
            currCountry: country,
            currL: { ...level },
            firstC: lang === 'English' ? 'nature' : 'טבע',
            isCategoryFinished: false
        }, () => this.setState({ items: useQ ? this.spliceItems(items[lang], this.transObjArr(lang, currUser.objectsArray)) : items[lang] }))

        setTimeout(() => this.setState({ isLoadingQ: false }), 1200)

        if (soundObj.soundStatus) this.playMusic(true)
        this.startRound()
    }

    transObjArr = (lang, arr) => {
        var a = arr.map(obj => obj = {
            ...obj,
            c: gameService.getCForDisplay(obj.c.substr(0, 1) !== obj.c.substr(0, 1).toUpperCase(), lang, obj.c),
            object: lang === 'English' ? { ...obj.object } : {
                ...obj.object,
                correct_answer: obj.object.incorrect_answers.length > 2 ? obj.object.correct_answer : obj.object.correct_answer === 'True' ? 'נכון' : 'לא נכון',
                incorrect_answers: obj.object.incorrect_answers.length > 2 ? [...obj.object.incorrect_answers] : obj.object.incorrect_answers === ['True'] ? ['נכון'] : ['לא נכון']
            }
        })
        return a
    }

    componentWillUnmount() {
        music.overworld.stop()
    }

    playMusic = val => {
        const { soundStatus, sound } = this.state.currUser.game.soundObj
        music = { overworld: new Howl({ src: sound.s, loop: true, volume: 0.6 }) }
        if (soundStatus)
            if (val) {
                if (!music.overworld.playing()) music.overworld.play()
            } else music.overworld.fade(1, 0, 1000, music.overworld.play())
    }

    spliceItems = (items, objectsArray) => {
        let { firstC } = this.state
        var currLocation
        objectsArray.forEach((obj, idx) => {
            for (let location in items) {
                var objectLocation = (Object.keys(items[location]).some(k => k.toUpperCase() === firstC.toUpperCase())) ? items.categories : items.countries
                for (let currObjName in objectLocation) {
                    if (currObjName === obj.c) currLocation = objectLocation === items.categories ? objectLocation[currObjName][obj.level][this.state.roundIndex] : objectLocation[currObjName][obj.level]
                }
            }
            currLocation[idx] = obj.object
            currLocation[idx]["isSpliced"] = true
        })
        return items
    }

    startRound = () => {
        var { currCategory, items } = this.state
        this.setState({ correctCounter: 0 })
        this.getFullNextObject(currCategory, items.categories)
    }

    getFullNextObject = (objectName, objectLocation) => {

        setTimeout(() => {

            this.setState({ answersClass: 'come' })

            let { answers, objIndex } = this.state
            answers = this.objectAnswers(objectName, objectLocation).map(a => a = {
                txt: this.state.currUser.game?.lang === 'English' ? a.slice(0, 1).toUpperCase() + a.slice(1) : a,
                bgClr: 'white'
            })

            this.setState({
                q: this.currObject(objectName, objectLocation).question,
                answers,
                correctAns: this.correctAnswer(objectName, objectLocation),
                objIndex: objIndex === 10 ? 0 : objIndex + 1,
                isSpliced: this.checkSplice(objectName, objectLocation)
            }, () => {
                this.setState({
                    IndicationClass: this.state.isSpliced || this.state.objIndex === 10 ? 'indication-label flex show' : 'indication-label flex',
                    indicationClassObj: this.indicationClassObj,
                    roundFinishObj: this.roundFinishObj
                })
            })
        }, 500)
    }


    currObject = (objectName, objectLocation) => {
        let { roundIndex, objIndex, firstC, currL } = this.state
        const { n } = currL
        var currLocation
        for (let currObjName in objectLocation) {
            if (currObjName === objectName) currLocation = objectLocation[currObjName]
        }
        return Object.keys(objectLocation)[0] === firstC ? currLocation[n][roundIndex][objIndex] : currLocation[n][roundIndex]
    }

    correctAnswer = (objectName, objectLocation) => this.currObject(objectName, objectLocation).correct_answer

    objectAnswers = (objectName, objectLocation) => {
        let currQObject = this.currObject(objectName, objectLocation)
        return this.shuffleAnswers([currQObject.correct_answer, ...currQObject?.incorrect_answers])
    }

    checkSplice = (objectName, objectLocation) => this.currObject(objectName, objectLocation).isSpliced

    shuffleAnswers = arr => {
        var copyArr = arr.slice()
        var i, x, j
        for (i = copyArr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1))
            x = copyArr[i]
            copyArr[i] = copyArr[j]
            copyArr[j] = x
        }
        return copyArr
    }

    checkAnswer = async (ev, answer) => {
        ev.preventDefault()
        let { answers, objIndex, correctCounter, items, correctAns, currCategory, currCountry } = this.state
        var currUser = storageService.load('currUser')
        const { data } = this.props
        const { pointsObj, game } = currUser
        const { level } = game

        var timeOut = 200

        let currAnswerIdx = answers.findIndex(currAns => currAns === answer)
        let { bgClr } = answers[currAnswerIdx]
        if (answer.txt === correctAns) {
            bgClr = '#47bd47d1'
            this.setState({ correctCounter: correctCounter + 1, countryQ: objIndex === 10 },
                async () => {
                    let objectLocation = this.state.countryQ ? pointsObj.countries : pointsObj.categories
                    let isCategoryObject = !this.state.countryQ
                    await this.props.updatePointsObj(data, currUser, this.calcPointsObj(pointsObj.fullPoints + (this.state.countryQ ? 15 : 10), objectLocation, isCategoryObject))
                })
        } else {
            bgClr = '#ff3737c2'
            timeOut += 1000
            setTimeout(() => {
                let currCorrectAnsIdx = answers.findIndex(ans => ans.txt.toLowerCase() === correctAns.toLowerCase())
                answers[currCorrectAnsIdx].bgClr = '#47bd47d1'
                this.setState({ answers })
            }, 500)
        }

        answers[currAnswerIdx].bgClr = bgClr
        this.setState({ answers })

        if (objIndex === 10) setTimeout(() => this.setState({ roundIsFinished: true, isCategoryFinished: level.n === 'H' }), timeOut + 100)
        else {
            let objectLocation = objIndex === 9 ? items.countries : items.categories
            let objectName = objIndex === 9 ? currCountry : currCategory.toLowerCase()
            setTimeout(() => this.setState({ answersClass: 'leave' }), timeOut)
            setTimeout(() => this.getFullNextObject(objectName, objectLocation), timeOut + 100)
        }
    }

    calcPointsObj = (fullPoints, objectLocation, isCategoryObject) => {
        var { currCategory, currCountry, currUser, currL } = this.state
        const { pointsObj, game } = currUser
        const { level, lang } = game
        var copyPointsObj = pointsObj
        const objectName = lang === 'English' ? isCategoryObject ? currCategory.toLowerCase() : currCountry : gameService.transToEn(isCategoryObject, currCategory, currCountry)
        for (let currObject in objectLocation) {
            if (currObject === objectName) objectLocation[currObject][currL.n] += isCategoryObject ? 10 : 15
        }
        copyPointsObj.fullPoints = fullPoints
        return copyPointsObj
    }

    onTimeIsOver = () => this.setState({ roundIsFinished: true, isTimeOver: true })

    continue = async (v, status) => {
        const { data, updateRoundIdx, updateLevel } = this.props
        let { roundIndex } = this.state
        let user = storageService.load('currUser')
        this.setState({ currUser: { ...user } })
        setTimeout(() => this.setState({ roundIsFinished: false, isResetTime: true }), 400)

        switch (status) {
            case 'round':
                await updateRoundIdx(data, user, roundIndex + 1)
                this.setState({ roundIndex: roundIndex + 1, objIndex: 0 }, v ? this.startRound() : '')
                break
            case 'finish':
                await updateRoundIdx(data, user, 0)
                let _user = storageService.load('currUser')
                await updateLevel(data, _user, this.levelForUpdate)
                this.finishLevel()
                this.setState({ objIndex: 0 }, () => v ? this.startRound() : '')
                break
            default:
                this.setState({ objIndex: 0 }, () => v ? this.startRound() : '')
                break
        }

    }

    finishLevel = () => {
        const { data } = this.props
        let user = storageService.load('currUser')
        if (this.levelForUpdate.n !== 'E') this.setState({ currL: { ...this.levelForUpdate } })
        else this.finishCategory(data, user, gameService.getNextCategory(this.state.currCategory, user.game?.lang))
        this.setState({ currUser: { ...user }, isFinishLevel: true, roundIndex: 0 })
    }


    get levelForUpdate() {
        let { level } = this.state.currUser?.game
        switch (level.n) {
            case 'E': return { n: 'M', c: '#FF5733' }
            case 'M': return { n: 'H', c: '#E92337' }
            case 'H': return { n: 'E', c: '#ff9800' }
            default: return level
        }
    }

    finishCategory = async (data, currUser, nextCategory) => {
        this.setState({ isCategoryFinished: true, currCategory: { ...nextCategory } })
        await this.props.updateCategory(data, currUser, nextCategory)
    }
    onTurnResetTimeOff = () => this.setState({ isResetTime: false })

    get roundFinishObj() {
        var { objIndex, roundIndex, currUser } = this.state
        var isEn = currUser.game.lang === 'English'

        if (objIndex === 10) {
            if (roundIndex === 9) return isEn ? {
                status: 'finish',
                largeTxt: 'level completed!',
                littleTxt: 'congratulations!',
                continueTxt: 'next level'
            } : {
                status: 'finish',
                largeTxt: 'סיימת שלב!',
                littleTxt: 'מזל טוב!',
                continueTxt: 'שלב הבא'
            }
            else return isEn ? {
                status: 'round',
                largeTxt: 'round completed',
                littleTxt: 'Let\'s see your results',
                continueTxt: 'next round'
            } : {
                status: 'round',
                largeTxt: 'סיימת סיבוב!',
                littleTxt: 'התוצאות שלך',
                continueTxt: 'הסיבוב הבא'
            }
        } else return isEn ? {
            status: 'time',
            largeTxt: 'time is over...',
            littleTxt: 'Better luck next time!',
            continueTxt: 'try again'
        } : {
            status: 'time',
            largeTxt: 'נגמר הזמן...',
            littleTxt: 'בהצלחה בפעם הבאה!',
            continueTxt: 'נסה/י שוב'
        }
    }

    get indicationClassObj() {
        var isEn = this.state.currUser.game.lang === 'English'
        var { isSpliced, objIndex } = this.state
        if (isSpliced) var finalObj = { c: objIndex === 10 ? '#e96b3c' : '#937c37', txt: isEn ? 'Your Question' : 'השאלה שלך', status: true }
        else if (objIndex === 10) finalObj = { c: '#6a6a6a', txt: isEn ? 'Country Question' : 'שאלת מדינה', status: false }
        return finalObj
    }

    get qForDisplay() {
        const { q, answers, currUser } = this.state
        return answers.length > 2 ? currUser?.game.lang === 'English' ? q + '?' : window.screen.width > 500 && q.length < 40 ? '?' + q : q : q
    }

    ansLength = () => this.state.answers.some(ans => ans.txt.length > 50)

    render() {
        const { data } = this.props
        const { currL, answers, currUser, objIndex, roundIsFinished, roundIndex, IndicationClass, isResetTime, indicationClassObj, roundFinishObj, isCategoryFinished, countryQ, correctCounter, answersClass, currCountry, isLoadingQ } = this.state
        const { pointsObj, game } = currUser
        const category = currUser?.game?.category
        const level = currUser?.game?.level
        const timeObj = currUser?.game?.timeObj
        const lang = currUser?.game?.lang
        const isOnDesktop = window.screen.height >= 800
        if (!this.state || !currUser) return <LoadCycle width="30%" height="30%" top="30%" />
        return (
            <React.Fragment>

                <section className="playing" style={{ fontFamily: lang === 'English' ? 'montserrat' : 'sans-serif' }}>

                    <header className="flex j-between">
                        <div><p>{`${objIndex}/10`}</p></div>

                        {timeObj?.timeStatus && !isLoadingQ && <Timer time={timeObj?.time} timeIsOver={this.onTimeIsOver} roundIsFinished={roundIsFinished} isResetTime={isResetTime} turnResetTimeOff={this.onTurnResetTimeOff} />}

                        {!isLoadingQ && <Link to={`/${window.screen.width < 500 ? 'settings' : 'about'}`}> <div style={{ backgroundColor: currL?.c }}>
                            <img src={category?.src} alt="" />
                            <p>{currL?.n}</p>
                        </div>
                        </Link>}
                    </header>

                    <div className="main-container" style={{ fontFamily: lang === 'English' ? 'montserrat' : 'sans-serif' }}>
                        <div className="q flex j-center">
                            <div style={{ backgroundColor: indicationClassObj?.c, flexDirection: lang === 'English' ? 'row' : 'row-reverse' }} className={IndicationClass}>
                                <p>{indicationClassObj?.txt}</p>
                                {!indicationClassObj?.status && <p>{currCountry}</p>}
                            </div>
                            {isLoadingQ && <LoadCycle width="40%" height="20%" top="50%" />}
                            {!isLoadingQ && <p>{this.qForDisplay}</p>}
                        </div>
                        <div className={`options ${answersClass}`}>
                            {answers.map((ans, idx) => <div key={idx} onClick={(ev) => this.checkAnswer(ev, ans)} style={{ backgroundColor: ans.bgClr, padding: ans.txt.length > 50 ? '3%' : '5%', fontSize: this.ansLength() || ans.txt.length > 50 ? 'smaller' : 'unset' }}>{ans.txt}</div>)}
                        </div>
                    </div>
                    <div className="backImgs">
                        <img src={finish} alt="" />
                        <img src={clock} alt="" />
                        <img src={round} alt="" />
                        <img src={round} alt="" />
                        <img src={finish} alt="" />
                    </div>
                    <div className={`back-shadow ${roundIsFinished ? 'dark' : ''}`} ></div>
                </section>

                <RoundIsFinished lang={lang} currRound={roundIndex} className={`roundIsFinished ${roundIsFinished ? 'show' : ''}`} roundIsFinished={roundIsFinished} points={pointsObj?.fullPoints} countryQ={countryQ} correctCounter={correctCounter}>
                    <DynamicChildCmp lang={lang} continue={this.continue} roundFinishObj={roundFinishObj} isCategoryFinished={isCategoryFinished} />
                </RoundIsFinished>

            </React.Fragment >
        )
    }
}


const mapStateToProps = state => {
    return {
        data: state.dataModule.data
    }
}
const mapDispatchToProps = {
    loadData,
    updatePointsObj,
    updateRoundIdx,
    updateLevel,
    updateCategory
}
export const Playing = connect(mapStateToProps, mapDispatchToProps)(_Playing)