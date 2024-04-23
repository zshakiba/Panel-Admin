import React, { useState, useEffect } from 'react'
import { Form, Input, Space, Row, Col, Divider } from 'antd'
import { Alltext } from '../../../assets/AllText'
import SubmitButton from 'src/components/SubmitButton'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import UploadComponent from 'src/components/UploadComponent'
import { handleResponse } from 'src/utils'
import { useEditCategory } from 'src/hooks/useEdit'

function EditForm ({ selectedCategory }) {
  let token = localStorage.getItem('token')
  const navigate = useNavigate()
  let [form] = Form.useForm()

  let [buttonDisabled, setButtonDisabled] = useState(true)
  let [buttonClicked, setButtonClicked] = useState(false)
  let [fileList, setFileList] = useState([])

  const { executeMutation, loading, error } = useEditCategory()

  useEffect(() => {
    if (selectedCategory) {
      form.setFieldsValue({
        dirimage: fileList,
        title: selectedCategory.title,
      })
    }
  }, [selectedCategory, form])

  let handleFormItemChange = () => {
    setButtonDisabled(form.getFieldsError().some(field => field.errors.length > 0))
  }

  const handleFormSubmit = async values => {
    setButtonClicked(true)
    if (!token) {
      navigate('/login')
      toast.error('Please login first')
      return
    }

    try {
      const result = await executeMutation({
        title: values.title,
        dirimage: fileList,
        selectedCategory,
      })
      handleResponse(result)
    } catch (error) {
      toast.error(`Error: ${error}`)
    }
  }

  return (
    <div>
      <Divider style={{ marginTop: '0' }} />
      <Form
        form={form}
        layout='vertical'
        onFinish={handleFormSubmit}
        autoComplete='off'
        initialValues={selectedCategory.title || undefined}
        onFieldsChange={handleFormItemChange}
      >
        <Row gutter={24}>
          <Col className='gutter-row' xs={24} sm={8} md={8} lg={8}>
            <Form.Item name='dirimage'>
              <UploadComponent multiple={false} fileList={fileList} setFileList={setFileList} />
            </Form.Item>
          </Col>
          <Col className='gutter-row' xs={24} sm={16} md={16} lg={16}>
            <Form.Item
              name='title'
              label={Alltext.category.title}
              rules={[
                { required: true, message: Alltext.category.validationMessage.titleRequired },
              ]}
            >
              <Input placeholder={Alltext.category.title} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24} justify='end'>
          <Col className='gutter-row' xs={24} sm={12} md={12} lg={12}>
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
    </div>
  )
}

export default EditForm
