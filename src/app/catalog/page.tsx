import CatalogService, { Filters } from '@/service/api/CatalogService';
import CatalogCard from './components/catalogCard';
import { cardsInfo } from './utils/cards';
import CatalogNavPanel from './components/navPanel';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const catalogService = new CatalogService();
  const filters: Filters = {
    color: searchParams.color,
    priceFrom: Number(searchParams.priceFrom),
    priceTo: Number(searchParams.priceTo),
  };

  const products = await catalogService.getProductsByFilters(filters);
  const productsArr = cardsInfo(products);
  return (
    <>
      <CatalogNavPanel products={products} />
      <div className="min-[1100px]:columns-3 gap-6 mx-4 min-[820px]:columns-2 min-[1320px]:columns-4 columns-1 ">
      {products.length !== 0 ? productsArr.map((p) => (
          <CatalogCard key={p.name} product={p} />
        )) : <p className=' text-xl text-emerald-900'>No matching results</p>}
      </div>
    </>
  );
}
