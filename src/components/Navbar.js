import React from 'react'

function Navbar() {
  return (
    <div className="h-fit">
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a  className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Shardings messenger</span>
                </a>
            </div>
        </nav>
    </div>
  )
}

export default Navbar