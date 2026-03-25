import { useState } from "react";
import { Card, Table, Button, Modal, Form, Input, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { soList, vanBangList } from "./data";

export default function SoVanBang() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateNewSo = () => {
    form.validateFields().then((values) => {
      const newYear = parseInt(values.year);
      if (newYear < 2000 || newYear > 2100) {
        message.error("Năm không hợp lệ!");
        return;
      }
      const exists = soList.find((s) => s.year === newYear);
      if (exists) {
        message.error("Năm này đã tồn tại!");
        return;
      }
      soList.push({
        id: Math.max(...soList.map((s) => s.id), 0) + 1,
        year: newYear,
        currentNumber: 0,
      });
      message.success("Đã tạo sổ mới!");
      setIsModalVisible(false);
      form.resetFields();
      setRefreshKey((k) => k + 1);
    });
  };

  const handleResetSo = (soId: number) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn chắc chắn muốn reset sổ này?",
      onOk() {
        const so = soList.find((s) => s.id === soId);
        if (so) {
          so.currentNumber = 0;
          message.success("Đã reset sổ!");
          setRefreshKey((k) => k + 1);
        }
      },
    });
  };

  const columns = [
    { title: "Năm", dataIndex: "year", key: "year" },
    { title: "Số hiện tại", dataIndex: "currentNumber", key: "currentNumber" },
    {
      title: "Số văn bằng trong sổ",
      key: "count",
      render: (_: any, record: any) => {
        const count = vanBangList.filter((v) => v.soVaoSo <= record.currentNumber).length;
        return count;
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Button danger onClick={() => handleResetSo(record.id)} icon={<DeleteOutlined />}>
          Reset
        </Button>
      ),
    },
  ];

  return (
    <div style={{ marginBottom: "-1px" }}>
      <Card
        title="Quản lý sổ văn bằng"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            Tạo sổ mới
          </Button>
        }
        style={{ marginBottom: "0px", marginTop: "16px" }}
      >
      <Table
        key={refreshKey}
        columns={columns}
        dataSource={soList}
        rowKey="id"
        pagination={false}
      />

      <Modal
        title="Tạo sổ văn bằng mới"
        visible={isModalVisible}
        onOk={handleCreateNewSo}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical" style={{ marginBottom: 0 }}>
          <Form.Item name="year" label="Năm" rules={[{ required: true, message: "Vui lòng nhập năm" }]} style={{ marginBottom: "8px" }}>
            <Input type="number" min="2000" max="2100" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
    </div>
  );
}