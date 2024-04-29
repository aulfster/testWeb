import React from 'react';
import { Table, Card } from 'antd';
import 'antd/dist/antd.min.js';
import { SalesData } from '../types';
import './salesTable.css';
import { columns } from './salesTableColumns';

const SalesTable: React.FC<{ salesData: SalesData[] }> = ({ salesData }) => {
  return (
    <div className='card-container'>
      <Card className='card-responsive' hoverable>
        <Table
          columns={columns}
          dataSource={salesData}
          rowKey='weekEnding'
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
          locale={{ emptyText: 'No sales data available' }}
        />
      </Card>
    </div>
  );
};

export default SalesTable;
