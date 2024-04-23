import React, { useEffect, useState } from 'react'
import { Form, Input, Row, Col, Divider } from 'antd'
import { Alltext } from '../../../assets/AllText'
import SubmitButton from 'src/components/SubmitButton'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import UploadComponent from 'src/components/UploadComponent'
import { handleResponse } from 'src/utils'
import { useAddCategory } from 'src/hooks/useAdd'

function AddForm () {
  let token = localStorage.getItem('token')
  let [form] = Form.useForm()
  const navigate = useNavigate()

  let [buttonDisabled, setButtonDisabled] = useState(true)
  let [buttonClicked, setButtonClicked] = useState(false)
  let [fileList, setFileList] = useState([])

  const { executeMutation, loading, error } = useAddCategory()

  useEffect(() => {
    form.setFieldsValue({ file: fileList })
  })
  
  let handleFormItemChange = () => {
    setButtonDisabled(form.getFieldsError().some(field => field.errors.length > 0))
  }

  const handleFormSubmit = async values => {
    setButtonClicked(true)

    if (!token) {
      navigate('/login')
      toast.error('Please login first')
      return // Exit early if there's no token
    }
    const executeMutationPromise = executeMutation(values)
      .then(result => {
        handleResponse(result)
      })
      .catch(error => {
        toast.error(`Error: ${error}`)
      })

    toast.promise(executeMutationPromise, {
      loading: 'Submitting...',
      success: 'Submission successful',
      error: 'Submission failed',
    })
  }

  return (
    <div>
      <Divider style={{ marginTop: '0' }} />
      <Form
        form={form}
        layout='vertical'
        onFinish={handleFormSubmit}
        autoComplete='off'
        onFieldsChange={handleFormItemChange}
      >
        <Row gutter={24}>
          <Col className='gutter-row' xs={24} sm={8} md={8} lg={8}>
            <Form.Item name='file'>
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
          <Col className='gutter-row' xs={24} sm={12} md={8} lg={6}>
            <Form.Item>
              <SubmitButton
                disabled={buttonDisabled}
                text={Alltext.add}
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

export default AddForm
