import React from 'react'

export default function PageTitle({title}: {title: string}) {
  return (
    <div>
        <h1 className="text-2xl md:text-4xl  font-bold"> {title} </h1>
    </div>
  )
}
