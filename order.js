export const OrderStatus = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  UNPAID: 'UNPAID'
};

export const columns = [
  {
    title: 'OrderId',
    dataIndex: 'orderId',
    key: 'orderId',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Image',
    dataIndex: 'image',
    render: (text) => <img className="order-item-img" src={text} alt=""/>
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Amount',
    className: 'column-money',
    dataIndex: 'amount',
    align: 'right',
  },
];

export const orderData = [
  {
    key: '1',
    orderId: "001",
    image: '/plants/monstera-deliciosa.png',
    name: 'Alocasia Zebrina',
    quantity: 1,
    amount: '130.000 VND'
  },
  {
    key: '2',
    orderId: "002",
    image: '/plants/kentiapalm.png',
    name: 'Alocasia Zebrina',
    quantity: 1,
    amount: '200.000 VND'
  },
  {
    key: '3',
    orderId: "003",
    image: '/plants/euphorbia.png',
    name: 'Alocasia Zebrina',
    quantity: 2,
    amount: '100.000 VND'
  },
];