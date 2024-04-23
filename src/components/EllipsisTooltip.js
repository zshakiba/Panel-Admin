import React, { useState, useRef, useEffect } from 'react'
import { Tooltip } from 'antd'

const EllipsisTooltip = ({ text, width }) => {
  const [isOverflowing, setIsOverflowing] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, scrollWidth } = containerRef.current
      setIsOverflowing(scrollWidth > clientWidth)
    }
  }, [text])

  return (
    <Tooltip
      title={isOverflowing ? text : null}
      overlayStyle={{ maxWidth: '300px' }} // Optional: Adjust the max width of the tooltip
    >
      <div
        ref={containerRef}
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          width: { width },
          direction: 'ltr',
        }}
      >
        {text}
      </div>
    </Tooltip>
  )
}

export default EllipsisTooltip
