import React from 'react';
import { Card } from 'antd';
import { Product } from '../types';
import './leftBar.css';

const LeftBar: React.FC<Product> = ({ image, title, subtitle, tags }) => {
  return (
    <Card className='card-style' hoverable={true}>
      <div>
        <img src={image} alt={title} className='image-style' />
        <h1 className='titleStyle'>{title}</h1>
        <p className='subtitle-style'>{subtitle}</p>
      </div>
      <div className='divider'></div>
      <div className='button-container'>
        {tags.map((element, index) => (
          <button key={index} className='button-style'>
            {element}
          </button>
        ))}
      </div>
      <div className='divider'></div>
    </Card>
  );
};

export default LeftBar;
