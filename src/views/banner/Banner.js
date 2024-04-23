import React, { useEffect, useState } from 'react'
import { List, Card, Image, Button, Row, Col, Skeleton } from 'antd'
import toast from 'react-hot-toast'
import ImageUploader from './ImageUploader'
import { LoadingOutlined } from '@ant-design/icons'
import { Alltext } from 'src/assets/AllText'
import { useNavigate } from 'react-router-dom'
import { handleResponse } from 'src/utils'
import { useDeleteBaner } from 'src/hooks/useDelete'
import mutations from 'src/schema/mutation'
import { useMutation } from '@apollo/client'

const Banner = () => {
  let token = localStorage.getItem('token')
  const navigate = useNavigate()

  const [newList, setNewsList] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)

  const [getAllBaner, { loading, error, data }] = useMutation(mutations.get.baner)

  const fetchAllBanners = async () => {
    try {
      const { data } = await getAllBaner()
      const { status, message, baners } = data.getAllBaner

      if (status == 200) {
        toast.success(`successfull fetching`)
        setNewsList(baners)
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
      toast.error(` error: ${err}`)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/login')
      toast.error(`please login first`)
    } else if (!hasFetched) {
      fetchAllBanners()
      setHasFetched(true)
    }
  }, [token, hasFetched, data])

  const { executeMutation, loading: loading1, error: error1 } = useDeleteBaner()

  const handleSelect = image => {
    // Check if the clicked image group is already selected
    if (selectedImage && selectedImage.id === image.id) {
      // If it is, unselect it by setting selectedImage to null
      setSelectedImage(null)
    } else {
      // If it's not, select it by setting selectedImage to the clicked image group
      setSelectedImage(image)
    }
  }

  const handleDelete = async () => {
    setButtonClicked(true)

    if (!token) {
      navigate('/login')
      toast.error(`please login first`)
    } else if (selectedImage) {
      try {
        const result = await executeMutation(selectedImage.id)
        handleResponse(result)
      } catch (error) {
        toast.error(`Error: ${error}`)
      }
    }
  }

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <Card>
          <Card>
            <ImageUploader Banners={newList}></ImageUploader>
          </Card>

          <Card style={{ marginTop: 20 }}>
            <Row
              gutter={24}
              style={{
                maxHeight: 400,
                overflowY: newList.length > 6 ? 'scroll' : 'hidden',
                overflowX: 'hidden',
                marginTop: 10,
              }}
            >
              {newList.map((item, index) => (
                <Col key={item.id} xs={12}>
                  <List.Item>
                    <div
                      style={{
                        border:
                          selectedImage && selectedImage.id === item.id
                            ? '2px solid #1890ff'
                            : '2px solid #ccc',
                        borderRadius: '10px',
                        padding: '10px',
                      }}
                      onClick={() => handleSelect(item)}
                    >
                      <p>{item.idprivate}</p>

                      <Image.PreviewGroup
                        preview={{
                          onChange: (current, prev) =>
                            console.log(`current index: ${current}, prev index: ${prev}`),
                        }}
                      >
                        {item.dirimage.map((imageUrl, idx) => (
                          <Image
                            key={idx}
                            width={100}
                            height={100}
                            src={imageUrl}
                            style={{ border: '1px solid #ccc', objectFit: 'contain' }}
                            preview={true}
                          />
                        ))}
                      </Image.PreviewGroup>
                    </div>
                  </List.Item>
                </Col>
              ))}
            </Row>

            {newList.length !== 0 && !buttonClicked && (
              <Button
                type='primary'
                style={{ marginTop: 20, width: '100px' }}
                onClick={handleDelete}
                disabled={!selectedImage}
              >
                {Alltext.delete}
              </Button>
            )}
            {newList.length === 0 && <p style={{ textAlign: 'center' }}>No image found</p>}
            {loading1 && buttonClicked && (
              <Button
                type='primary'
                style={{ marginTop: 20, width: '100px' }}
                onClick={handleDelete}
                disabled={!selectedImage}
              >
                <LoadingOutlined></LoadingOutlined>
              </Button>
            )}
          </Card>
        </Card>
      )}
    </>
  )
}

export default Banner
