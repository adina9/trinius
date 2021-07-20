import React from 'react';
import { Link } from 'react-router-dom'
import backImg from '../assets/imgs/finish.png'
import { useTranslation } from 'react-i18next'

export function FinishCmpChild(props) {

    const { roundFinishObj, isCategoryFinished } = props

    const { t } = useTranslation()

    return (
        <section className="finishCmp child">
            <img src={backImg} alt="" />
            <div className="bless">
                <h1>{isCategoryFinished ? t('finish-c') : roundFinishObj?.largeTxt}</h1>
                <h4> {roundFinishObj?.littleTxt}</h4>
            </div>
            <div className={`btns-div ${isCategoryFinished ? 'j-cneter' : 'j-between'}`}>
                <Link to="/dashboard" onClick={async () => await props.continue(false, roundFinishObj?.status)} className="btn-div" style={isCategoryFinished ? { width: '40%', margin: '0 auto' } : { width: '45%' }}><div><p>{t('status')}</p></div></Link>
                {!isCategoryFinished && <div className="btn-div" onClick={async () => await props.continue(true, roundFinishObj?.status)}>
                    <p>{roundFinishObj?.continueTxt}</p>
                </div>}
            </div>
        </section>
    );

}
