import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { loadData } from '../store/actions/dataAction.js'
import { storageService } from '../services/session-storage.js';


export const _Logout = ({ loadData, logout, history }) => {

    const [isEn, setIsEn] = useState(true)

    useEffect(async () => {
        await loadData()
        const user = storageService.load('currUser')
        setIsEn(user?.game?.lang === 'English' ? true : false)
    }, [])

    const doLogout = () => {
        Swal.fire({
            title: isEn ? 'Are Your Sure You Want To Log Out?' : '?בטוח',
            showCancelButton: true,
            focusCancel: true,
            confirmButtonText: isEn ? 'Yes' : 'כן',
            confirmButtonColor: '#ff955a',
            reverseButtons: true,
            allowOutsideClick: false,
            cancelButtonText: isEn ? 'Cancel' : 'ביטול'
        }).then(result => {
            if (result.isConfirmed) {
                logout()
                history.push("/")
            }
        })
    }

    return (
        <div className="logout a-center ttc j-center flex" onClick={doLogout}>
            <p>{`${isEn ? 'Log out' : 'התנתק/י'}`}<span><ExitToAppIcon /></span></p>
        </div>
    );
}

const mapDispatchToProps = {
    loadData
}
export const Logout = connect(null, mapDispatchToProps)(_Logout)