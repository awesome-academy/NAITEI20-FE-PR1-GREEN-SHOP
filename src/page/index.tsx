import React, { useEffect } from 'react'
import { Product } from '../types/product.type';
import http from '../utils/http';
import ProductCard from '../components/ProductCard';
import "../assets/styles/home.scss";
import { Tabs } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

function Home() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const getListProduct = async () => {
    try {
      const res = await http.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getListProduct();
  }, [])

  return (
    <div className="max-w-[1140px] mx-auto mb-20">
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: 'Sản phẩm nổi bật',
            key: '1',
            children:
            (<div className="flex flex-items justify-center gap-8">
              <div>
                <ProductCard product={products[0]} className="card-large mb-5" />
                <div className="flex items-center gap-8">
                  <ProductCard product={products[1]} />
                  <ProductCard product={products[2]} />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-8 mb-5">
                  <ProductCard product={products[3]} />
                  <ProductCard product={products[5]} />
                </div>
                <ProductCard product={products[5]} className="card-large" />
              </div>
            </div>),
          },
        ]}
      />

      <div className="flex gap-8">
        <Tabs
          className='w-[23%]'
          defaultActiveKey="1"
          items={[
            {
              label: 'Sản phẩm mua nhiều',
              key: '1',
              children:
              (<div className="">
                {products.slice(0,6).map((product) => <ProductCard showDiscount={false} key={product.id} product={product} className="flex w-full most-purchased-card" />)}
              </div>),
            },
          ]}
        />
        <div className="w-[76%]">
          <Tabs
            className="w-full"
            defaultActiveKey="1"
            items={[
              {
                label: 'Sản phẩm khuyến mãi',
                key: '1',
                children:
                (<div className="flex flex-wrap gap-9">
                  {products.slice(0,6).map((product) => <ProductCard key={product.id} product={product} showDiscount />)}
                </div>),
              },
            ]}
          />
        </div>
      </div>
      <div className="my-10 relative">
        <img src="/images/banner-home.jpg" className="w-full h-[200px] object-cover rounded-lg" alt="banner" />
        <div className="absolute top-10 right-10 text-white flex flex-col items-center gap-2 border border-2 border-white py-6 px-16">
          <p className="text-3xl">SƯƠNG RỒNG</p>
          <p className="text-4xl font-semibold">ĐÀ LẠT</p>
        </div>
      </div>
      <div className="flex gap-9 flex-wrap">
        {products.slice(0,8).map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  )
}

export default Home;
