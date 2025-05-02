import React from 'react'
import { Head } from '@inertiajs/react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = ({title, navbarTitle, children}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className='flex'>
        <Sidebar/>
        <div className='flex flex-1 flex-col'>
          <Navbar title={navbarTitle}/>
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout