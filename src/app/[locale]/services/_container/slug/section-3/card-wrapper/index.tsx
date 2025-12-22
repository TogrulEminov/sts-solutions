import ServicesProduct from './card'

export default function CardWrapper() {
  return (
    <div className="flex flex-col space-y-10">
    {Array.from({length:6}).map((_,index)=>{
        return <ServicesProduct index={index+1} key={index}/>
    })}
    </div>
  )
}
