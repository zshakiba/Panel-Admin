import { Button } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const SubmitButton = ({ buttonDisabled, text, loading, buttonClicked, style }) => {
  return loading && buttonClicked ? (
    <Button color='primary' className='px-4' style={style}>
      <LoadingOutlined color='white' />
    </Button>
  ) : (
    <Button
      type='primary'
      htmlType='submit'
      disabled={buttonDisabled}
      style={style}
    >
      {text}
    </Button>
  )
}

export default SubmitButton
