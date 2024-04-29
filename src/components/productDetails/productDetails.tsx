import { useEffect } from 'react';
import SalesChart from '../salesChart/salesChart';
import SalesTable from '../salesTable/salesTable';
import LeftBar from '../leftBar/leftBar';
import { ProductState } from '../types';
import { fetchStart, fetchSuccess, fetchFailure } from '../../data/redux_store';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  SidebarContainer,
  MainContent,
  ChartContainer,
  TableContainer,
} from './productDetailsStyles';

function ProductDetails() {
  const {
    data: product,
    loading,
    error,
  } = useSelector((state: { product: ProductState }) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart());
      try {
        const mockFetch = () =>
          Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve(require('../../data/shark_ninja_sales.json')),
          });

        const response = await mockFetch(); // const response = await fetch('https://api.example.com/products');

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();
        if (data.length === 0) {
          throw new Error('No products found');
        }
        dispatch(fetchSuccess(data[0]));
      } catch (error: any) {
        console.error('Error:', error);
        dispatch(fetchFailure(error.toString()));
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product data available.</div>;

  return (
    <Container>
      <SidebarContainer>
        <LeftBar {...product} />
      </SidebarContainer>
      <MainContent>
        <ChartContainer>
          <SalesChart salesData={product.sales} />
        </ChartContainer>
        <TableContainer>
          <SalesTable salesData={product.sales} />
        </TableContainer>
      </MainContent>
    </Container>
  );
}

export default ProductDetails;
