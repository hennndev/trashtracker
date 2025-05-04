import React from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import logo from "../../assets/trashtrack.png"
import { LuCircleUserRound, LuMail, LuLockKeyhole } from "react-icons/lu"
import Swal from 'sweetalert2'

const Register = ({title}) => {

  const { data, setData, post, errors, reset } = useForm({
    name: "",
    email: "",
    password: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post("/register", {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "User baru berhasil dibuat",
        });
        reset();
      },
      onError: (response) => {
        if(response.error) {
          Swal.fire({
            icon: "error",
            title: "Oops..",
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
        <section className='w-full md:w-[400px]'>
          <h1 className='font-black text-4xl text-green-900 self-start mb-3'>TrashTrack</h1>
          <form onSubmit={handleSubmit} className='w-full self-start'>
            <h1 className='text-green-800 text-2xl font-bold mb-1'>Sign Up</h1>
            <p className='text-green-800 font-normal leading-[1.5]'>Bergabunglah bersama kami dalam misi menciptakan dunia yang lebih bersih</p>
            <div className='w-full flexx rounded-[10px] border border-[#0000004D] px-4 mt-7'>
              <LuCircleUserRound className='text-xl mr-2 text-gray-400'/>
              <input 
                type="text" 
                placeholder='Name' 
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className='flex-1 border-none outline-none py-2.5 font-normal text-md'/>
            </div>
            {errors.name && (
              <p className='text-sm mt-1 text-red-400'>{errors.name}</p>
            )}
            <div className='w-full flexx rounded-[10px] border border-[#0000004D] px-4 mt-3'>
              <LuMail className='text-xl mr-2 text-gray-400'/>
              <input 
                type="email" 
                placeholder='Email' 
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                className='flex-1 border-none outline-none py-2.5 font-normal text-md'/>
            </div>
            {errors.email && (
              <p className='text-sm mt-1 text-red-400'>{errors.email}</p>
            )}
            <div className='w-full flexx rounded-[10px] border border-[#0000004D] px-4 mt-3'>
              <LuLockKeyhole className='text-xl mr-2 text-gray-400'/>
              <input 
                type="password" 
                placeholder='Password' 
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                className='flex-1 border-none outline-none py-2.5 font-normal text-md'/>
            </div>
            {errors.password && (
              <p className='text-sm mt-1 text-red-400'>{errors.password}</p>
            )}
            <button type='submit' className='h-[50px] bg-green-800 text-center text-white w-full rounded-[10px] mt-5 font-medium text-lg'>Sign Up</button>
          </form>      
          <p className='mt-3 self-start text-gray-500'>Have an account? <Link href="/login" className='text-green-800 underline'>Log In</Link></p>
        </section>
      </section>
    </main>
    </>
  )
}

export default Register