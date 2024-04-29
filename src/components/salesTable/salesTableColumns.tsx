import { SortOrder } from 'antd/es/table/interface';
import { format, parseISO } from 'date-fns';
import { SalesData } from '../types';
import './salesTable.css';

const defaultColumnProps = {
  sortDirections: ['descend' as SortOrder],
  align: 'center' as const,
  onHeaderCell: () => ({ className: 'headerCell' }),
};

const createSorter = (key: keyof SalesData) => (a: SalesData, b: SalesData) => {
  if (typeof a[key] === 'number' && typeof b[key] === 'number') {
    return (a[key] as number) - (b[key] as number);
  }
  return a[key].toString().localeCompare(b[key].toString());
};

export const columns = [
  {
    title: 'Week Ending',
    dataIndex: 'weekEnding',
    key: 'weekEnding',
    sorter: createSorter('weekEnding'),
    render: (value: string) => renderCell(formatDate(value), 'left'),
    ...defaultColumnProps,
    align: 'left' as const,
  },
  {
    title: 'Retail Sales',
    dataIndex: 'retailSales',
    key: 'retailSales',
    sorter: createSorter('retailSales'),
    render: (value: number) => renderCell(formatCurrency(value)),
    ...defaultColumnProps,
  },
  {
    title: 'Wholesale Sales',
    dataIndex: 'wholesaleSales',
    key: 'wholesaleSales',
    sorter: createSorter('wholesaleSales'),
    render: (value: number) => renderCell(formatCurrency(value)),
    ...defaultColumnProps,
  },
  {
    title: 'Units Sold',
    dataIndex: 'unitsSold',
    key: 'unitsSold',
    sorter: createSorter('unitsSold'),
    render: (value: number) => renderCell(value.toString()),
    ...defaultColumnProps,
  },
  {
    title: 'Retailer Margin',
    dataIndex: 'retailerMargin',
    key: 'retailerMargin',
    sorter: createSorter('retailerMargin'),
    render: (value: number) => renderCell(formatCurrency(value)),
    ...defaultColumnProps,
  },
];

function renderCell(content: string, align: string = 'center'): JSX.Element {
  const className =
    align === 'left' ? 'left-aligned-cell' : 'right-aligned-cell';
  return <div className={className}>{content}</div>;
}

function formatDate(dateStr: string): string {
  try {
    const date = parseISO(dateStr);
    return format(date, 'MM-dd-yyyy');
  } catch (error) {
    console.error('Failed to format date', { dateStr, error });
    return dateStr;
  }
}

function formatCurrency(value: number, locale = 'en-US'): string {
  try {
    return `$${value.toLocaleString(locale)}`;
  } catch (error) {
    console.error('Failed to format currency', { value, locale, error });
    return `$${value}`;
  }
}
