import { createDialogQueue } from '@rmwc/dialog'
import { createSnackbarQueue } from '@rmwc/snackbar'
import { DialogQueueInput } from 'rmwc/next'

export const dialogQueue = createDialogQueue() as {
  alert: (dialog: DialogQueueInput) => Promise<any>
  confirm: (dialog: DialogQueueInput) => Promise<any>
  prompt: (dialog: DialogQueueInput) => Promise<any>
}

export const snackbarQueue = createSnackbarQueue()
