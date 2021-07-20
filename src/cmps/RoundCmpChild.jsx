import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import backImg from '../assets/imgs/round.png'
import { useTranslation } from 'react-i18next'

export function RoundCmpChild(props) {
    const { roundFinishObj } = props
    const { t } = useTranslation()
    return (
        <section className="roundCmp child">
            <img src={backImg} alt="" />
            <div className="bless">
                <h1>{roundFinishObj?.largeTxt}</h1>
                <h4> {roundFinishObj?.littleTxt}</h4>
            </div>
            <div className="btns-div">
                <Link to="/dashboard" onClick={async () => await props.continue(false, roundFinishObj?.status)} className="btn-div"><div><p>{t('status')}</p></div></Link>
                <div className="btn-div" onClick={async () => await props.continue(true, roundFinishObj?.status)}>
                    <p>{roundFinishObj?.continueTxt}</p>
                </div>
            </div>
        </section>
    );

}
