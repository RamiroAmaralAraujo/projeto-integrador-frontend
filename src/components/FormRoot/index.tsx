import { ComponentProps, ReactNode } from 'react'

interface FormRootProps extends ComponentProps<'form'> {
  children: ReactNode
}

export function FormRoot({ children, ...props }: FormRootProps) {
  return (
    <form className="w-full flex flex-col gap-3" {...props}>
      {children}
    </form>
  )
}
