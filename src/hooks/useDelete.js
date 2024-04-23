import { useMutationExecutor } from 'src/utils'
import mutations from '../schema/mutation'

export function useDeleteItem (mutation) {
  return useMutationExecutor(mutation, id => ({ id }))
}

export function useDeleteAboutus () {
  return useDeleteItem(mutations.delete.aboutus)
}

export function useDeleteBaner () {
  return useDeleteItem(mutations.delete.baner)
}

export function useDeleteCaption () {
  return useDeleteItem(mutations.delete.caption)
}

export function useDeleteCategory () {
  return useDeleteItem(mutations.delete.category)
}

export function useDeleteConnectus () {
  return useDeleteItem(mutations.delete.connectus)
}

export function useDeleteCustomProject () {
  return useDeleteItem(mutations.delete.customProject)
}

export function useDeleteProject () {
  return useDeleteItem(mutations.delete.project)
}

export function useDeleteUser () {
  return useDeleteItem(mutations.delete.user)
}

export function useDeleteWeblog () {
  return useDeleteItem(mutations.delete.weblog)
}
