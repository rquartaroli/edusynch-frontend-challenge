import { InputHTMLAttributes, ReactNode, useState } from "react"
import { Eye, EyeSlash } from "@phosphor-icons/react"

type InputDynamicForModalProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  phosphorIcon?: ReactNode
  isInputPassword?: boolean
}

export function InputDynamicForModal({
  id,
  phosphorIcon,
  isInputPassword = false,
  ...props
}: InputDynamicForModalProps) {
  const [viewPassword, setViewPassword] = useState(false)

  return (
    <div 
      className={`flex items-center w-60 md:w-[272px] xl:w-[384px] h-[48px] p-4 border rounded-md ${props.type === 'number' ? 'border-secondary-300/50': 'border-secondary-300'}`}
    >
      {
        phosphorIcon
        &&
        <label htmlFor={id}>
          {phosphorIcon}
        </label>
      }
      
      {isInputPassword
      ?
      <>
        <input 
          id={id}
          className="w-full text-text-base label md:body focus:outline-none disabled:text-secondary-300 disabled:cursor-not-allowed"
          type={viewPassword ? "text" : "password"}
          {...props}
        />
        <button onClick={() => setViewPassword(!viewPassword)}>
          {viewPassword
          ?
          <EyeSlash className="text-secondary-300" size={18} weight="regular" />
          :
          <Eye className="text-secondary-300" size={18} weight="regular" />
          }
          
        </button>
      </>
      :
        <input 
          id={id}
          className="w-full text-text-base label md:body focus:outline-none disabled:text-secondary-300 disabled:cursor-not-allowed"
          {...props}
        />
      }
    </div>
  )
}