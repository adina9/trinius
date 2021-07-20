import React, { Component } from 'react';
import { connect } from 'react-redux'

//icons:
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import BookRoundedIcon from '@material-ui/icons/BookRounded';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import CheckIcon from '@material-ui/icons/Check';

//functions:
import { addQuestion } from '../store/actions/userAction.js'
import { loadData } from '../store/actions/dataAction.js';

//imgs:
import incomplete from '../assets/imgs/incomplete.png'
import { gameService } from '../services/gameService.js';
import { LoadCycle } from '../cmps/LoadCycle.jsx';
import { storageService } from '../services/session-storage.js';

class _Adding extends Component {

    state = {
        currUser: {},
        optional: [
            { txt: 'Write your question', min: 10, max: 120, name: 'q', value: '' },
            { txt: 'The correct answer', min: 1, max: 30, name: 'correctAns', value: '' },
            { txt: 'Wrong answer 1', min: 1, max: 30, name: 'wrong1', value: '' },
            { txt: 'Wrong answer 2', min: 1, max: 30, name: 'wrong2', value: '' },
            { txt: 'Wrong answer 3', min: 1, max: 30, name: 'wrong3', value: '' }
        ],
        tf: [
            { txt: 'Write your statement', min: 10, max: 120, name: 'q', value: '' },
            { correct: '' },
            { fillTxt: 'True', c: '#47bd47d1', lightC: '#1bb81b57' },
            { fillTxt: 'False', c: '#ff3737c2', lightC: '#ff000029' }
        ],
        isOptional: false,
        isTF: true,
        currArray: [],
        cArr: [
            {
                txt: 'Categories',
                isOpen: false,
                arr: ['nature', 'geography', 'animals', 'personalities', 'movies', 'medicine', 'food', 'sports', 'music', 'science', 'technology']
            },
            {
                txt: 'Countries',
                isOpen: false,
                arr: ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'China', 'Colombia', 'Denmark', 'England', 'Ethiopia', 'Finland', 'France', 'Germany', 'India', 'Israel', 'Italy', 'Japan', 'Mexico', 'Morocco', 'Philippines', 'Poland', 'Portugal', 'Romania', 'Russia', 'Spain', 'Sweden', 'Switzerland', 'Thailand', 'Ukraine', 'USA']
            }
        ],
        currCArr: [],
        levels: [
            { n: 'E', c: '#ff9800', lightC: '#ff98002e' },
            { n: 'M', c: '#FF5733', lightC: '#ff573324' },
            { n: 'H', c: '#E92337', lightC: '#f0707d2b' }
        ],
        final: {
            object: {
                question: '',
                correct_answer: '',
                incorrect_answers: []
            },
            level: '',
            c: ''
        },
        finalInArray: [],
        isFinishClicked: false,
        isAllCompolete: false,
        isLoadingFinal: false,
        isInappropriate: false,
        isDone: false
    }

    async componentDidMount() {
        await this.props.loadData()
        const { data, history } = this.props
        const currUser = storageService.load('currUser')
        this.setState({ currUser })
        if (!currUser?.nickname) history.push("/")
        this.reUpdateCurrArray()
    }

    reUpdateCurrArray = () => {
        let { isOptional, optional, tf } = this.state
        this.setState({ currArray: isOptional ? optional : tf })
    }

    onChangeInput = ({ target }) => {
        let { currArray } = this.state
        let currInputIdx = currArray.findIndex(obj => obj.name === target.name)
        currArray[currInputIdx].value = target.value
        this.setState({ currArray })
    }

    chooseTF = (fillTxt) => {
        let { tf } = this.state
        tf[1].correct = fillTxt
        this.setState({ tf })
    }

    toggleC = (idx) => {
        let { cArr } = this.state
        cArr[idx].isOpen = !cArr[idx].isOpen
        this.setState({ cArr })
    }

    updateFinal = (value) => {
        let { final } = this.state
        if (value.length > 1) final.c = value
        else final.level = value
        this.setState({ final })
    }

    finish = (ev) => {
        ev.preventDefault()
        let { currArray, final, tf } = this.state
        let finalObj = {
            object: {
                question: currArray[0].value,
                correct_answer: currArray === tf ? currArray[1].correct : currArray[1].value,
                incorrect_answers: currArray === tf ? currArray[1].correct === 'True' ? ['False'] : ['True'] : [currArray[2].value, currArray[3].value, currArray[4].value]
            },
            level: final.level,
            c: final.c
        }
        this.setState({ final: finalObj, isFinishClicked: true }, () => this.setState({ isAllCompolete: this.checkComplete() }))
    }

    checkComplete = () => {
        let { final } = this.state
        let finalInArray = [final.level, final.c]
        for (let key in final.object) {
            if (typeof final.object[key] === 'object') final.object[key].forEach(v => finalInArray.push(v))
            else finalInArray.push(final.object[key])
        }
        this.setState({ finalInArray })
        var incomplete = finalInArray.some(value => value === '')
        return !incomplete
    }

    get levelForDisplay() {
        let { level } = this.state.final
        switch (level) {
            case 'E': return 'Easy'
            case 'M': return 'Medium'
            case 'H': return 'Hard'
            default:
                return 'Easy'
        }
    }

    onUploadQuestion = (ev) => {
        ev.preventDefault()
        this.setState({ isLoadingFinal: true })
        let isInappropriate = this.checkFinal()

        setTimeout(async () => {
            const { currUser, final } = this.state
            if (!isInappropriate) {
                await this.props.addQuestion(this.props.data, currUser, final)
                setTimeout(() => this.clear(), 3000)
            }
            this.setState({ isLoadingFinal: false, isDone: true })
        }, 2500)
    }

    clear = () => {
        var clearedArr = []
        this.state.currArray.forEach(obj => {
            Object.keys(obj).forEach(k => {
                if (k === "value" || k === "correct") obj[k] = ''
            })
            clearedArr.push(obj)
        })
        this.setState({
            currArray: clearedArr,
            final: {
                object: {
                    question: '',
                    correct_answer: '',
                    incorrect_answers: []
                },
                level: '',
                c: ''
            },
            isDone: false,
            isFinishClicked: false
        })
        this.reUpdateCurrArray()
    }

    checkFinal = () => {
        let { finalInArray } = this.state
        let inappropriateArr = ['Curse', 'Slot', 'Whore', 'bitch', 'Harassment', 'Harass', 'Whore', 'Fuck', 'Fucked', 'Fucking', 'Dumb', 'Retarded', 'Stinking', 'Dick', 'Shit']

        const finalSplitted = []
        const splitted = finalInArray.map(v => v.split(" "))
        splitted.forEach(s => finalSplitted.push(...s))

        var isInappropriate
        var counter = 0
        let isDuplicate = false

        inappropriateArr.forEach(i => finalSplitted.forEach(f => {
            if (f === i || f === i.toUpperCase() || f === i.toLowerCase()) counter++
        }))
        isDuplicate = finalInArray.some((f, idx) => finalInArray.indexOf(f) !== idx)
        isInappropriate = counter === 0 && !isDuplicate ? false : true
        this.setState({ isInappropriate })
        return isInappropriate
    }

    txtForDisplay = () => gameService.setAddingTxt(this.state.currUser?.game?.lang)

    render() {
        const { optional, tf, isOptional, isTF, currArray, levels, final, isFinishClicked, isAllCompolete, isLoadingFinal, isInappropriate, isDone, cArr } = this.state
        const sOrQ = this.props?.game?.lang === 'English' ? currArray === tf ? 'statement' : 'question' : currArray === tf ? 'קביעה' : 'שאלה'
        const txt = this.txtForDisplay()
        return (

            <section className="adding pa">
                <header className="flex j-evenly">
                    <p onClick={() => this.setState({ isOptional: true, isTF: false, currArray: optional })} style={isOptional ? { color: 'black', fontWeight: 'bold', textShadow: '1px -1px 2px white' } : { color: 'white', fontWeight: 100 }}>{txt.add_mult}</p>
                    <p onClick={() => this.setState({ isOptional: false, isTF: true, currArray: tf })} style={isTF ? { color: 'black', fontWeight: 'bold', textShadow: '1px -1px 2px white' } : { color: 'white', fontWeight: 100 }}>{txt.add_tf}</p>
                </header>
                <form >
                    {currArray.map((obj, idx) => <div className={`add-${idx}`} key={idx}>
                        <div className="top flex j-between">
                            {obj.txt && <p>{obj.txt}</p>}
                            {obj.max && <p>{`${obj.min}/${obj.max}`}</p>}
                        </div>
                        {currArray[idx].name && <textarea placeholder={idx === 0 && currArray !== tf ? 'Is The...' : ''} minLength={currArray[idx].min} maxLength={currArray[idx].max} value={currArray[idx].value} name={currArray[idx].name} required autoComplete="off" onChange={this.onChangeInput} />}
                    </div>)}
                    {currArray === tf && <div className="tf flex j-between">
                        {[tf[2], tf[3]].map((obj, idx) => <div style={currArray[1].correct !== obj.fillTxt ? { boxShadow: `0 5px 3px ${obj.lightC}`, color: 'white', backgroundColor: obj.c } : { border: '1px solid black', color: 'black', backgroundColor: obj.c }} key={idx} onClick={() => this.chooseTF(obj.fillTxt)}>
                            <p>{obj.fillTxt}</p>
                        </div>)}
                        <p className="tf-desc pf ttc">{txt.add_desc}</p>
                    </div>}
                    <div className="c-or-c">
                        {cArr.map((c, idx) => < div onClick={() => this.toggleC(idx)} key={idx}>
                            <p>{c.txt}</p>
                            <p className="selected" style={{ color: '#ff7629', position: 'absolute' }}>{c.arr.includes(final.c) ? final.c : ''}</p>
                            <div className="cClass">
                                {c.arr.map((val, idx) => <p onClick={() => this.updateFinal(val)} style={{ color: final.c === val ? '#ff7629' : '' }} key={idx}>{val}</p>)}
                            </div>
                        </div>)}
                    </div>
                    <div className="or tac ttc" style={{ fontSize: 'x-large', marginTop: '1%' }}>{txt.add_or}</div>

                    <div className="levels">
                        <p>{txt.add_choose_l}</p>
                        <div className="flex j-between">
                            {levels.map((l, idx) => <div className="level flex j-center tac" onClick={() => this.updateFinal(l.n)} key={idx} style={final.level === l.n ? { color: 'white', backgroundColor: l.c } : { color: l.c, boxShadow: '0 4px 2px' + l.lightC }}>
                                <p>{l.n}</p>
                            </div>)}
                        </div>
                    </div>
                    <div onClick={(ev) => this.finish(ev)} className="finish-btn flex tac">
                        <p className="ma">{txt.add_finish}</p>
                    </div>
                </form>
                <div className={`finish-modal ${isFinishClicked ? 'open' : ''}`} style={window.screen.height < 1000 ? { height: currArray === tf ? '85vw' : '50vh' } : {}}>
                    <p>{txt.add_the + sOrQ}</p>
                    {!isLoadingFinal && !isInappropriate && !isDone && <CloseRoundedIcon onClick={() => this.setState({ isFinishClicked: false, isLoadingFinal: false, isInappropriate: false })} />}
                    <div className="incomplete flex column a-center pa" style={{ display: isAllCompolete ? 'none' : 'flex' }}>
                        <p>{txt.add_com + sOrQ}</p>
                        <img src={incomplete} alt="" />
                    </div>
                    {isAllCompolete && !isLoadingFinal && !isDone && <div>
                        <div className="q"><textarea readOnly value={final.object.question} /></div>
                        <div className="answers grid">
                            {[final.object.correct_answer, ...final.object.incorrect_answers].map((ans, idx) => <div key={idx}>
                                <textarea readOnly value={ans} style={{ border: idx === 0 ? '2px solid black' : '' }} />
                            </div>)}
                        </div>
                        <div className="more flex j-between">
                            <p><BookRoundedIcon />{final.c}</p>
                            <p>< AssessmentRoundedIcon />{this.levelForDisplay}</p>
                        </div>
                        <div className="submit flex a-center j-center pa" style={{ marginTop: currArray === tf ? '1%' : '5%' }} onClick={(ev) => this.onUploadQuestion(ev)}>
                            <p className="ma">{txt.add_done}</p>
                        </div>
                    </div>}
                    {isAllCompolete && isLoadingFinal && <div className="loading flex j-center">
                        <LoadCycle width="30%" height="30%" top="30%" />
                        <small>{`${txt.add_check + sOrQ}. ${txt.add_check_II}`}</small>
                    </div>}
                    {isDone && isInappropriate && <div className="inappropriate">
                        <p>{txt.add_sorry + sOrQ + txt.add_sorry_II}</p>
                        <div className="flex j-center a-center ma" onClick={() => this.setState({ isFinishClicked: false, isDone: false, isAllCompolete: false, isLoadingFinal: false, isInappropriate: false })}>{txt.add_fix}</div>
                    </div>}
                    {isDone && !isInappropriate && <div className="done tac pr">
                        <span>{txt.add_congrats}</span>
                        {txt.add_the + sOrQ + ' ' + txt.add_congrats_III}
                        <div className="success-checkmark flex j-center pa"><CheckIcon /></div>
                    </div>}
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
    addQuestion,
}
export const Adding = connect(mapStateToProps, mapDispatchToProps)(_Adding)