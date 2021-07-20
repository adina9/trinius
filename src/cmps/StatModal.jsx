import React from 'react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
//icons:
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

export function StatModal({ closeModal, className, data, options, currVal, lang }) {
    const { t } = useTranslation()
    return (
        <section className={className}>
            <div className="pa flex j-between">
                <CloseRoundedIcon onClick={closeModal} />
                <p>{currVal}</p>
            </div>
            <Bar data={data}
                options={options}
            />
            <p style={{ fontFamily: lang === 'English' ? 'montserrat' : 'sans-serif' }}>{window.screen.height > 800 ? t('modal-desc'):''}</p>
        </section>
    );

}
