import { extractFields, useMutationExecutor } from 'src/utils'
import mutations from '../schema/mutation'

export function useAddAboutus () {
  return useMutationExecutor(mutations.add.aboutus, values => {
    const fields = ['name', 'explain', 'email', 'file']
    return {
      input: extractFields(values, fields),
    }
  })
}

export function useAddBanner () {
  return useMutationExecutor(mutations.add.baner, values => {
    const fields = ['file', 'idprivate']
    return extractFields(values, fields)
  })
}

export function useAddCaptionAboutus () {
  return useMutationExecutor(mutations.add.caption, values => {
    const fields = ['text']
    return extractFields(values, fields)
  })
}

export function useAddCategory () {
  return useMutationExecutor(mutations.add.category, values => {
    const fields = ['file', 'title']
    return extractFields(values, fields)
  })
}

export function useAddConnectus () {
  return useMutationExecutor(mutations.add.connectus, values => {
    const fields = ['fname', 'email', 'description']
    return extractFields(values, fields)
  })
}
export function useAddProject () {
  return useMutationExecutor(mutations.add.project, values => {
    const fields = ['file', 'name', 'description', 'purpos', 'link', 'categorytitle']
    return {
      input: extractFields(values, fields),
    }
  })
}

export function useAddWeblog () {
  return useMutationExecutor(mutations.add.weblog, values => {
    return {
      input: {
        dirimage: values.values.dirimage[0].originFileObj,
        title: values.values.title,
        categoryWeblog: values.values.categoryWeblog,
        content: values.editorContent,
      },
    }
  })
}

export function useEditorUploadImage () {
  return useMutationExecutor(mutations.add.uploadimage, values => {
    return {
      file: values.file[0].originFileObj,
    }
  })
}

