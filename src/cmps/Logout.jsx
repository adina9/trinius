import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { storageService } from '../services/session-storage.js';


export const Logout = ({ logout, history }) => {

    const [isEn, setIsEn] = useState(true)

    useEffect(async () => {
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