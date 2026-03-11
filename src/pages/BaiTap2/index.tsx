import React, { useEffect, useMemo, useState } from 'react';
import {
  Table,
  Tabs,
  Button,
  Tag,
  Modal,
  Select,
  Card,
  Statistic,
  Row,
  Col,
  message,
} from 'antd';

//type
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

type OrderProduct = {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
};

type OrderStatus = 'Chờ xử lý' | 'Đang giao' | 'Hoàn thành' | 'Đã hủy';

type Order = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  products: OrderProduct[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
};

//data
const INIT_PRODUCTS: Product[] = [
  { id: 1, name: 'Laptop Dell XPS 13', category: 'Laptop', price: 25000000, quantity: 15 },
  { id: 2, name: 'iPhone 15 Pro Max', category: 'Điện thoại', price: 30000000, quantity: 8 },
  { id: 3, name: 'Samsung Galaxy S24', category: 'Điện thoại', price: 22000000, quantity: 20 },
  { id: 4, name: 'iPad Air M2', category: 'Máy tính bảng', price: 18000000, quantity: 5 },
  { id: 5, name: 'MacBook Air M3', category: 'Laptop', price: 28000000, quantity: 12 },
  { id: 6, name: 'AirPods Pro 2', category: 'Phụ kiện', price: 6000000, quantity: 0 },
  { id: 7, name: 'Samsung Galaxy Tab S9', category: 'Máy tính bảng', price: 15000000, quantity: 7 },
  { id: 8, name: 'Logitech MX Master 3', category: 'Phụ kiện', price: 2500000, quantity: 25 },
];

const INIT_ORDERS: Order[] = [
  {
    id: 'DH001',
    customerName: 'Nguyễn Văn A',
    phone: '0912345678',
    address: '123 Nguyễn Huệ, Q1, TP.HCM',
    products: [
      { productId: 1, productName: 'Laptop Dell XPS 13', quantity: 1, price: 25000000 },
    ],
    totalAmount: 25000000,
    status: 'Chờ xử lý',
    createdAt: '2024-01-15',
  },
];

// components
const IndexPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);

  // load lc storage
  useEffect(() => {
    const p = localStorage.getItem('products');
    const o = localStorage.getItem('orders');

    setProducts(p ? JSON.parse(p) : INIT_PRODUCTS);
    setOrders(o ? JSON.parse(o) : INIT_ORDERS);
  }, []);

  //save localstorage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [products, orders]);

  //trang thai
  const renderProductStatus = (q: number) => {
    if (q === 0) return <Tag color="red">Hết hàng</Tag>;
    if (q <= 10) return <Tag color="orange">Sắp hết</Tag>;
    return <Tag color="green">Còn hàng</Tag>;
  };

  //dastboard
  const totalStockValue = useMemo(
    () => products.reduce((sum, p) => sum + p.price * p.quantity, 0),
    [products],
  );

  const revenue = useMemo(
    () =>
      orders
        .filter((o) => o.status === 'Hoàn thành')
        .reduce((sum, o) => sum + o.totalAmount, 0),
    [orders],
  );

  // bang san pham
  const productColumns = [
    { title: 'STT', render: (_: unknown, __: Product, i: number) => i + 1 },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
    },
    { title: 'Danh mục', dataIndex: 'category' },
    {
      title: 'Giá',
      dataIndex: 'price',
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: 'Tồn kho',
      dataIndex: 'quantity',
      sorter: (a: Product, b: Product) => a.quantity - b.quantity,
    },
    {
      title: 'Trạng thái',
      render: (_: unknown, r: Product) => renderProductStatus(r.quantity),
    },
  ];

  // dat hang
  const updateOrderStatus = (order: Order, newStatus: OrderStatus) => {
    const updatedProducts = [...products];

    if (order.status !== 'Hoàn thành' && newStatus === 'Hoàn thành') {
      order.products.forEach((op) => {
        const p = updatedProducts.find((x) => x.id === op.productId);
        if (p) p.quantity -= op.quantity;
      });
    }

    if (order.status === 'Hoàn thành' && newStatus === 'Đã hủy') {
      order.products.forEach((op) => {
        const p = updatedProducts.find((x) => x.id === op.productId);
        if (p) p.quantity += op.quantity;
      });
    }

    setProducts(updatedProducts);
    setOrders(
      orders.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o)),
    );

    message.success('Cập nhật trạng thái thành công');
  };

  const orderColumns = [
    { title: 'Mã đơn', dataIndex: 'id' },
    { title: 'Khách hàng', dataIndex: 'customerName' },
    { title: 'Số SP', render: (_: unknown, r: Order) => r.products.length },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      sorter: (a: Order, b: Order) => a.totalAmount - b.totalAmount,
    },
    {
      title: 'Trạng thái',
      render: (_: unknown, r: Order) => (
        <Select<OrderStatus>
          value={r.status}
          onChange={(v) => updateOrderStatus(r, v)}
          style={{ width: 140 }}
        >
          <Select.Option value="Chờ xử lý">Chờ xử lý</Select.Option>
          <Select.Option value="Đang giao">Đang giao</Select.Option>
          <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
          <Select.Option value="Đã hủy">Đã hủy</Select.Option>
        </Select>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      sorter: (a: Order, b: Order) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Thao tác',
      render: (_: unknown, r: Order) => (
        <Button onClick={() => setDetailOrder(r)}>Chi tiết</Button>
      ),
    },
  ];

  return (
    <>
      {/*dashboard*/}
      <Row gutter={16}>
        <Col span={6}><Card><Statistic title="Sản phẩm" value={products.length} /></Card></Col>
        <Col span={6}><Card><Statistic title="Giá trị tồn kho" value={totalStockValue} /></Card></Col>
        <Col span={6}><Card><Statistic title="Đơn hàng" value={orders.length} /></Card></Col>
        <Col span={6}><Card><Statistic title="Doanh thu" value={revenue} /></Card></Col>
      </Row>

      <Tabs style={{ marginTop: 20 }}>
        <Tabs.TabPane tab="Quản lý Sản phẩm" key="1">
          <Table<Product>
            rowKey="id"
            columns={productColumns}
            dataSource={products}
            pagination={{ pageSize: 5 }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Quản lý Đơn hàng" key="2">
          <Table<Order>
            rowKey="id"
            columns={orderColumns}
            dataSource={orders}
            style={{ marginTop: 16 }}
          />
        </Tabs.TabPane>
      </Tabs>

      <Modal
        visible={!!detailOrder}
        title="Chi tiết đơn hàng"
        onCancel={() => setDetailOrder(null)}
        footer={null}
      >
        {detailOrder && (
          <>
            <p><b>Khách hàng:</b> {detailOrder.customerName}</p>
            <p><b>Số điện thoại:</b> {detailOrder.phone}</p>
            <p><b>Địa chỉ:</b> {detailOrder.address}</p>
            {detailOrder.products.map((p) => (
              <p key={p.productId}>
                {p.productName} × {p.quantity}
              </p>
            ))}
          </>
        )}
      </Modal>
    </>
  );
};

export default IndexPage;
