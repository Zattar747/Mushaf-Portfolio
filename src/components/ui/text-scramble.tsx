import { useEffect, useRef, useState } from 'react'
import React from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*'

interface Props {
  children: string | number
  as?: React.ElementType
  className?: string
}

export function TextScramble({ children, as: Tag = 'span', className }: Props) {
  const text = String(children)
  const [displayed, setDisplayed] = useState(text)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const queue = text.split('').map((char, i) => ({
      to: char,
      start: Math.floor(i * 0.6),
      end: Math.floor(i * 0.6) + Math.floor(Math.random() * 10) + 5,
    }))
    let frame = 0
    const update = () => {
      let output = ''
      let complete = 0
      for (const item of queue) {
        if (frame >= item.end) {
          complete++
          output += item.to
        } else if (frame >= item.start) {
          output += item.to === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]
        } else {
          output += item.to === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      setDisplayed(output)
      if (complete < queue.length) {
        frame++
        rafRef.current = requestAnimationFrame(update)
      }
    }
    rafRef.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafRef.current)
  }, [text])

  return <Tag className={className}>{displayed}</Tag>
}
