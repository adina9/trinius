import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import { loadData } from '../store/actions/dataAction.js';
import { resetPoints } from '../store/actions/userAction.js'
import { StatCmp } from '../cmps/StatCmp';
import { storageService } from '../services/session-storage.js';
import { LoadCycle } from '../cmps/LoadCycle.jsx';

export const Dashboard = ({ history }) => {


    const { data } = useSelector(state => state.dataModule)
    const dispatch = useDispatch()

    const [currUser, setCurrUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [nickname, setNickname] = useState('')
    const [pointsObj, setPointsObj] = useState({})
    const [lang, setLang] = useState(null)

    useEffect(async () => {
        await dispatch(loadData())
        const user = storageService.load('currUser')
        if (!user?.nickname) history.push("/")
        setCurrUser(user)
        setTimeout(() => setIsLoading(false), 150)
    }, [])

    useEffect(() => {
        setNickname(currUser.nickname)
        setPointsObj(currUser.pointsObj)
        setLang(currUser.game?.lang)
    }, [currUser])

    const calculatedWidth = () => (currUser.pointsObj?.fullPoints / (43650 / 100)).toFixed(1)

    const calculatedHeight = () => {
        const w = calculatedWidth()
        if (w > 15) return 70
        else {
            if (w === 0) return 0
            else
                if (w < 1 && !Number.isInteger(w)) return 20
                else
                    if (w < 6) return w * 10
                    else return ((w - 5) * 2) + 50
        }
    }

    const title = () => currUser.game.lang === 'English' ? 'total points percentage' : 'אחוז הנקודות הכולל'

    if (!nickname) return <LoadCycle width="40%" height="20%" top="50%" />

    if (pointsObj.fullPoints >= 43650) {
        const txt = lang === 'English' ?
            {
                t: 'WOW!! Seems You\'ve Got All The Points',
                f: 'Now Your Points Are Reset To Zero',
                c: 'OK, Thank You',
            }
            : {
                t: 'וואו! נראה שהגעת למכסת הנקודות',
                f: 'עכשיו הנקודות שלך מתאפסות',
                c: 'הבנתי תודה :)'
            }
        Swal.fire({
            title: txt.t,
            text: txt.f,
            position: 'top-start',
            icon: 'success',
            iconColor: '#ff641a',
            confirmButtonText: txt.c,
            confirmButtonColor: '#ff641a',
            allowOutsideClick: false
        }).then(res => {
            if (res.isConfirmed) {
                dispatch(resetPoints(data, currUser))
                history.push(`/about`)
            }
        })
    }
    return (
        <React.Fragment>
            {isLoading && <LoadCycle width="40%" height="20%" top="50%" />}
            {!isLoading && <section className="dashboard pf page" >
                <div className="total-points ma tac flex a-center">
                    <header><p>{title()}</p></header>
                    <div className="progress-container flex a-center">
                        <p>{calculatedWidth().substr(0, 1)}% <span>{`(${pointsObj?.fullPoints} / 43,650)`}</span></p>
                        <div className="percent pa"
                            style={{
                                width: `${pointsObj?.fullPoints < 500 ? '1' : calculatedWidth() * window.screen.height < 800 ? 0.9 : 0.955}%`,
                                height: window.screen.height < 800 ? `${pointsObj?.fullPoints < 800 ? `${calculatedHeight()}` : '70'}%` : '60%',
                                animation: window.screen.height < 800 ? `${calculatedWidth() * 0.9 < 20 ? 'progressSmall' : 'progressBig'} 3s ease` : 'progressBig 3s ease'
                            }}></div>
                    </div>
                </div>
                <StatCmp pointsObj={pointsObj} data={data} currUser={currUser} />
            </section>}
        </React.Fragment>
    );
}
