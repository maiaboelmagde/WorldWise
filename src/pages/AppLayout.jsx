import React from 'react'
import styles from './AppLayout.module.css'
import { Outlet } from 'react-router-dom'
import PageNav from '../components/PageNav'

export default function AppLayout() {
    return (
        <div className={styles.app}>
            <PageNav />
            <Outlet />
        </div>
    )
}
