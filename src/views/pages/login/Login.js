import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Recaptcha from 'react-recaptcha'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd'
import toast from 'react-hot-toast'
import { Alltext } from 'src/assets/AllText'
import { emailRegex } from 'src/utils'

const DATA = gql`
  mutation Login($input: Userlogin) {
    login(input: $input) {
      status
      message
      code
      isAdmin
      token
    }
  }
`

const FORGOT_PASS = gql`
  mutation forgetpassword($email: String!) {
    forgetpassword(email: $email) {
      status
      message
    }
  }
`
const Login = () => {
  let navigate = useNavigate()
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [login, { loading, error }] = useMutation(DATA)
  let [forgetpassword, { loading: loading1, error: error1 }] = useMutation(FORGOT_PASS)

  let handleSubmit = async event => {
    event.preventDefault()
    let { errors } = await login({
      variables: {
        input: { email, password },
      },
      onCompleted: data => {
        if (data.login?.status == 200) {
          toast.success('Login successful', `${data.login.message}`)
          localStorage.setItem('token', data.login.token)
          navigate('/dashboard')
        } else if (data && data.login.status == 404) {
          navigate('/page404')
          toast.error(`Status ${data.login.status}: ${data.login.message} login`)
        } else if (data && data.login.status == 500) {
          navigate('/page500')
          toast.error(`Status ${data.login.status}: ${data.login.message} login`)
        } else {
          toast.error(`Status ${data.login.status} :${data.login.message} Login`)
        }
      },

      onError: err => {
        if (err) {
          toast.error(`[Error]: ${err}`)
        }
      },
    })
    if (errors && errors.message) {
      toast.error(`[${errors.name}]: ${errors.message}`)
    }
  }
  let handleForgotPass = async event => {
    event.preventDefault()
    let { errors } = await forgetpassword({
      variables: {
        email: email,
      },
      onCompleted: data => {
        if (data.forgetpassword?.status == 200) {
          toast.success('forgetpassword successful', `${data.forgetpassword.message}`)
        } else if (data && data.forgetpassword.status == 404) {
          navigate('/page404')
          toast.error(
            `Status ${data.forgetpassword.status}: ${data.forgetpassword.message} forgetpassword`,
          )
        } else if (data && data.forgetpassword.status == 500) {
          navigate('/page500')
          toast.error(
            `Status ${data.forgetpassword.status}: ${data.forgetpassword.message} forgetpassword`,
          )
        } else {
          toast.error(
            `Status ${data.forgetpassword.status} :${data.forgetpassword.message} forgetpassword`,
          )
        }
      },

      onError: err => {
        if (err) {
          toast.error(`[Error]: ${err}`)
        }
      },
    })
    if (errors && errors.message) {
      toast.error(`[${errors.name}]: ${errors.message}`)
    }
  }

  let [recapcha, setRecapcha] = useState(false)
  let onChangeRecapcha = () => {}

  return (
    <div className='bg-light min-vh-100 d-flex flex-row align-items-center'>
      <CContainer>
        <CRow className='justify-content-center'>
          <CCol md={8}>
            <CCardGroup>
              <CCard className='p-4'>
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className='text-medium-emphasis'>Sign In to your account</p>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type='email'
                        placeholder='Email'
                        autoComplete='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        rules={[
                          { required: true, message: Alltext.users.validationMessage.emailRequired },
                          {
                            pattern: emailRegex,
                            message: Alltext.users.validationMessage.emailFormatInvalid,
                          },
                        ]}
                      />
                    </CInputGroup>
                    <CInputGroup className='mb-4'>
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type='password'
                        placeholder='Password'
                        autoComplete='current-password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        {loading ? (
                          <CButton color='primary' className='px-4' onClick={handleSubmit}>
                            <Spin color='white' />
                          </CButton>
                        ) : (
                          <CButton color='primary' className='px-4' onClick={handleSubmit}>
                            Login
                          </CButton>
                        )}
                      </CCol>
                      <CCol xs={6} className='text-right'>
                        <CButton color='link' className='px-0' onClick={handleForgotPass}>
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              <CCard className='text-white bg-primary py-5' style={{ width: '44%' }}>
                <CCardBody className='text-center'>
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to='/register'>
                      <CButton color='primary' className='mt-3' active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
