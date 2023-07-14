"use client";
import Hero from "@/app/components/hero/Hero";
import OrderDetail from "@/app/components/profile/profilecomponents/OrderDetail";
import { useParams } from "next/navigation";

const page = () => {
  const order = useParams();
  return (
    <div>
      {order.orderNumber}
      <Hero
        title={`Order: ${order.orderNumber}`}
        desc=""
        url="https://gongcha.com.vn/wp-content/uploads/2018/03/Banner-Trang-Ch%E1%BB%A7-k%E1%BA%BF-%C4%91%E1%BB%8Ba-ch%E1%BB%89-CH-800x380-01.jpg"
      />
      <OrderDetail />
    </div>
  );
};

export default page;
