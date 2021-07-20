import React, { Component } from 'react';
import { loadData } from '../store/actions/dataAction.js'
import { connect } from 'react-redux'


//states:
import argentina from '../assets/flags/argentina.png'
import australia from '../assets/flags/australia.png'
import austria from '../assets/flags/austria.png'
import belgium from '../assets/flags/belgium.png'
import brazil from '../assets/flags/brazil.png'
import canada from '../assets/flags/canada.png'
import china from '../assets/flags/china.png'
import colombia from '../assets/flags/colombia.png'
import denmark from '../assets/flags/denmark.png'
import england from '../assets/flags/england.png'
import ethiopia from '../assets/flags/ethiopia.png'
import finland from '../assets/flags/finland.png'
import france from '../assets/flags/france.png'
import germany from '../assets/flags/germany.png'
import india from '../assets/flags/india.png'
import israel from '../assets/flags/israel.png'
import italy from '../assets/flags/italy.png'
import japan from '../assets/flags/japan.png'
import mexico from '../assets/flags/mexico.png'
import morocco from '../assets/flags/morocco.png'
import philippines from '../assets/flags/philippines.png'
import poland from '../assets/flags/poland.png'
import portugal from '../assets/flags/portugal.png'
import romania from '../assets/flags/romania.png'
import russia from '../assets/flags/russia.png'
import spain from '../assets/flags/spain.png'
import sweden from '../assets/flags/sweden.png'
import switzerland from '../assets/flags/switzerland.png'
import thailand from '../assets/flags/thailand.png'
import ukraine from '../assets/flags/ukraine.png'
import usa from '../assets/flags/usa.png'

//categories:
import nature from '../assets/imgs/categories/nature-c.png'
import animals from '../assets/imgs/categories/animals-c.png'
import food from '../assets/imgs/categories/food-c.png'
import geography from '../assets/imgs/categories/geography-c.png'
import medicine from '../assets/imgs/categories/medicine-c.png'
import movies from '../assets/imgs/categories/movies-c.png'
import personalities from '../assets/imgs/categories/personalities-c.png'
import science from '../assets/imgs/categories/science-c.png'
import music from '../assets/imgs/categories/music-c.png'
import technology from '../assets/imgs/categories/technology-c.png'
import sports from '../assets/imgs/categories/sports-c.png'

import { StatModal } from './StatModal';

class _StatCmp extends Component {

    state = {
        states: [
            {
                title: 'categories',
                arr: [
                    { s: nature, n: 'nature' }, { s: geography, n: 'geography' }, { s: animals, n: 'animals' }, { s: personalities, n: 'personalities' }, { s: movies, n: 'movies' }, { s: medicine, n: 'medicine' }, { s: food, n: 'food' }, { s: sports, n: 'sports' }, { s: music, n: 'music' }, { s: science, n: 'science' }, { s: technology, n: 'technology' }
                ]
            },
            {
                title: 'countries',
                arr: [{ s: argentina, n: 'Argentina' }, { s: australia, n: 'Australia' }, { s: austria, n: 'Austria' }, { s: belgium, n: 'Belgium' }, { s: brazil, n: 'Brazil' }, { s: canada, n: 'Canada' }, { s: china, n: 'China' }, { s: colombia, n: 'Colombia' }, { s: denmark, n: 'Denmark' }, { s: england, n: 'England' }, { s: ethiopia, n: 'Ethiopia' }, { s: finland, n: 'Finland' }, { s: france, n: 'France' }, { s: germany, n: 'Germany' }, { s: india, n: 'India' }, { s: israel, n: 'Israel' }, { s: italy, n: 'Italy' }, { s: japan, n: 'Japan' }, { s: mexico, n: 'Mexico' }, { s: morocco, n: 'Morocco' }, { s: philippines, n: 'Philippines' }, { s: poland, n: 'Poland' }, { s: portugal, n: 'Portugal' }, { s: romania, n: 'Romania' }, { s: russia, n: 'Russia' }, { s: spain, n: 'Spain' }, { s: sweden, n: 'Sweden' }, { s: switzerland, n: 'Switzerland' }, { s: thailand, n: 'Thailand' }, { s: ukraine, n: 'Ukraine' }, { s: usa, n: 'USA' }]
            }
        ],
        forTrans: [
            ['טבע', 'גיאוגרפיה', 'בעלי חיים', 'אנשים', 'סרטים', 'רפואה', 'אוכל', 'ספורט', 'מוזיקה', 'מדע', 'טכנולוגיה'],
            ['ארגנטינה', 'אוסטרליה', 'אוסטריה', 'בלגיה', 'ברזיל', 'קנדה', 'סין', 'קולומביה', 'גנמרק', 'אנגליה', 'אתיופיה', 'פינלנד', 'צרפת', 'גרמניה', 'הודו', 'ישראל', 'איטליה', 'יפן', 'מקסיקו', 'מרוקו', 'פיליפינים', 'פולין', 'פורטוגל', 'רומניה', 'רוסיה', 'ספרד', 'שוודיה', 'שווייץ', 'תאילנד', 'אוקראינה', 'ארצות הברית'],
            ['nature', 'geography', 'animals', 'personalities', 'movies', 'medicine', 'food', 'sports', 'music', 'science', 'technology'],
            ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'China', 'Colombia', 'Denmark', 'England', 'Ethiopia', 'Finland', 'France', 'Germany', 'India', 'Israel', 'Italy', 'Japan', 'Mexico', 'Morocco', 'Philippines', 'Poland', 'Portugal', 'Romania', 'Russia', 'Spain', 'Sweden', 'Switzerland', 'Thailand', 'Ukraine', 'USA']

        ],
        currVal: '',
        isModalOpen: false,
        currObj: '',
        cData: '',
        options: ''
    }

    get statesForDisplay() {
        var { forTrans, states } = this.state
        var { lang } = this.props.currUser.game

        var transArr = []
        let copyStates = states.slice()
        copyStates.forEach((state, idx) => {
            state.title = lang === 'English' ? idx === 0 ? 'categories' : 'countries' : idx === 0 ? 'קטגוריות' : 'ארצות'
            state.arr.forEach((obj, index) => {
                obj.n = lang === 'English' ? forTrans[idx === 0 ? 2 : 3][index] : forTrans[idx === 0 ? 0 : 1][index]
            })
            transArr.push(state)
        })

        return transArr

    }

    openModal = (index, c, title, idx) => {
        const { lang } = this.props.currUser?.game
        this.setState({ isModalOpen: true, currVal: title })
        this.getLevelsPoints(this.getCurrObj(this.transC(index, c, idx, lang), this.transT(index)))
    }

    transC = (index, c, idx, lang) => {
        const { forTrans } = this.state
        return lang === 'English' ? c : forTrans[index === 0 ? 2 : 3][idx]
    }

    transT = (index) => index === 0 ? "categories" : "countries"

    getCurrObj = (n, title) => {
        return this.props.pointsObj[title][n]
    }
    getMaxForDispaly = () => this.state.currVal === "categories" || "קטגוריות" ? 900 : 150

    getLevelsPoints = (currObj) => {
        var isEn = this.props.currUser.game.lang === 'English' ? true : false
        this.setState({ currObj }, () => {
            const colors = ['rgb(255, 152, 0,0.7)', 'rgb(255,87,51,0.9)', 'rgb(233, 35, 55,0.9)']
            const cData = {
                labels: isEn ? ['Easy', 'Medium', 'Hard'] : ['קל', 'בינוני', 'קשה'],
                datasets: [{
                    data: Object.values(this.state.currObj),
                    label: isEn ? 'Points' : "מס' נקודות",
                    backgroundColor: [...colors],
                    hoverBackgroundColor: [...colors]
                }]
            }
            const options = {
                scales: {
                    y: {
                        suggestedMin: 0,
                        suggestedMax: this.getMaxForDispaly()
                    }
                }
            }
            this.setState({ cData, options })
        })
    }

    onCloseModal = () => this.setState({ isModalOpen: false })


    render() {
        const { states, isModalOpen, cData, options } = this.state
        const finalStates = this.statesForDisplay
        const { lang } = this.props.currUser.game
        var isEn = lang === 'English' ? true : false
        return (
            <section className="stat-cmp pa" style={{ fontFamily: isEn ? 'montserrat' : 'sans-serif' }}>
                <div className={`dark-div ${isModalOpen ? 'show' : ''}`}></div>
                <h2>{isEn ? 'choose a type for its statistic' : 'בחר/י סוג קטגוריה'}</h2>
                <section className="c-section flex column tac" style={{ opacity: isModalOpen ? 0 : 1 }}>
                    {finalStates?.map((s, index) => <div className="arr-div" key={index}>
                        <h3>{s.title}</h3>
                        <div className="c-div flex">
                            {s.arr.map((c, idx) => <div onClick={() => this.openModal(index, c.n, s.title, idx)} className="c" key={idx}>
                                <img src={c.s} alt="" />
                                <p style={{ fontSize: c.n.length >= 8 ? 'small' : 'medium', bottom: '7%' }}>{c.n}</p>
                            </div>)}
                            <span className="c flex column" style={{ opacity: 0 }}>
                                <img src="" alt="" />
                                <p></p>
                            </span>
                        </div>
                    </div>)}
                </section>
                <StatModal lang={lang} className={`stat-modal ${isModalOpen ? 'show' : ''}`} data={cData} options={options} closeModal={this.onCloseModal} />
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
    loadData
}
export const StatCmp = connect(mapStateToProps, mapDispatchToProps)(_StatCmp)