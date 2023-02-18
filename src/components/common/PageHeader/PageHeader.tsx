import React from 'react'
import {useNavigate} from 'react-router-dom'

interface Props {
    title: string;
    to?: string;
    toLabel?: string;
}

export default function PageHeader({title, to, toLabel}:Props) {

    const navigate = useNavigate();

  return (
    <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>

        {to && 
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => navigate('/create')}
              className="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {toLabel}
            </button>
        </div>}
    </div>
  )
}
