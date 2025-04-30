import React from 'react'
import { Head } from '@inertiajs/react'
import Navbar from '../components/Navbar'

const History = ({title}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>


      <Navbar/>
    </>
  )
}

export default History