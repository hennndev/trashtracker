import React from 'react'
import Swal from 'sweetalert2';
import { Head, Link, useForm } from '@inertiajs/react'
import logo from "../../assets/trashtrack.png"
import { LuCircleUserRound, LuLockKeyhole } from "react-icons/lu"


const Login = ({title}) => {

  const { data, setData, post, errors, reset, processing } = useForm({
    email: "",
    password: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    post("/login", {
      onSuccess: (response) => {
        console.log(response)
      },
      onError: (response) => {
       if(response.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.error,
        });
       }
      }
    })
  }
 
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
    <main className='bg-white h-dvh'>
      <section className='flex-center flex-col w-full h-full px-5'>

        <section className='max-sm:w-full md:w-[400px]'>
          <h1 className='font-black text-4xl text-green-900 self-start mb-3'>TrashTrack</h1>
          <form onSubmit={handleSubmit} className='w-full self-start'>
            <h1 className='text-green-800 text-2xl font-semibold mb-1'>Welcome Back!</h1>
            <p className='text-green-800 font-normal leading-[1.5]'>Yuk, teruskan misi kita untuk bumi 
            yang lebih bersih!</p>
            <div className='w-full flexx rounded-[10px] border border-[#0000004D] px-4 mt-7'>
              <LuCircleUserRound className='text-xl mr-2 text-gray-400'/>
              <input 
                type="email"
                id='email' 
                placeholder='Email' 
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                className='flex-1 border-none outline-none py-2.5 font-normal text-md'/>
            </div>
            {errors.email && (
              <p className='text-sm text-red-400 mt-1'>{errors.email}</p>
            )}
            <div className='w-full flexx rounded-[10px] border border-[#0000004D] px-4 mt-3'>
              <LuLockKeyhole className='text-xl mr-2 text-gray-400'/>
              <input 
                type="password" 
                id='password'
                placeholder='Password' 
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                className='flex-1 border-none outline-none py-2.5 font-normal text-md'/>
            </div>
            {errors.password && (
              <p className='text-sm text-red-400 mt-1'>{errors.password}</p>
            )}
            <button type='submit' disabled={processing} className={`cursor-pointer h-[50px] text-center text-white w-full rounded-[10px] mt-5 font-medium text-lg ${processing ? 'bg-gray-400' : 'bg-green-800'}`}>
              {processing ? "Loading..." : "Login"}
            </button>
          </form>
          <p className='mt-3 self-start text-gray-500'>Don't have an account? <Link href="/register" className='text-green-800 underline'>Register</Link></p>
        </section>
      </section>
    </main>
    </>
  )
}

export default Login