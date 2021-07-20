import React, { Component } from 'react';
import { connect } from 'react-redux'
import Swal from 'sweetalert2'

import { loadData } from '../store/actions/dataAction.js';
import { resetPoints } from '../store/actions/userAction.js'
import { StatCmp } from '../cmps/StatCmp';
import { storageService } from '../services/session-storage.js';
import { LoadCycle } from '../cmps/LoadCycle.jsx';

class _Dashboard extends Component {

    state = {
        currUser: {},
        isLoading: true
    }

    async componentDidMount() {
        await this.props.loadData()
        const { data, history } = this.props
        const currUser = storageService.load('currUser')
        if (!currUser?.nickname) history.push("/")
        this.setState({ currUser })
        setTimeout(() => this.setState({ isLoading: false }), 150)
    }

    calculatedWidth = () => (this.state.currUser.pointsObj?.fullPoints / (43650 / 100)).toFixed(1)

    calculatedHeight = () => {
        const w = this.calculatedWidth()
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

    title = () => this.state.currUser.game.lang === 'English' ? 'total points percentage' : 'אחוז הנקודות הכולל'

    render() {
        const { data } = this.props
        const { currUser, isLoading } = this.state
        const { pointsObj, nickname } = currUser
        const lang = currUser?.game?.lang
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
                    this.props.resetPoints(data, currUser)
                    this.props.history.push(`/about`)
                }
            })
        }
        return (
            <React.Fragment>
                {isLoading && <LoadCycle width="40%" height="20%" top="50%" />}
                {!isLoading && <section className="dashboard pf page" >
                    <div className="total-points ma tac flex a-center">
                        <header><p>{this.title()}</p></header>
                        <div className="progress-container flex a-center">
                            <p>{this.calculatedWidth().substr(0, 1)}% <span>{`(${pointsObj?.fullPoints} / 43,650)`}</span></p>
                            <div className="percent pa"
                                style={{
                                    width: `${pointsObj?.fullPoints < 500 ? '1' : this.calculatedWidth() * window.screen.height < 800 ? 0.9 : 0.955}%`,
                                    height: window.screen.height < 800 ? `${pointsObj?.fullPoints < 800 ? `${this.calculatedHeight()}` : '70'}%` : '60%',
                                    animation: window.screen.height < 800 ? `${this.calculatedWidth() * 0.9 < 20 ? 'progressSmall' : 'progressBig'} 3s ease` : 'progressBig 3s ease'
                                }}></div>
                        </div>
                    </div>
                    <StatCmp pointsObj={pointsObj} data={data} currUser={currUser} />
                </section>}
            </React.Fragment>
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
    resetPoints
}
export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard)