import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import FilterButtons from '../components/ProductList/FilterButtons';
import ProductList from '../components/ProductList/ProductList';

const Home = () => {
  const { productList } = useContext(AppContext);
  const [searchParams] = useSearchParams();

  const categories = useMemo(() => {
    return Array.from(new Set(productList.map((product) => product.category)));
  }, [productList]);


  const filteredProducts = useMemo(() => {
    let result = [...productList];


    const query = searchParams.get('query');
    if (query) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }


    const category = searchParams.get('category');
    if (category && categories.includes(category)) {
      result = result.filter((product) => product.category === category);
    }


    const sort = searchParams.get('sort');
    if (sort) {
      switch (sort) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'new':
          result.sort(
            (a, b) =>
              new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
          );
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }
    return result;
  }, [productList, searchParams]);

  return (
    <div className="min-h-screen bg-primary-dark text-white-custom font-poppins">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">New Arrivals</h1>
        <div className="mb-8">
          <FilterButtons categories={categories} />
        </div>
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
};

export default Home;