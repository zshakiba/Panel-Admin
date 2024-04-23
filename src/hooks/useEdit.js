import { extractFields, useMutationExecutor } from 'src/utils'
import mutations from 'src/schema/mutation'

export function useEditProject () {
  return useMutationExecutor(mutations.edit.project, values => {
    const fields = ['name', 'description', 'purpos', 'link', 'categorytitle', 'file']
    return {
      id: values.selectedProject.id,
      file: values.file[0].originFileObj,
      ...extractFields(values, fields),
    }
  })
}

export function useEditAboutus () {
  return useMutationExecutor(mutations.edit.aboutus, values => {
    const fields = ['name', 'explain', 'email', 'file']
    return {
      id: values.selectedItem.id,
      input: extractFields(values, fields),
    }
  })
}

export function useEditCaptionAboutus () {
  return useMutationExecutor(mutations.edit.caption, values => ({
    id: values.selectedItem.id,
    text: values.caption,
  }))
}

export function useEditCategory () {
  return useMutationExecutor(mutations.edit.category, values => {
    const vari = {
      file: values.dirimage[0].originFileObj,
      title: values.title,
      id: values.selectedCategory.id,
    }
    console.log('vari', vari)
    return {
      file: values.dirimage[0].originFileObj,
      title: values.title,
      id: values.selectedCategory.id,
    }
  })
}

export function useEditConnectus () {
  return useMutationExecutor(mutations.edit.connectus, values => ({
    email: values.email,
    response: values.response,
  }))
}

export function useEditUser () {
  return useMutationExecutor(mutations.edit.user, values => {
    const fields = ['fname', 'email', 'password', 'phone', 'isAdmin']
    return {
      input: extractFields(values, fields),
      id: values.selectedUser.id,
    }
  })
}

export function useEditWeblog () {
  return useMutationExecutor(mutations.edit.weblog, values => {
    return {
      input: {
        dirimage: values.values.dirimage[0].originFileObj,
        title: values.values.title,
        categoryWeblog: values.values.categoryWeblog,
        content: values.editorContent
      },
      id: values.selectedItem.id,
    }
  })
}
