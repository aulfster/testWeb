import styled from 'styled-components';

const marginTopBottom = '50px';
const marginLeft = '20px';
const marginRight = '20px';
const noMargin = '0px';

export const SidebarContainer = styled.div`
  margin: ${marginTopBottom} ${marginRight} ${marginTopBottom} ${marginLeft};
  flex: 1;
`;

export const MainContent = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: ${marginTopBottom} ${marginRight} ${marginTopBottom} ${noMargin};
`;

export const ChartContainer = styled.div`
  margin-bottom: ${marginTopBottom};
`;

export const TableContainer = styled.div`
  margin-top: ${noMargin};
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
`;
