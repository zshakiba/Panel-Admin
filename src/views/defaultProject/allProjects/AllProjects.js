import React, { useEffect, useState } from 'react'
import { Button, Popconfirm, Card, Select } from 'antd'
import { Alltext } from '../../../assets/AllText'
import toast from 'react-hot-toast'
import EditForm from './EditForm'
import AddForm from './AddForm'
import { useNavigate } from 'react-router-dom'
import ModalComponent from 'src/components/ModalComponent'
import TableComponent from 'src/components/TableComponent '
import { handleResponse } from 'src/utils'
import { useDeleteProject } from 'src/hooks/useDelete'

const AllProjects = ({ allCategorySource, loading }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  let [isModalVisible, setIsModalVisible] = useState(false)
  let [selectedProject, setSelectedProject] = useState(false)
  let [dataSource, setDataSource] = useState([])
  let [categoriesSource, setCategoriesSource] = useState([])

  const { executeMutation, loading: deleteLoading } = useDeleteProject()

  useEffect(() => {
    if (!loading) {
      const updatedAllcat = allCategorySource?.categories.map(category => ({
        ...category,
        project: category.project.map(project => ({
          ...project,
          categoryId: category.id,
          categoryTitle: category.title,
        })),
      }))
      const allProjectsList = updatedAllcat.flatMap(category => category.project)
      setDataSource(allProjectsList)
      setCategoriesSource(allCategorySource.categories)
    }
  }, [allCategorySource])

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

  let handleEdit = record => {
    setSelectedProject(record)
    setIsModalVisible(true)
  }

  let columns = [
    {
      title: Alltext.defaultProjects.image,
      dataIndex: 'dirimage',
      width: '8%',
      render: (text, record) => {
        return (
          <img
            src={'https://backend.toppteamm.ir/public/' + text}
            alt='diriamge'
            style={{ width: '50px', height: '50px', borderRadius: '10%' }}
          />
        )
      },
    },
    {
      title: Alltext.defaultProjects.name,
      dataIndex: 'name',
      width: '15%',
      editable: true,
    },
    {
      title: Alltext.defaultProjects.categoryTitle,
      dataIndex: 'category',
      width: '15%',
      render: (_, record) => {
        return (
          <Select value={record.categoryTitle} style={{ width: 150 }} disabled>
              <Select.Option key={record.categoryId} value={record.categoryTitle}>
                {record.categoryTitle}
              </Select.Option>
          </Select>
        )
      },
    },
    {
      title: Alltext.defaultProjects.projectPurpose,
      dataIndex: 'purpos',
      width: '15%',
      editable: true,
    },
    {
      title: Alltext.defaultProjects.link,
      dataIndex: 'link',
      width: '20%',
      editable: true,
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href={text} target='_blank' rel='noopener noreferrer' style={{ marginRight: 'auto' }}>
            {text}
          </a>
        </div>
      ),
    },
    {
      title: Alltext.defaultProjects.description,
      dataIndex: 'description',
      width: '30%',
      editable: true,
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '5%',
      render: (_, record) =>
        dataSource.length >= 1 ? (
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
        dataSource.length >= 1 ? (
          <Button
            style={{ backgroundColor: '#1677FF', color: '#fff' }}
            onClick={() => handleEdit(record)}
          >
            {Alltext.edit}
          </Button>
        ) : null,
    },
  ]

  return (
    <>
      <Card>
        <Button
          onClick={() => setIsModalVisible(!isModalVisible)}
          type='primary'
          style={{ marginBottom: 16 }}
        >
          {Alltext.add}
        </Button>
        <TableComponent
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          id='#defaultProjectTable'
        />
      </Card>

      <ModalComponent
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          setSelectedProject(null)
        }}
        title={selectedProject ? Alltext.editTitle : Alltext.addTitle}
      >
        {selectedProject ? (
          <EditForm selectedProject={selectedProject} categoriesSource={categoriesSource} />
        ) : (
          <AddForm categoriesSource={categoriesSource} />
        )}
      </ModalComponent>
    </>
  )
}

export default React.memo(AllProjects)
