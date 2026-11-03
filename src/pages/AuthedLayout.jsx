import React from 'react'
import styles from './AppLayout.module.css'

import Sidebar from '../components/Sidebar'
import Map from '../components/Map'
import CitiesProvider from '../context/CitiesContext'

export default function AuthedLayout() {
  return (
    <CitiesProvider>
      <div className={styles.authedLayout}>
        <Sidebar />
        <Map/>
      </div>
    </CitiesProvider>
  )
}
