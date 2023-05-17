import {PieChartOutlined, SettingOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Descriptions,
  Layout,
  Menu,
  message,
  Modal,
  QRCode,
  Table,
  Tag,
  theme,
  Typography
} from 'antd';
import {useState} from 'react';
import {Footer, Logo} from "@/components/index";
import moment from "moment";
import axios from "axios";
import {API_ROUTES} from "./api/config";
import {columns, orderData} from "../orderTable";

const {Header, Content, Sider} = Layout;
const {Title} = Typography;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const MOCKING_ORDER_DATA = {
  trackingNumber: "PLANTY000001",
  amount: 5000,
  receiverContact: "0123456789"
}

const items = [
  getItem('Dashboard', '1', <PieChartOutlined/>),
  getItem('Orders', '2', <ShoppingCartOutlined/>),
  getItem('Settings', '3', <SettingOutlined/>),
];

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer},
  } = theme.useToken();

  const [open, setOpen] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);
  const showModal = async () => {
    setOpen(true);
    const res = await axios.post(API_ROUTES.ZOD_QUERY_INVOICE, {
      mc_ref_id: "230516_155810",
    });

    const res2 = await axios.post(API_ROUTES.ZOD_QUERY_STATUS, {
      mcRefId: "230516_155810",
    });

    console.log(res.data)
    console.log(res2.data)
  };
  const handleOk = () => {
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const createInvoice = async () => {
    setLoading(true);
    const transID = Math.floor(Math.random() * 1000000);
    const mcRefId = `${moment().format('YYMMDD')}_${transID}`;
    const res = await axios.post(API_ROUTES.ZOD_CREATE_INVOICE, {
      mcRefId: mcRefId,
      amount: MOCKING_ORDER_DATA.amount,
      receiver: {
        contact: MOCKING_ORDER_DATA.receiverContact
      },
      orderInfo: [
        {
          trackingNumber: MOCKING_ORDER_DATA.trackingNumber,
          description: `Planty Order ${MOCKING_ORDER_DATA.trackingNumber}`,
          amount: MOCKING_ORDER_DATA.amount
        }
      ]
    });
    console.log(res.data)
    message.success('Created ZOD invoice successfully!');
    setLoading(false);
    setQrCode(res.data.orderUrl);
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById('zod-qrcode')?.querySelector('canvas');
    console.log(canvas)
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.download = 'QRCode.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  return (
      <Layout
          style={{
            minHeight: '100vh',
          }}
      >
        <Sider width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div
              style={{
                height: 32,
                margin: 16,
              }}
          >
            <Logo/>
          </div>

          <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline" items={items}/>
        </Sider>
        <Layout className="site-layout">
          <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
          />
          <Content
              style={{
                margin: '0 16px',
              }}
          >
            <Breadcrumb
                style={{
                  margin: '16px 0',
                }}
            >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Orders</Breadcrumb.Item>
              <Breadcrumb.Item>{MOCKING_ORDER_DATA.trackingNumber}</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                }}
            >
              <Descriptions title="Order Info">
                <Descriptions.Item label="Tracking Number">{MOCKING_ORDER_DATA.trackingNumber}</Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag color='geekblue'>UNPAID</Tag>
                </Descriptions.Item>
              </Descriptions>
              <Descriptions title="Receiver Info">
                <Descriptions.Item label="UserName">Nguyen Van A</Descriptions.Item>
                <Descriptions.Item label="Telephone">{MOCKING_ORDER_DATA.receiverContact}</Descriptions.Item>
                <Descriptions.Item label="Address">
                  District 7, Ho Chi Minh City
                </Descriptions.Item>
              </Descriptions>
              <br/>
              <Title level={5}>Order Items</Title>
              <Table columns={columns} dataSource={orderData}/>
              <div className="flex flex-col items-end border-t py-4 mt-8">
                <Button onClick={createInvoice} type="primary" size="large" loading={loading} className="zod-btn">
                  Create ZOD Invoice
                </Button>
                {qrCode !== '' ?
                    <Button onClick={showModal} type="primary" size="large" className="zod-btn" danger>
                      Show QR Code
                    </Button> : ''
                }
              </div>

              <Modal
                  open={open}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  width={400}

                  footer={[]}>
                <div className="zod-qrcode-wrapper">
                  <div id="zod-qrcode">
                    <Title level={5}>Planty ZOD</Title>
                    <p>Tracking number: {MOCKING_ORDER_DATA.trackingNumber}</p>
                    <br/>
                    <QRCode
                        value={qrCode}
                        bordered={false}
                        size={250}
                        style={{
                          marginBottom: 20,
                        }}
                    />
                    <Button key="submit" type="primary" onClick={downloadQRCode}>
                      Download QRCode
                    </Button>
                  </div>
                </div>
              </Modal>

            </div>
          </Content>
          <Footer/>
        </Layout>
      </Layout>
  );
};
export default Home;