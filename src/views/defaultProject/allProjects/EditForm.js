import React, { useState, useEffect } from 'react'
import { Form, Input, Row, Col, Select, Divider } from 'antd'
import { Alltext } from '../../../assets/AllText'
import SubmitButton from 'src/components/SubmitButton'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import UploadComponent from 'src/components/UploadComponent'
import { Grid } from 'antd'
import { handleResponse } from 'src/utils'
import { useEditProject } from 'src/hooks/useEdit'

const { useBreakpoint } = Grid

function EditForm ({ selectedProject, categoriesSource }) {
  let token = localStorage.getItem('token')
  const navigate = useNavigate()
  const screens = useBreakpoint()
  let [form] = Form.useForm()

  let [buttonDisabled, setButtonDisabled] = useState(true)
  let [buttonClicked, setButtonClicked] = useState(false)
  let [fileList, setFileList] = useState([])

  const { executeMutation, loading, error } = useEditProject()

  useEffect(() => {
    form.setFieldsValue({ file: fileList })
  })

  useEffect(() => {
    if (selectedProject) {
      form.setFieldsValue({
        name: selectedProject.name,
        description: selectedProject.description,
        purpos: selectedProject.purpos,
        link: selectedProject.link,
        categorytitle: selectedProject.categoryTitle,
      })
    }
  }, [selectedProject, form])

  let handleFormItemChange = () => {
    setButtonDisabled(form.getFieldsError().some(field => field.errors.length > 0))
  }

  let handleFormSubmit = async values => {
    setButtonClicked(true)
    if (!token) {
      navigate('/login')
      toast.error('Please login first')
      return // Exit early if there's no token
    }

    if (categoriesSource) {
      try {
        const result = await executeMutation({ ...values, file: fileList, selectedProject })
        handleResponse(result)
      } catch (error) {
        toast.error(`Error: ${error}`)
      }
    }
  }

  return (
    <>
      <Divider style={{ marginTop: '0' }} />
      <Form
        form={form}
        layout='vertical'
        onFinish={handleFormSubmit}
        autoComplete='off'
        onFieldsChange={handleFormItemChange}
        initialValues={selectedProject}
        scrollToFirstError
      >
        <Row gutter={24}>
          {screens.sm ? (
            <>
              <Col className='gutter-row' xs={24} sm={16} md={16} lg={16}>
                <Form.Item
                  name='name'
                  label={Alltext.defaultProjects.name}
                  rules={[{ message: Alltext.defaultProjects.validationMessage.nameRequired }]}
                  style={{ marginTop: '20px' }}
                >
                  <Input placeholder={Alltext.defaultProjects.name} />
                </Form.Item>
              </Col>
              <Col className='gutter-row' xs={24} sm={8} md={8} lg={8}>
                <Form.Item name='file'>
                  <UploadComponent multiple={false} fileList={fileList} setFileList={setFileList} />
                </Form.Item>
              </Col>
            </>
          ) : (
            <>
              <Col className='gutter-row' xs={24} sm={24} md={8} lg={8}>
                <Form.Item name='file'>
                  <UploadComponent multiple={false} fileList={fileList} setFileList={setFileList} />
                </Form.Item>
              </Col>
              <Col className='gutter-row' xs={24} sm={24} md={16} lg={16}>
                <Form.Item
                  name='name'
                  label={Alltext.defaultProjects.name}
                  rules={[{ message: Alltext.defaultProjects.validationMessage.nameRequired }]}
                >
                  <Input placeholder={Alltext.defaultProjects.name} />
                </Form.Item>
              </Col>
            </>
          )}
        </Row>

        <Row gutter={24}>
          <Col className='gutter-row' xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              name='purpos'
              label={Alltext.defaultProjects.projectPurpose}
              rules={[
                { message: Alltext.defaultProjects.validationMessage.projectPurposeRequired },
              ]}
            >
              <Input placeholder={Alltext.defaultProjects.projectPurpose} />
            </Form.Item>
          </Col>
          <Col className='gutter-row' xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              name='link'
              label={Alltext.defaultProjects.link}
              rules={[{ message: Alltext.defaultProjects.validationMessage.linkRequired }]}
            >
              <Input placeholder={Alltext.defaultProjects.link} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col className='gutter-row' xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              name='categorytitle'
              label={Alltext.defaultProjects.categoryTitle}
              rules={[{ message: Alltext.defaultProjects.validationMessage.categorytitle }]}
            >
              <Select style={{ width: '100%' }}>
                {categoriesSource.map(cat => (
                  <Select.Option key={cat.id} value={cat.title} label={cat.title}>
                    {cat.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className='gutter-row' xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              name='description'
              label={Alltext.defaultProjects.description}
              rules={[
                { message: Alltext.defaultProjects.validationMessage.descriptionRequiredRequired },
              ]}
            >
              <Input placeholder={Alltext.defaultProjects.description} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24} justify='end'>
          <Col className='gutter-row' xs={24} sm={24} md={24} lg={24}>
            <Form.Item>
              <SubmitButton
                disabled={buttonDisabled}
                text={Alltext.edit}
                buttonClicked={buttonClicked}
                loading={loading}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default EditForm
