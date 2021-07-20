import React, { Component } from 'react';

export class Timer extends Component {

    state = {
        date: null,
        intervalId: null,
        minutes: null,
        seconds: null
    }

    async componentDidMount() { //it happens when the game starts
        this.doTimer(this.props?.time * 1000)
    }

    doTimer(time) {
        this.setFormat(time)
        this.startCountDown(time)
    }

    setFormat = (time) => {
        var { date, minutes, seconds } = this.state
        date = new Date(time)
        minutes = this.addZ(date.getMinutes())
        seconds = this.addZ(date.getSeconds())
        this.setState({ minutes, seconds })
    }

    addZ = (n) => (n < 10 ? '0' : '') + n

    startCountDown(time) {
        var { intervalId } = this.state
        intervalId = setInterval(() => {
            time -= 1000
            this.setFormat(time)
            if (time <= 0) {
                clearInterval(intervalId)
                this.props.timeIsOver()
            }
            if (this.props.roundIsFinished) clearInterval(intervalId)
        }, 1000)
    }

    get tenSecondsStyle() {
        var { seconds, minutes } = this.state
        if (+seconds < 10 && minutes === '00') return 'red'
        return 'black'
    }


    componentDidUpdate() {
        if (this.props.isResetTime) {
            clearInterval(this.state.intervalId)
            this.props.turnResetTimeOff()
            this.doTimer(this.props?.time * 1000)
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    }

    render() {
        const color = this.tenSecondsStyle
        var { minutes, seconds } = this.state
        return (
            <div className="timer flex j-center a-center" style={{ color }}>
                {minutes}:{seconds}
            </div>
        );
    }
}
