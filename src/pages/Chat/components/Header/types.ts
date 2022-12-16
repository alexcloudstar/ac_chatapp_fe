export type ModalContentType = {
  title: string
  content: string | JSX.Element
  confirmText: string
  onConfirm: () => void
}
