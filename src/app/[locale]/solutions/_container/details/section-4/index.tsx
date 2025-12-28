import React from 'react'
import SliderArea from './slider'

export default function SectionFour() {
  return (
    <section className='pb-10 lg:pb-25 overflow-hidden'>
      <div className="container flex flex-col space-y-10">
        <strong className='font-bold lg:text-[40px] text-ui-3 font-inter lg:leading-12'>Digər həllərimiz</strong>
        <SliderArea/>
      </div>
    </section>
  )
}
