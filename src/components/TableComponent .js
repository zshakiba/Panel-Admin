import React from 'react'
import { Table, Spin, Skeleton } from 'antd'

const TableComponent = ({ dataSource, columns, loading, expandedRowRender, id }) => {
  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <Table
          rowClassName={() => 'editable-row'}
          id={id}
          bordered
          dataSource={dataSource}
          columns={columns}
          expandable={expandedRowRender={expandedRowRender}}
          pagination={{
            pageSize: 5,
          }}
          rowKey='id'
          responsive
          scroll={{ x: 'max-content' }}
        />
      )}
    </>
  )
}

export default TableComponent
