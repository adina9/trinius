import { httpService } from "./httpService"

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


export const gameService = {
    // loadGame,
    updateCategory,
    updateCountry,
    updateSoundStatus,
    updateSound,
    updateLang,
    updateTime,
    updateTimeStatus,
    updateLevel,
    updateRoundIdx,
    updateUseQStatus,
    updateGame,
    getCForDisplay,
    tranCountry,
    setSettLngs,
    setAddingTxt,
    transToEn,
    getNextCategory
}

async function updateGame(data, game) {
    try {
        const updatedData = { ...data, game }
        httpService.put('/trinius/' + updatedData._id, updatedData)
    } catch (err) {
        console.log('err in gameService in updateGame:', err);
    }
}


async function updateCategory(user, category) {
    try {
        const updatedUser = { ...user, game: { ...user.game, category } }
        return updatedUser
    } catch (err) {
        console.log('err in gameService in updateCategory:', err);
    }
}

async function updateCountry(user, country) {
    try {
        const updatedUser = { ...user, game: { ...user.game, country } }
        return updatedUser
    } catch (err) {
        console.log('err in gameService in updateCategory:', err);
    }
}

async function updateSoundStatus(user, status) {
    try {

        const updatedUser = { ...user, game: { ...user.game, soundObj: { ...user.game.soundObj, soundStatus: status } } }
        return updatedUser
    } catch (err) {
        console.log('err in gameAction in updateSoundStatus:', err);
    }
}

async function updateSound(user, currSound) {
    try {
        const updatedUser = { ...user, game: { ...user.game, soundObj: { ...user.game.soundObj, sound: { ...currSound } } } }
        return updatedUser
    } catch (err) {
        console.log('err in gameService in updateSound:', err);
    }
}

async function updateLang(user, lang, country) {
    try {
        const updatedUser = { ...user, game: { ...user.game, lang, country } }
        return updatedUser
    } catch (err) {
        console.log('err in gameService in updateLang:', err);
    }
}

async function updateTimeStatus(user, status) {
    try {
        const updatedUser = { ...user, game: { ...user.game, timeObj: { ...user.game.timeObj, timeStatus: status } } }
        return updatedUser
    } catch (err) {
        console.log('err in gameService in updateTimeStatus:', err);
    }
}

async function updateTime(user, time) {
    try {
        const updatedUser = { ...user, game: { ...user.game, timeObj: { ...user.game.timeObj, time } } }
        return updatedUser
    } catch (err) {
        console.log('err in gameService in updateTime:', err);
    }
}

async function updateLevel(user, level) {
    try {
        const updatedUser = { ...user, game: { ...user.game, level } }
        return updatedUser
    } catch (err) {
        console.log('err in gameService in updateLevel:', err);
    }
}

async function updateRoundIdx(user, idx) {
    try {
        const updatedUser = { ...user, game: { ...user.game, roundIdx: idx } }
        return updatedUser
    } catch (err) {
        console.log('err in gameService in updateRoundIdx:', err);
    }
}

async function updateUseQStatus(user, status) {
    try {
        const updatedUser = { ...user, game: { ...user.game, useQ: status } }
        return updatedUser
    } catch (err) {
        console.log('err in gameService in updateUseQStatus:', err);
    }
}

function getCForDisplay(val, lang, c) {
    if (lang === 'English') {
        if (val) return c.toLowerCase()
        else return c
    }
    else
        if (val)
            switch (c.toLowerCase()) {
                case 'nature': return 'טבע'
                case 'geography': return 'גיאוגרפיה'
                case 'animals': return 'בעלי חיים'
                case 'personalities': return 'אנשים'
                case 'movies': return 'סרטים'
                case 'medicine': return 'רפואה'
                case 'food': return 'אוכל'
                case 'sports': return 'ספורט'
                case 'music': return 'מוזיקה'
                case 'science': return 'מדע'
                case 'technology': return 'טכנולוגיה'
            }
        else {

            switch (c.slice(0, 1).toUpperCase() + c.slice(1)) {
                case 'Argentina': return 'ארגנטינה'
                case 'Australia': return 'אוסטרליה'
                case 'Austria': return 'אוסטריה'
                case 'Belgium': return 'בלגיה'
                case 'Brazil': return 'ברזיל'
                case 'Canada': return 'קנדה'
                case 'China': return 'סין'
                case 'Colombia': return 'קולומביה'
                case 'Denmark': return 'דנמרק'
                case 'England': return 'אנגליה'
                case 'Ethiopia': return 'אתיופיה'
                case 'Finland': return 'פינלנד'
                case 'France': return 'צרפת'
                case 'Germany': return 'גרמניה'
                case 'India': return 'הודו'
                case 'Israel': return 'ישראל'
                case 'Italy': return 'איטליה'
                case 'Japan': return 'יפן'
                case 'Mexico': return 'מקסיקו'
                case 'Morocco': return 'מרוקו'
                case 'Philippines': return 'פיליפינים'
                case 'Poland': return 'פולין'
                case 'Portugal': return 'פורטוגל'
                case 'Romania': return 'רומניה'
                case 'Russia': return 'רוסיה'
                case 'Spain': return 'ספרד'
                case 'Sweden': return 'שוודיה'
                case 'Switzerland': return 'שווייץ'
                case 'Thailand': return 'תאילנד'
                case 'Ukraine': return 'אוקראינה'
                case 'USA': return 'ארצות הברית'
            }
        }
}

function transToEn(isCategoryObject, currCategory, currCountry) {
    var categoriesNamesEnglish = ['nature', 'geography', 'animals', 'personalities', 'movies', 'medicine', 'food', 'sports', 'music', 'science', 'technology']
    var categoriesNamesHebrew = ['טבע', 'גיאוגרפיה', 'בעלי חיים', 'אנשים', 'סרטים', 'רפואה', 'אוכל', 'ספורט', 'מוזיקה', 'מדע', 'טכנולוגיה']
    if (isCategoryObject) return categoriesNamesEnglish[categoriesNamesHebrew.findIndex(c => c === currCategory)]
    else return tranCountry('English', currCountry)
}

function tranCountry(lang, country) {
    console.log(country);
    var arr = [
        ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'China', 'Colombia', 'Denmark', 'England', 'Ethiopia', 'Finland', 'France', 'Germany', 'India', 'Israel', 'Italy', 'Japan', 'Mexico', 'Morocco', 'Philippines', 'Poland', 'Portugal', 'Romania', 'Russia', 'Spain', 'Sweden', 'Switzerland', 'Thailand', 'Ukraine', 'USA'],
        ['ארגנטינה', 'אוסטרליה', 'אוסטריה', 'בלגיה', 'ברזיל', 'קנדה', 'סין', 'קולומביה', 'דנמרק', 'אנגליה', 'אתיופיה', 'פינלנד', 'צרפת', 'גרמניה', 'הודו', 'ישראל', 'איטליה', 'יפן', 'מקסיקו', 'מרוקו', 'פיליפינים', 'פולין', 'פורטוגל', 'רומניה', 'רוסיה', 'ספרד', 'שוודיה', 'שווייץ', 'תאילנד', 'אוקראינה', 'ארצות הברית']
    ]
    var currCountry = arr[lang === 'English' ? 0 : 1][(arr[lang === 'English' ? 1 : 0]).findIndex(c => c === country)]
    return currCountry
}

function setSettLngs() {
    return {
        "sett-c": {
            en: 'Category',
            he: 'קטגוריה'
        },
        "sett-l": {
            en: 'Level',
            he: 'רמה'
        },
        "sett-s": {
            en: 'Sound',
            he: 'מוזיקה'
        },
        "sett-p-covers": {
            en: 'Piano Covers',
            he: "קאברים (פסנתר)",
        },
        "sett-p-songs": {
            en: 'Songs',
            he: "שירים",
        },
        "sett-t": {
            en: 'Round Time',
            he: "משך סיבוב"
        },
        "sett-lng": {
            en: 'Language',
            he: "שפה"
        },
        "sett-useQ": {
            en: 'Use Your Questions',
            he: "שימוש בשאלות שנוספו"
        }
    }
}

function setAddingTxt(lng) {
    return lng === 'English' ? {
        add_mult: "Multiple Question",
        add_tf: "True/False Question",
        add_desc: "In this type you are not supposed to ask a question, but to establish a statement whether it's correct or not enjoy!",
        add_or: "or",
        add_the: "your-",
        add_finish: "Finish",
        add_com: "Please complete your",
        add_choose_l: "Choose Level",
        add_done: "Done",
        add_check: "Checking your",
        add_check_II: "Just a second...",
        add_sorry: "Sorry, It seems your",
        add_sorry_II: "is inappropriate...",
        add_fix: "Fix It",
        add_congrats: "Congratulation!",
        add_congrats_II: "Your",
        add_congrats_III: "added successfully"
    } : {
        add_mult: "רב ברירתי",
        add_tf: "נכון/לא נכון",
        add_desc: "בסוג השאלות הזה אין צורך לשאול שאלה, אלא לקבוע עובדה ולהחליט אם היא נכונה או לא. תהנו",
        add_or: "או",
        add_the: "-ה",
        add_finish: "סיים/י",
        add_com: "בבקשה סיים/י את ה",
        add_choose_l: "בחר/י רמה",
        add_done: "סיים",
        add_check: "בודק את ה",
        add_check_II: "רק רגע",
        add_sorry: "אופס! נראה שה",
        add_sorry_II: "לא מתאים",
        add_fix: "תקן/י",
        add_congrats: "מזל טוב",
        add_congrats_II: "ה",
        add_congrats_III: "נוספה בהצלחה",
    }
}

function getNextCategory(currCategory, lng) {
    const categoriesSrc = [nature, geography, animals, personalities, movies, medicine, food, sports, music, science, technology]
    const categoriesNamesEnglish = ['nature', 'geography', 'animals', 'personalities', 'movies', 'medicine', 'food', 'sports', 'music', 'science', 'technology']
    const categoriesNamesHebrew = ['טבע', 'גיאוגרפיה', 'בעלי חיים', 'אנשים', 'סרטים', 'רפואה', 'אוכל', 'ספורט', 'מוזיקה', 'מדע', 'טכנולוגיה']
    var currArr = lng === 'English' ? categoriesNamesEnglish : categoriesNamesHebrew
    var idx = currArr.findIndex(c => c.toUpperCase() === currCategory.toUpperCase())
    var finalIdx = idx === 10 ? 0 : idx + 1
    var nextCategory = { name: categoriesNamesEnglish[finalIdx].toUpperCase(), src: categoriesSrc[finalIdx] }
    return { ...nextCategory }
}