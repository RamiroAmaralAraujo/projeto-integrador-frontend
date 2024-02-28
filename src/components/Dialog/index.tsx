import { DialogActions } from './DialogActions'
import { DialogContent } from './DialogContent'
import * as PrimitiveDialog from '@radix-ui/react-dialog'

export const Dialog = {
  Root: PrimitiveDialog.Root,
  Content: DialogContent,
  Trigger: PrimitiveDialog.Trigger,
  Close: PrimitiveDialog.Close,
  Actions: DialogActions,
}
