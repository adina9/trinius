import React, { Component } from 'react';

//imgs:
import profile from '../assets/imgs/profile.png'
import clock from '../assets/imgs/time.png'
import finish from '../assets/imgs/finish.png'
import round from '../assets/imgs/round.png'

//icons:
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import CopyrightIcon from '@material-ui/icons/Copyright';

export function AboutMe() {

    return (
        <section className="about-me pf ttc">
            <div className="top pa flex column">
                <p className="tac">adina zwebner</p>
                <div className="pa"><img src={profile} alt="" /></div>
            </div>
            <main className="pa tac">
                <p>i'm a <b>full-stack web developer</b> who enjoys facing challenges, loves coding and turning imaginary ideas into “live” sites and web applications</p>
            </main>
            <span className="flex j-evenly pa">Copyright <CopyrightIcon /> 2021 by adina zwebner </span>
            <footer className="pa flex column ttc a-center j-evenly">
                <h2>contact me</h2>
                <div className="flex j-evenly">
                    <a href="https://www.facebook.com/adina.zwebner"><FacebookIcon /></a>
                    <a href="https://github.com/adina9"><GitHubIcon /></a>
                    <a href="https://linkedin.com/in/adina-zwebner-451401205"><LinkedInIcon /></a>
                </div>
            </footer>
        </section>
    );

}
