// ModalComponent.js
import React from 'react'
import { Button, Modal } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
const ModalComponent = ({ visible, onCancel, title, children }) => {
  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onCancel}
      footer={null}
      style={{
        top: 150,
        minWidth: 400,
      }}
    >
      {children}
    </Modal>
  )
}

export default ModalComponent
