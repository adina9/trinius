import { dataService } from "../../services/dataService";
import { userService } from "../../services/userService";


export function loadUser() {
    return async dispatch => {
        try {
            const user = await userService.loadUser()
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('err in userAction in loadUser:', err);
        }
    }
}

export function updateNickname(data, currUser, nickname) {
    return async dispatch => {
        try {
            const updatedUser = await userService.updateNickname(currUser, nickname)
            await userService.updateUser(data, updatedUser)
            dispatch({ type: 'SET_USER', user: updatedUser })
        } catch (err) {
            console.log('err in userAction in setNickname', err);
        }
    }
}
export function updateUserImage(data, currUser, imgSrc) {
    return async dispatch => {
        try {
            const updatedUser = await userService.updateImgSrc(currUser, imgSrc)
            await userService.updateUser(data, updatedUser)
            dispatch({ type: 'SET_USER', user: updatedUser })
        } catch (err) {
            console.log('err in userAction in setUserImage:', err);
        }
    }
}

export function updatePointsObj(data, currUser, obj) {
    return async dispatch => {
        try {
            const updatedUser = await userService.updatePointsObj(currUser, obj)
            await userService.updateUser(data, updatedUser)
            dispatch({ type: 'SET_USER', user: updatedUser })
        } catch (err) {
            console.log('err in userAction in updatePointsObj:', err);
        }
    }
}


export function addQuestion(data, currUser, obj) {
    return async dispatch => {
        try {
            const upadtedUser = await userService.addQuestion(currUser, obj)
            await userService.updateUser(data, upadtedUser)

        } catch (err) {
            console.log('err in userAction in addQuestion:', err);
        }
    }
}

export function logout(data) {
    return async dispatch => {
        try {
            sessionStorage.clear()
        } catch (err) {
            console.log('err in userAction in logout:', err);
        }
    }
}

export function checkExisting(data, userLittleObj) {
    const { nickname, password } = userLittleObj
    return async dispatch => {
        try {
            const index = await userService.checkExisting(data, { nickname, password })
            return index >= 0 ? true : false
        } catch (err) {
            console.log('err in userAction in checkExisting:', err);
        }
    }
}

export function createUser(data, newUserLittleObj) {
    return async dispatch => {
        try {
            const updatedData = await userService.createUser(data, newUserLittleObj)
            dispatch({ type: 'SET_DATA', data: updatedData })
            dataService.updateData(updatedData)
        } catch (err) {
            console.log('err in userAction in createUser:', err);
        }
    }
}

export function resetPoints(data, currUser) {
    return dispatch => {
        const updatedData = userService.resetPoints(data, currUser)
        dataService.updateData(updatedData)
        dispatch({ type: 'SET_DATA', data: updatedData })
    }
}

