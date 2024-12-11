import React, { useEffect, useState } from 'react'
import { Button, Divider, Input, Rate, Tabs, TabsProps } from 'antd'
import { HeartFilled, SearchOutlined, ShareAltOutlined } from "@ant-design/icons"
import http from '../../utils/http'
import { formatNumberWithDots } from '../../utils';
import { useParams } from 'react-router';
import { Product } from '../../types/product.type';

// interface IDetailProduct {
//   product:
// }

function DetailProduct() {
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState<number>(1);
  const [hoverImage, setHoverImage] = useState<string>('s');
  const [activeImage, setActiveImage] = useState<string>('/images/spx2-4.png');
  const { id } = useParams();
  const getDetailProduct = async () => {
    try {
      const response = await http.get(`/products/${id}`);
      setProduct(response.data);
      setActiveImage(response.data.images[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDetailProduct()
  }, []);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <p className="text-[#3FB871] px-8">THÔNG TIN SẢN PHẨM</p>,
      children: <ul className="flex flex-col gap-4 pl-8 text-[#898989] text-sm">
        <li className="flex items-center gap-2">
          <span>Tên phổ thông: </span>
          <span>{product?.commonName}</span>
        </li>
        <li className="flex items-center gap-2">
          <span>Tên khoa học:</span>
          <span>{product?.scientificName}</span>
        </li>
        <li className="flex items-center gap-2">
          <span>Họ thực vật:</span>
          <span>{product?.plantFamily}</span>
        </li>
        <li className="flex items-center gap-2">
          <span>Chiều cao:</span>
          <span>{product?.height}</span>
        </li>
        <li>{product?.origin}</li>
        <li>{product?.describe}</li>
      </ul>,
    },
    {
      key: '2',
      label: 'KHÁCH HÀNG ĐÁNH GIÁ',
      children: 'Content of Tab Pane 2',
    }
  ];

  return (
    <div className="py-[40px]">
      <div className="flex gap-8 max-w-[1140px] mx-[auto]">
        <div className="flex flex-col gap-2 w-1/3">
          <img src={hoverImage || activeImage} width={400} className="w-[400px] h-[400px]" alt={product?.name} />
          <div className="flex items-center gap-3 mt-8">
            {
              product?.images.map((image, index) => (
                <img
                  src={image}
                  alt="image"
                  key={index}
                  width={80}
                  height={80}
                  className={`object-cover rounded transition w-[80px] h-[80px] cursor-pointer hover:scale-110 ${activeImage === image && 'border-2 border-[#3FB871]'}`}
                  onClick={() =>setActiveImage(image)}
                  onMouseLeave={() => setHoverImage('')}
                  onMouseEnter={() => setHoverImage(image)}
                />
              ))
            }
          </div>
        </div>
        <div className="w-2/3">
          <p>{product?.name}</p>
          <Rate disabled defaultValue={product?.rating} />
          <div className="flex items-center gap-3">
            <p className="text-[#E50914]">{formatNumberWithDots(product?.price || 0)} VND</p>
            { product?.oldPrice && (<div className="text-xs line-through text-[#898989]">{formatNumberWithDots(product?.oldPrice)} VND</div>)}
          </div>
          <Divider/>
          <p className="text-xs text-[#898989]">{product?.description}</p>
          <Divider/>
          <div className="flex items-center gap-3">
            <span>Số lượng</span>
            <div className="flex items-center gap-2">
              <Button onClick={() => setQuantity(pre => pre - 1)}>-</Button>
              <Input className="w-[50px]" type='number' value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
              <Button onClick={() => setQuantity(pre => pre + 1)}>+</Button>
            </div>
          </div>
          <Divider/>
          <div className="flex items-center gap-3">
            <Button className="bg-[#3FB871] text-white rounded-3xl px-6 py-3">Mua ngay</Button>
            <div className="p-1 border w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer transition hover:bg-[#3FB871] group"><SearchOutlined style={{fontSize: '12px'}} className="group-hover:text-white" /></div>
            <div className="p-1 border w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[#3FB871] group"><HeartFilled style={{fontSize: '12px'}} className="group-hover:text-white" /></div>
            <div className="p-1 border w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[#3FB871] group"><ShareAltOutlined style={{fontSize: '12px'}} className="group-hover:text-white" /></div>
          </div>
        </div>
      </div >
      <div className="max-w-[1140px] mx-auto py-[50px]">
        <Tabs tabPosition="top" defaultActiveKey="1" items={items} />
      </div>
      {/* List products */}
      <div>
        
      </div>
    </div>
  )
}

export default DetailProduct
