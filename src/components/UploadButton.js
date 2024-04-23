import { PlusOutlined } from "@ant-design/icons"
import { Alltext } from "src/assets/AllText"

const UploadButton = () => {
  return (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type='button'
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{Alltext.upload}</div>
    </button>
  )
}

export default UploadButton
