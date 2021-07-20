import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

//icons:
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

import CloseRoundedIcon from '@material-ui/icons/CloseRounded'

import { updateCategory } from '../store/actions/gameAction.js'
import { storageService } from '../services/session-storage';

export const _Category = ({ isOnDesktop, data, onClose, className, updateCategory }) => {

    const categoriesSrc = [nature, geography, animals, personalities, movies, medicine, food, sports, music, science, technology]
    const categoriesNamesEnglish = ['nature', 'geography', 'animals', 'personalities', 'movies', 'medicine', 'food', 'sports', 'music', 'science', 'technology']
    const categoriesNamesHebrew = ['טבע', 'גיאוגרפיה', 'בעלי חיים', 'אנשים', 'סרטים', 'רפואה', 'אוכל', 'ספורט', 'מוזיקה', 'מדע', 'טכנולוגיה']
    const [currUser, setCurrUser] = useState({})
    const [currCategory, setCategory] = useState('')
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const user = storageService.load('currUser')
        const { category } = user?.game
        let categories = categoriesSrc.map((c, idx) => c = { name: categoriesNamesEnglish[idx].toUpperCase(), src: c })
        setCategory(category)
        setCurrUser({ ...user })
        setCategories(categories)
    }, [])

    const selectCategory = async (ev, currCategory) => {
        ev.preventDefault()
        ev.stopPropagation()
        setCategory({ ...currCategory })
        await updateCategory(data, currUser, currCategory)
    }

    const categoriesForDisplay = () => {
        const lang = currUser?.game?.lang
        let currArr = lang === 'English' ? categoriesNamesEnglish : categoriesNamesHebrew
        var arr = lang === 'English' ? categoriesNamesHebrew : categoriesNamesEnglish
        var category = currArr[arr.findIndex(c => c === currCategory.name)]
        return [category, currArr]
    }
    var categoryForDisplay = categoriesForDisplay()[0] ? categoriesForDisplay()[0] : currUser?.game?.category
    var isEn = currUser?.game?.lang === 'English' ? true : false
    return (
        <section className={className}>
            <header className="j-between tas">
                <div className="category j-between" style={{ direction: isEn ? 'ltr' : 'rtl' }}>
                    <p style={{ fontFamily: isEn ? 'montserrat' : 'sans-serif' }}>{isEn ? 'Category' : 'קטגוריה'}</p>
                    <img src={currCategory ? currCategory?.src : categoryForDisplay?.src} alt="" />
                </div>
                <div className="start" onClick={onClose}>
                    <p><CloseRoundedIcon /></p>
                </div>
            </header>
            <div className="categories grid">
                {categories.map((c, idx) => <div onClick={(ev) => selectCategory(ev, c)} key={idx} style={{ fontSize: c.name.length >= 10 ? '14px' : '', backgroundColor: currCategory.name === c.name ? '#ff7629' : !isOnDesktop ? 'white' : '#cacaca', boxShadow: currCategory.name === c.name ? '' : '0px 5px 0 #80808014' }}>
                    <img src={c.src} alt="" />
                    <p>{categoriesForDisplay()[1][idx]}</p>
                </div>)}
            </div>
        </section>
    );

}

const mapDispatchToProps = {
    updateCategory
}
export const Category = connect(null, mapDispatchToProps)(_Category)

