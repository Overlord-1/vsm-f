import React from 'react'
import logo from '../assets/vsmLogo.png'
const Header = ({text}) => {
  return (
    <div className='w-full  mx-auto max-w-[1240px] p-7 mb-5 flex justify-around gap-36 items-center border-b-2 border-s-violet-100'>
        <h1 className='text-4xl text-white md:text-6xl'>{text}</h1>
        <img src={logo} alt="vsm logo" className='w-[60px] h-[60px]' />

    </div>
  )
}

export default Header