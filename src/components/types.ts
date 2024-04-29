export interface SalesChartProps {
  salesData: SalesData[];
}

export interface SalesTableEntry extends SalesData {
  key: number;
}

export interface SalesData {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

export interface Product {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: Review[];
  retailer: string;
  details: string[];
  tags: string[];
  sales: SalesData[];
}

export interface Review {
  customer: string;
  review: string;
  score: number;
}

export interface ProductState {
  data: Product | null;
  loading: boolean;
  error: string | null;
}
