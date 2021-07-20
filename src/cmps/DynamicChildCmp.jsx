import React, { Component } from 'react';
import { FinishCmpChild } from './FinishCmpChild';
import { RoundCmpChild } from './RoundCmpChild';
import { TimeCmpChild } from './TimeCmpChild';

export class DynamicChildCmp extends Component {

    state = { passingContinue: '' }

    componentDidMount = () => {
        var propsForDisplay = this.propsForDisplay()
        this.setState({ passingContinue: propsForDisplay.continue })
    }

    propsForDisplay() {
        return { continue: this.props.continue }
    }

    render() {
        const { passingContinue } = this.state
        const { roundFinishObj, isCategoryFinished,lang } = this.props
        if (!roundFinishObj.status) return <h1></h1>
        else
            switch (roundFinishObj?.status) {
                case 'round':
                    return <RoundCmpChild lang={lang} continue={passingContinue} roundFinishObj={roundFinishObj} />
                case 'time':
                    return <TimeCmpChild lang={lang} continue={passingContinue} roundFinishObj={roundFinishObj} />
                case 'finish':
                    return <FinishCmpChild lang={lang} continue={passingContinue} roundFinishObj={roundFinishObj} isCategoryFinished={isCategoryFinished} />
                default:
                    return null
            }
    }
}
