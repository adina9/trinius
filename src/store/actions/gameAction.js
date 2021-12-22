
import { gameService } from "../../services/gameService";
import { userService } from "../../services/userService";


export function updateCategory(data, currUser, category) {
    return async dispatch => {
        try {
            const updatedUser = await gameService.updateCategory(currUser, category)
            await userService.updateUser(data, updatedUser)
            dispatch({ type: 'SET_USER', user: updatedUser })
        } catch (err) {
            console.log('err in gameAction in updateCategory:', err);
        }
    }
}

export function updateCountry(data, currUser, country) {
    return async dispatch => {
        try {
            const updatedUser = await gameService.updateCountry(currUser, country)
            await userService.updateUser(data, updatedUser)
            dispatch({ type: 'SET_USER', user: updatedUser })
        } catch (err) {
            console.log('err in gameAction in updateCountry:', err);
        }
    }
}

export function updateSoundStatus(data, currUser, status) {
    return async dispatch => {
        try {
            const updatedUser = await gameService.updateSoundStatus(currUser, status)
            await userService.updateUser(data, updatedUser)
            dispatch({ type: 'SET_USER', user: updatedUser })
        } catch (err) {
            console.log('err in gameAction in updateSoundStatus:', err);
        }
    }
}

export function updateSound(data, currUser, sound) {
    return async dispatch => {
        try {
            const updatedUser = await gameService.updateSound(currUser, sound)
            await userService.updateUser(data, updatedUser)
            dispatch({ type: 'SET_USER', user: updatedUser })
        } catch (err) {
            console.log('err in gameAction in updateSound:', err);
        }
    }
}

export function updateLang(data, currUser, lang, country) {
    console.log('lang:', lang)
    return async dispatch => {
        try {
            const updatedUser = await gameService.updateLang(currUser, lang, country)
            await userService.updateUser(data, updatedUser)
            dispatch({ type: 'SET_USER', user: updatedUser })
        } catch (err) {
            console.log('err in gamaAction in updateLang:', err);
        }
    }
}

export function updateTime(data, currUser, time) {
    return async dispatch => {
        try {
            const updatedUser = await gameService.updateTime(currUser, time)
            await userService.updateUser(data, updatedUser)
            dispatch({ type: 'SET_USER', user: updatedUser })
        } catch (err) {
            console.log('err in gameAction in updateTime:', err);
        }
    }
}

export function updateTimeStatus(data, currUser, time) {
    return async dispatch => {
        try {
            const updatedUser = await gameService.updateTimeStatus(currUser, time)
            await userService.updateUser(data, updatedUser)
            dispatch({ type: 'SET_USER', user: updatedUser })
        } catch (err) {
            console.log('err in gameAction in updateTimeStatus:', err);
        }
    }
}

export function updateLevel(data, currUser, level) {
    return async dispatch => {
        try {
            const updatedUser = await gameService.updateLevel(currUser, level)
            await userService.updateUser(data, updatedUser)
            dispatch({ type: 'SET_USER', user: updatedUser })
        } catch (err) {
            console.log('err in gameAction in updateLevel:', err);
        }
    }
}

export function updateRoundIdx(data, currUser, idx) {
    console.log('updateRoundIdx:', idx);
    return async dispatch => {
        try {
            const updatedUser = await gameService.updateRoundIdx(currUser, idx)
            await userService.updateUser(data, updatedUser)
            dispatch({ type: 'SET_USER', user: updatedUser })
        } catch (err) {
            console.log('err in gameAction in updateRoundIndex:', err);
        }
    }
}

export function updateUseQStatus(data, currUser, status) {
    return async dispatch => {
        try {
            const updatedUser = await gameService.updateUseQStatus(currUser, status)
            await userService.updateUser(data, updatedUser)
            dispatch({ type: 'SET_USER', user: updatedUser })
        } catch (err) {
            console.log('err ingameAction in updateQStatus:', err);
        }
    }
}


