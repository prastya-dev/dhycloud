'use client'

import { useState } from 'react'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col justify-between items-center px-6 py-5 bg-indigo-200 min-h-screen w-full">

      {/* Header */}
      <div className="flex justify-between w-full">
        <h1 className="lg:text-3xl font-semibold">IndoDana</h1>
        <h1>Administration</h1>
      </div>

      {/* Card */}
      <div className="flex flex-col items-center rounded-xl backdrop-blur-sm bg-white/70 p-6 shadow-lg w-full max-w-md mt-[-4rem] lg:mt-0">

        <h1 className="text-2xl font-semibold mb-6">Login</h1>

        <div className="flex flex-col w-full gap-5">

          {/* Email */}
          <div className="relative w-full">
            <input
              type="email"
              placeholder=" "
              className="peer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <label className="
            absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out peer-focus:-top-6 peer-focus:left-2 peer-focus:text-xs peer-focus:text-indigo-600 peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-indigo-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 px-1
            ">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative w-full mt-3">
            <input
              type={showPassword ? 'text' : 'password'}  
              placeholder=" "
              className="peer w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <label className="
            absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out peer-focus:-top-6 peer-focus:left-2 peer-focus:text-xs peer-focus:text-indigo-600 peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-indigo-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 px-1
            ">
              Password
            </label>

            {/* Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-indigo-600"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {/* Forgot */}
          <div className="text-right text-sm text-indigo-600 cursor-pointer hover:underline">
            Lupa password?
          </div>

          {/* Button */}
          <button className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
            Login
          </button>

          {/* Register */}
          <div className="text-center text-sm">
            Don’t have an account?{' '}
            <span className="text-indigo-600 cursor-pointer hover:underline">
              Sign up
            </span>
          </div>

        </div>
      </div>

      {/* Footer */}
      <p className="text-sm text-gray-600">
        © 2026 PrastyaDev. All rights reserved.
      </p>

    </div>
  )
}

export default Login