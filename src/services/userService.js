import { httpService } from './httpService.js'
import { storageService } from './session-storage.js'
// import { storageService } from './storage-service.js'

// const KEY_DATA = 'dataDB'

// var { data } = require('../data/db.json')

export const userService = {
    // loadUser,
    updateUser,
    updateNickname,
    updateImgSrc,
    updatePointsObj,
    addQuestion,
    checkExisting,
    createUser,
    resetPoints,
    makeId
}
// async function loadUser() {
//     try {
//         var { data } = await httpService.get('/trinius')
//         console.log(data);
//         // if (!data) httpService.post('/trinius', data)
//         return data.user
//     } catch (err) {
//         console.log('err in userService in loadUser:', err);
//     }
// }

async function updateUser(data, user) {
    try {
        console.log('user.game', user.game);
        const userIdx = data.users.findIndex(u => u._id === user._id)
        data.users[userIdx] = user
        const updatedData = { ...data }
        httpService.put('/trinius/' + updatedData._id, updatedData)
        storageService.save('currUser', user)
        var c = storageService.load('currUser')
        console.log(c);
    } catch (err) {
        console.log('err in userService in updateUser:', err);
    }
}

async function updateNickname(user, nickname) {
    try {
        const updatedUser = { ...user, nickname }
        return updatedUser
    } catch (err) {
        console.log('err in userService in updateNickname:', err);
    }
}


async function updateImgSrc(user, image) {
    try {
        const updatedUser = { ...user, image }
        return updatedUser
    } catch (err) {
        console.log('err in userService in setUserImage:', err);
    }
}

async function updatePointsObj(user, obj) {
    try {
        const updatedUser = { ...user, pointsObj: { ...obj } }
        return updatedUser
    } catch (err) {
        console.log('err in userService in updatePointsObj:', err);
    }
}

async function addQuestion(user, obj) {
    try {
        var { objectsArray } = user
        if (objectsArray.length) objectsArray.push(obj)
        else objectsArray = [obj]
        const updatedUser = { ...user, objectsArray }
        return updatedUser
    } catch (err) {
        console.log('err in itemService in addQuestion:', err);
    }
}

async function checkExisting(data, userLittleObj) {
    try {
        const { nickname, password } = userLittleObj
        const { users } = data
        var index = users.findIndex(user => user.password === password && user.nickname === nickname)
        if (index >= 0) {
            storageService.clear()
            storageService.save('currUser', data.users[index])
        }
        return index
    } catch (err) {
        console.log('err in userService in checkExisting:', err);
    }
}

async function createUser(data, newUserLittleObj) {
    const { newName, newPass } = newUserLittleObj
    try {
        const newUser = {
            _id: await makeId(),
            nickname: newName,
            password: newPass,
            pointsObj: {
                categories: {
                    nature: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    geography: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    animals: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    personalities: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    movies: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    medicine: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    food: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    sports: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    music: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    science: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    technology: {
                        E: 0,
                        M: 0,
                        H: 0
                    }
                },
                countries: {
                    Argentina: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Australia: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Austria: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Belgium: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Brazil: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Canada: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    China: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Colombia: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Denmark: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    England: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Ethiopia: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Finland: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    France: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Germany: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    India: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Israel: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Italy: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Japan: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Mexico: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Morocco: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Philippines: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Poland: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Portugal: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Romania: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Russia: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Spain: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Sweden: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Switzerland: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Thailand: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    Ukraine: {
                        E: 0,
                        M: 0,
                        H: 0
                    },
                    USA: {
                        E: 0,
                        M: 0,
                        H: 0
                    }
                },
                fullPoints: 10

            },
            image: {
                src: newUserLittleObj.imageUrl ? newUserLittleObj.imageUrl : '/static/media/user.579e0088.png',
                bgClr: '#ff955a'
            },
            objectsArray: [],
            game: {
                soundObj: {
                    soundStatus: false,
                    sound: {
                        s: "/static/media/01.8cf4fc9e.mp3",
                        n: "Art of silence",
                        isPlaying: false
                    }
                },
                timeObj: {
                    timeStatus: false,
                    time: 60
                },
                category: {
                    name: "PERSONALITIES",
                    src: "/static/media/personalities-c.8d940b01.png"
                },
                country: "USA",
                lang: "English",
                level: {
                    n: "E",
                    c: "#ff9800"
                },
                roundIdx: 0,
                useQ: false
            }
        }
        storageService.clear()
        storageService.save('currUser', newUser)
        const newUsers = [...data.users, newUser]
        const updatedData = { ...data, users: newUsers }
        return updatedData
        // httpService.post('/trinius', updatedData)
    } catch (err) {
        console.log('err in userService in createUser:', err);
    }
}

function resetPoints(data, currUser) {
    const { users } = data
    var index = users.findIndex(user => user._id === currUser._id)
    var { categories, countries } = currUser
    var tempObj = { ...categories, ...countries }
    // var updatedObj = {
    //     // ...tempObj.map(c => c = {
    //     //     "E": 0,
    //     //     "M": 0,
    //     //     "H": 0
    //     // }),
    //     // fullPoints: 10
    // }
    var updatedObj = {
        categories: {
            nature: {
                E: 0,
                M: 0,
                H: 0
            },
            geography: {
                E: 0,
                M: 0,
                H: 0
            },
            animals: {
                E: 0,
                M: 0,
                H: 0
            },
            personalities: {
                E: 0,
                M: 0,
                H: 0
            },
            movies: {
                E: 0,
                M: 0,
                H: 0
            },
            medicine: {
                E: 0,
                M: 0,
                H: 0
            },
            food: {
                E: 0,
                M: 0,
                H: 0
            },
            sports: {
                E: 0,
                M: 0,
                H: 0
            },
            music: {
                E: 0,
                M: 0,
                H: 0
            },
            science: {
                E: 0,
                M: 0,
                H: 0
            },
            technology: {
                E: 0,
                M: 0,
                H: 0
            }
        },
        countries: {
            Argentina: {
                E: 0,
                M: 0,
                H: 0
            },
            Australia: {
                E: 0,
                M: 0,
                H: 0
            },
            Austria: {
                E: 0,
                M: 0,
                H: 0
            },
            Belgium: {
                E: 0,
                M: 0,
                H: 0
            },
            Brazil: {
                E: 0,
                M: 0,
                H: 0
            },
            Canada: {
                E: 0,
                M: 0,
                H: 0
            },
            China: {
                E: 0,
                M: 0,
                H: 0
            },
            Colombia: {
                E: 0,
                M: 0,
                H: 0
            },
            Denmark: {
                E: 0,
                M: 0,
                H: 0
            },
            England: {
                E: 0,
                M: 0,
                H: 0
            },
            Ethiopia: {
                E: 0,
                M: 0,
                H: 0
            },
            Finland: {
                E: 0,
                M: 0,
                H: 0
            },
            France: {
                E: 0,
                M: 0,
                H: 0
            },
            Germany: {
                E: 0,
                M: 0,
                H: 0
            },
            India: {
                E: 0,
                M: 0,
                H: 0
            },
            Israel: {
                E: 0,
                M: 0,
                H: 0
            },
            Italy: {
                E: 0,
                M: 0,
                H: 0
            },
            Japan: {
                E: 0,
                M: 0,
                H: 0
            },
            Mexico: {
                E: 0,
                M: 0,
                H: 0
            },
            Morocco: {
                E: 0,
                M: 0,
                H: 0
            },
            Philippines: {
                E: 0,
                M: 0,
                H: 0
            },
            Poland: {
                E: 0,
                M: 0,
                H: 0
            },
            Portugal: {
                E: 0,
                M: 0,
                H: 0
            },
            Romania: {
                E: 0,
                M: 0,
                H: 0
            },
            Russia: {
                E: 0,
                M: 0,
                H: 0
            },
            Spain: {
                E: 0,
                M: 0,
                H: 0
            },
            Sweden: {
                E: 0,
                M: 0,
                H: 0
            },
            Switzerland: {
                E: 0,
                M: 0,
                H: 0
            },
            Thailand: {
                E: 0,
                M: 0,
                H: 0
            },
            Ukraine: {
                E: 0,
                M: 0,
                H: 0
            },
            USA: {
                E: 0,
                M: 0,
                H: 0
            }
        },
        fullPoints: 10

    }
    users[index].pointsObj = updatedObj
    const updatedData = { ...data, users }
    return updatedData
}

async function makeId(length = 10) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}