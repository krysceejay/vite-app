interface VerticalStepProps {
  title: string,
  text: string,
  isEnd: boolean
}

export default function VerticalStep({ title, text, isEnd }: VerticalStepProps){
  return (
    <div className={`px-6 pb-6 border-l relative ${isEnd ? 'border-transparent' : 'border-green-color'}`}>
      <h3 className={`text-green-color text-xs leading-[0] whitespace-break-spaces ${isEnd ? 'font-semibold' : 'font-normal'}`}>{title}</h3>
      <p className="text-[10px] font-light mt-2">{text}</p>
      <div className="w-2 h-2 bg-green-color rounded-full absolute -top-[3.5px] -left-[4.5px]" />
    </div>
  )
}