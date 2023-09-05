import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DrawAttributes } from './components/DrawAttributes';
import Page from './page';
import { getProductByKey } from './components/product-functions';

const expectedProd = {
  id: 'd722a425-aef3-4eee-bce3-0e3829053ea8',
  name: {
    'en-US': 'Honeycomb wall hanging',
    ru: 'Панно медовое',
  },
  slug: {
    'en-US': 'honeycomb',
    ru: 'honeycomb',
  },
  masterVariant: {
    id: 1,
    sku: 'U0005',
    key: 'U0005',
    prices: [
      {
        id: '36a786e9-581e-47e2-9232-0aaef27c331f',
        value: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 3300,
          fractionDigits: 2,
        },
      },
    ],
    images: [
      {
        url: 'https://static.tildacdn.com/stor3065-3634-4633-b330-643930373864/80820334.jpg ',
        dimensions: {
          w: 0,
          h: 0,
        },
      },
      {
        url: ' https://static.tildacdn.com/stor6536-6538-4766-b233-613230313666/92812729.jpg ',
        dimensions: {
          w: 0,
          h: 0,
        },
      },
      {
        url: ' https://static.tildacdn.com/stor6163-6665-4263-b564-386634626630/74378147.jpg',
        dimensions: {
          w: 0,
          h: 0,
        },
      },
    ],
    attributes: [
      {
        name: 'glass-color',
        value: 'yellow',
      },
      {
        name: 'measures',
        value: '21x18cm',
      },
      {
        name: 'materials',
        value: 'glass, tin solder, copper foil, herbarium',
      },
    ],
    assets: [],
  },
};
jest.mock('next/navigation', () => ({ useRouter: jest.fn().mockReturnValue('') }));
jest.mock('./components/product-functions', () => ({
  getProductByKey: jest.fn().mockReturnValue({ product: expectedProd }),
}));
jest.mock('./components/DrawAttributes', () => ({ DrawAttributes: jest.fn().mockReturnValue('') }));

describe('Product page', () => {
  it('renders product info', async () => {
    const Result = await Page({ params: { key: '1' } });
    render(Result);

    expect(screen.getByText('Honeycomb wall hanging')).toBeInTheDocument();
    expect(getProductByKey).toHaveBeenCalled();
    expect(getProductByKey).toHaveBeenCalledWith('1');
  });
});
