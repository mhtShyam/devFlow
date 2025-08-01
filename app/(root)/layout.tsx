import React, { ReactNode } from 'react'
import Navbar from '@/components/navigation/navbar'
import LeftSidebar from '@/components/navigation/LeftSidebar'
import RightSidebar from '@/components/navigation/RightSidebar'

const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <main className='background-light850_dark100 relative'>
    <Navbar/>
    <div className='flex'>
      <LeftSidebar/>
      <section className='flex flex-1 flex-col min-h-screen px-6 pb-6 pt-36 max-md:pb-14 sm:px-14'>
        <div className='mx-auto w-full max-w-5xl'>{children}</div>
      </section>
      <RightSidebar/>
    </div>
    </main>
  )
}

export default RootLayout
