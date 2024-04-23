import React, { useState, useEffect, useCallback } from 'react'
import { Button, Popconfirm, Checkbox, message, Card, Tooltip } from 'antd'
import { Alltext } from '../../../assets/AllText'
import EditForm from './EditForm'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ModalComponent from 'src/components/ModalComponent'
import TableComponent from 'src/components/TableComponent '
import { handleResponse } from 'src/utils'
import { useDeleteUser } from 'src/hooks/useDelete'
import mutations from 'src/schema/mutation'
import { useMutation } from '@apollo/client'
import EllipsisTooltip from 'src/components/EllipsisTooltip'

const AllUsers = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  let [isEditModalVisible, setIsEditModalVisible] = useState(false)
  let [selectedUser, setSelectedUser] = useState(null)
  let [dataSource, setDatasource] = useState(null)
  const [hasFetched, setHasFetched] = useState(false)

  const { executeMutation, loading: deleteLoading } = useDeleteUser()
  const [getAllUser, { loading, error, data }] = useMutation(mutations.get.user)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      toast.error(`please login first`)
    } else if (!hasFetched) {
      fetchAllUsers()
      setHasFetched(true)
    }
  }, [token, hasFetched])

  const fetchAllUsers = async () => {
    try {
      const { data } = await getAllUser()
      const { status, message, users } = data.getAllUser

      if (status == 200) {
        toast.success(`successfull fetching`)
        setDatasource(users)
      } else if (status == 404) {
        navigate('/page404')
        toast.error(`Status ${status}: ${message}`)
      } else if (status == 500) {
        navigate('/page500')
        toast.error(`Status ${status}: ${message}`)
      } else {
        toast.error(`Status ${status} :${message}`)
      }
    } catch (err) {
      toast.error(`getAllAboutus error: ${err}`)
    }
  }

  let handleEdit = record => {
    setSelectedUser(record)
    setIsEditModalVisible(true)
  }

  let handleDelete = async id => {
    if (!token) {
      navigate('/login')
      toast.error('Please login first')
      return
    }
    try {
      const result = await executeMutation(id)
      handleResponse(result)
    } catch (error) {
      toast.error(`Error: ${error}`)
    }
  }

  let columns = [
    {
      title: 'نام کاربر',
      dataIndex: 'fname',
      width: '15%',
      editable: true,
    },
    {
      title: 'ایمیل',
      dataIndex: 'email',
      width: '15%',
    },
    {
      title: 'پسورد',
      dataIndex: 'password',
      width: '15%',
      editable: true,
      render: (text, record) => (
        <EllipsisTooltip text={text} width='100px' />
     ),
    },

    {
      title: 'شماره تلفن',
      dataIndex: 'phone',
      width: '15%',
      editable: true,
    },
    {
      title: 'isAdmin',
      dataIndex: 'isAdmin',
      width: '15%',
      render: (isAdmin, record) => <Checkbox defaultChecked={isAdmin} disabled />,
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '5%',
      width: '15%',
      render: (_, record) => {
        if (record.isAdmin) {
          return (
            <Button
              style={{ backgroundColor: '#1677FF', color: '#fff' }}
              disabled
              onClick={() => {
                message.warning('You are an admin and cannot delete yourself')
              }}
            >
              حذف
            </Button>
          )
        } else {
          return (
            <Popconfirm
              title='آیا مطمئن هستید؟'
              okText='بله'
              cancelText='خیر'
              onConfirm={() => handleDelete(record.id)}
            >
              <Button style={{ backgroundColor: '#1677FF', color: '#fff' }}>حذف</Button>
            </Popconfirm>
          )
        }
      },
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '5%',
      width: '15%',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Button
            style={{ backgroundColor: '#1677FF', color: '#fff' }}
            onClick={() => handleEdit(record)}
          >
            ویرایش
          </Button>
        ) : null,
    },
  ]

  return (
    <>
      <Card>
        <TableComponent
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          id='#userTable'
        />
      </Card>
      <ModalComponent
        visible={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false)
          setSelectedUser(null)
        }}
        title={Alltext.editTitle}
      >
        <EditForm selectedUser={selectedUser} />
      </ModalComponent>
    </>
  )
}

export default React.memo(AllUsers)
