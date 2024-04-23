import React, { useState } from 'react'
import { Button, Popconfirm, Card } from 'antd'
import { Alltext } from '../../../assets/AllText'
import EditForm from './EditForm'
import AddForm from './AddForm'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ModalComponent from 'src/components/ModalComponent'
import TableComponent from 'src/components/TableComponent '
import { handleResponse } from 'src/utils'
import { useDeleteCategory } from 'src/hooks/useDelete'

const AllCategory = ({ category, loading: categoryLoading }) => {
  let token = localStorage.getItem('token')
  const navigate = useNavigate()

  let [isModalVisible, setIsModalVisible] = useState(false)
  let [selectedCategory, setSelectedCategory] = useState('')

  const { executeMutation, loading: deleteLoading } = useDeleteCategory()

  let handleEdit = record => {
    setSelectedCategory(record)
    setIsModalVisible(true)
  }

  const handleDelete = async id => {
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
      title: Alltext.category.image,
      dataIndex: 'dirimage',
      width: '8%',
      render: (text, record) => {
        return (
          <img
            src={'https://backend.toppteamm.ir/public' + text}
            alt='diriamge'
            style={{ width: '50px', height: '50px', borderRadius: '10%' }}
          />
        )
      },
    },
    {
      title: `${Alltext.category.title}`,
      dataIndex: 'title',
      width: '80%',
      editable: true,
    },

    {
      title: '',
      dataIndex: 'operation',
      width: '5%',
      render: (_, record) =>
        category.length >= 1 ? (
          <Popconfirm
            title={Alltext.confirmDelete}
            okText={Alltext.ok}
            cancelText={Alltext.cancel}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button style={{ backgroundColor: '#1677FF', color: '#fff' }}>{Alltext.delete}</Button>
          </Popconfirm>
        ) : null,
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '5%',
      render: (_, record) =>
        category.length >= 1 ? (
          <Button
            style={{ backgroundColor: '#1677FF', color: '#fff' }}
            onClick={() => handleEdit(record)}
          >
            {Alltext.edit}
          </Button>
        ) : null,
    },
  ]

  const expandedRowRender = record => {
    const projectColumns = [
      {
        title: Alltext.defaultProjects.image,
        dataIndex: 'dirimage',
        key: 'dirimage',
        width: '8%',
        render: (text, record) => {
          return (
            <img
              src={'https://backend.toppteamm.ir/public/' + text}
              alt='project title'
              style={{ width: '50px', height: '50px', borderRadius: '10%' }}
            />
          )
        },
      },
      {
        title: Alltext.defaultProjects.name,
        dataIndex: 'name',
        key: 'Name',
        width: '15%',
      },
      {
        title: Alltext.defaultProjects.projectPurpose,
        dataIndex: 'purpos',
        key: 'Purpos',
        width: '15%',
      },
      {
        title: Alltext.defaultProjects.link,
        dataIndex: 'lLink',
        key: 'Link',
        width: '15%',
      },
      ,
      {
        title: Alltext.defaultProjects.description,
        dataIndex: 'description',
        key: 'Description',
        width: '15%',
      },
    ]
    return (
      <TableComponent dataSource={record.project} columns={projectColumns} id='#defaultProject' />
    )
  }

  return (
    <>
      <Card>
        <Button
          onClick={() => setIsModalVisible(!isModalVisible)}
          type='primary'
          style={{ marginBottom: 16 }}
        >
          {Alltext.category.add}
        </Button>
        <TableComponent
          dataSource={category}
          columns={columns}
          loading={categoryLoading}
          expandedRowRender={expandedRowRender}
          id='#categoryTable'
        />
      </Card>

      <ModalComponent
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          setSelectedCategory(null)
        }}
        title={selectedCategory ? Alltext.editTitle : Alltext.addTitle}
      >
        {selectedCategory ? <EditForm selectedCategory={selectedCategory} /> : <AddForm />}
      </ModalComponent>
    </>
  )
}

export default React.memo(AllCategory)
