import { HTMLAttributes, ReactElement } from 'react'
import { Button } from '../../components/ui/button'

interface PageActionProps extends HTMLAttributes<HTMLButtonElement> {
  icon: ReactElement
  label: string
}

export function PageAction({ icon, label, ...rest }: PageActionProps) {
  return <Button {...rest} icon={icon} label={label}></Button>
}
