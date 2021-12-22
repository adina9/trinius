import React from "react";
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { storageService } from "../services/session-storage";


export const About = () => {
    const { t } = useTranslation()
    var currUser = storageService.load('currUser')
    var lang = currUser ? currUser?.game?.lang : 'English'
    var isEn = lang === 'English' ? true : false
    return (
        <section className="app-about ttc pf left-trans"
            style={{ fontFamily: isEn ? 'montserrat' : 'sans-serif' }}
        >
            <header>
                <p
                    style={{ letterSpacing: isEn ? '1.3vw' : '' }}
                >{t('a-welcome')}</p>
                <small>{t('a-small')}</small>
            </header>
            <div>{t('a-div')}</div>
            <footer>
                <p>{t('a-wish')}</p>
            </footer>
            <footer>
                <Link to="/settings">
                    <p>{t('a-lnk-s')}</p>
                </Link>
                <Link to='/play'>
                    <p>{t('a-lnk-p')}</p>
                </Link>
            </footer>
        </section>
    )

}
