import ServicesCategoryCard from '@/src/globalElements/cards/services/category'
import React from 'react'

export default function CardWrapper() {
  return (
    <div className='grid lg:grid-cols-3 gap-3'>
    {Array.from({length:12}).map((_,index)=>{
        return <ServicesCategoryCard key={index}/>
    })}
    </div>
  )
}
