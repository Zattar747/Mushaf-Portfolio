import { HTMLAttributes } from 'react'
import { TextScramble } from './text-scramble'

type Props = {
  value: string
  textClassName?: string
  as?: React.ElementType
} & HTMLAttributes<HTMLDivElement>

export default function CornerFrameScrambleText({ value, textClassName = '', as, style, ...props }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: '10px 18px',
        backgroundImage: [
          'linear-gradient(to right,  #C8A86B 1.5px, transparent 1.5px)',
          'linear-gradient(to right,  #C8A86B 1.5px, transparent 1.5px)',
          'linear-gradient(to left,   #C8A86B 1.5px, transparent 1.5px)',
          'linear-gradient(to left,   #C8A86B 1.5px, transparent 1.5px)',
          'linear-gradient(to bottom, #C8A86B 1.5px, transparent 1.5px)',
          'linear-gradient(to bottom, #C8A86B 1.5px, transparent 1.5px)',
          'linear-gradient(to top,    #C8A86B 1.5px, transparent 1.5px)',
          'linear-gradient(to top,    #C8A86B 1.5px, transparent 1.5px)',
        ].join(','),
        backgroundSize: '14px 14px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 0, 0 100%, 100% 0, 100% 100%, 0 0, 100% 0, 0 100%, 100% 100%',
        ...style,
      }}
      {...props}
    >
      <TextScramble as={as} className={textClassName}>
        {value}
      </TextScramble>
    </div>
  )
}
