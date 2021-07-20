import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import styled, { keyframes } from 'styled-components'
import { useTranslation } from 'react-i18next'
import wrong from '../assets/imgs/wrong.png'

//icons:
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DragHandleRoundedIcon from '@material-ui/icons/DragHandleRounded';

export function RoundIsFinished(props) {

    const { currRound, className, children, roundIsFinished, correctCounter, points, countryQ, lang } = props
    const { t } = useTranslation()

    return (
        <section className={className} style={{ fontFamily: lang === 'English' ? 'montserrat' : 'sans-serif', direction: lang === 'English' ? 'ltr' : 'rtl' }}>
            <header>
                <Link to="/home"><ArrowBackIosRoundedIcon /></Link>
                <h2> {t('rFinish-r') +' '+(currRound + 1)}</h2>
            </header>
            <div className="points grid pa">
                <div>
                    <p>{t('rFinish-rP')}</p>
                    <p>{correctCounter * 10}</p>
                </div>
                <AddRoundedIcon />
                <div>
                    <p>{t('rFinish-cQ')}</p>
                    <p>{countryQ ? 15 : ''}</p>
                    <img src={wrong} alt="" style={{ opacity: countryQ ? '0' : '1' }} />
                </div>
                <DragHandleRoundedIcon />
                <div>
                    <p>{t('rFinish-fP')}</p>
                    <p style={{ fontSize: roundIsFinished ? '100%' : '0%' }}>{(correctCounter * 10) + (countryQ ? 15 : 0)} <span className="plus-span pa">+</span> </p>
                </div>
            </div>
            <div className="round-status flex a-center pa">
                <span style={{ width: roundIsFinished ? `${correctCounter * 9.4}%` : '0' }}></span>
                <p>{correctCounter}/10</p>
            </div>
            <div className="content tac">
                {children}
            </div>
        </section>
    );
}


