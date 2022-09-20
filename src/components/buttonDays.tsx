import { HtmlHTMLAttributes, ButtonHTMLAttributes } from "react";
import * as Toggle from '@radix-ui/react-toggle-group';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{}
export function ButtonDays(props: ButtonProps) {
  return (  
    <Toggle.Item 
    {...props}
     className='w-8 h-8 rounded bg-zinc-900'
     />
  )
}