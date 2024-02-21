import React from 'react'

const Login = () => {
  return (
   <>
       <div className="main flex mx-auto items-center justify-center h-screen flex-col bg-gradient-to-b from-slate-700 to-white">
            {/* <img src={top} alt="" /> */}
            <div className='flex mx-auto items-center justify-center md:justify-center h-screen flex-col'>
                {/* <Tractor color='rgb(74 222 128)' size={70} />   //previous used logo*/} 
                <h1 className='text-6xl mb-7 mainText font-bold uppercase'>vSM 2024</h1>
                <form className='flex flex-col justify-center items-center' >
                    <input type="email" placeholder="Team code" className='bg-black p-5 rounded-xl m-3' />
                    <input type="password" placeholder="Password" className=' p-5 bg-black rounded-xl m-3' />
                    <button type="submit" className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 active:scale-110 active:bg-indigo-500 duration-300 w-[150px]  p-5 rounded-xl'>Login</button>
                </form>
            </div>
        </div>
   </> 
  )
}

export default Login