import { useState } from "react";
import { Card, Table, Button, Modal, Form, Input, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { quyetDinhList, soList } from "./data";

export default function QuyetDinh() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdd = () => {
    form.validateFields().then((values) => {
      quyetDinhList.push({
        id: Math.max(...quyetDinhList.map((q) => q.id), 0) + 1,
        soQD: values.soQD,
        ngay: values.ngay,
        trichYeu: values.trichYeu,
        soId: parseInt(values.soId),
        luotTraCuu: 0,
      });

      message.success("Đã thêm quyết định!");
      setIsModalVisible(false);
      form.resetFields();
      setRefreshKey((k) => k + 1);
    });
  };

  const columns = [
    { title: "Số QĐ", dataIndex: "soQD", key: "soQD" },
    {
      title: "Ngày",
      dataIndex: "ngay",
      key: "ngay",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    { title: "Trích yếu", dataIndex: "trichYeu", key: "trichYeu" },
    {
      title: "Sổ năm",
      key: "soYear",
      render: (_: any, record: any) => {
        const so = soList.find((s) => s.id === record.soId);
        return so?.year || "N/A";
      },
    },
    {
      title: "Lượt tra cứu",
      dataIndex: "luotTraCuu",
      key: "luotTraCuu",
      render: (text: number) => <span style={{ color: "#D73345", fontWeight: 600 }}>{text}</span>,
    },
  ];

  return (
    <div style={{ marginBottom: "-1px" }}>
      <Card
        title="Quyết định tốt nghiệp"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            Thêm quyết định
          </Button>
      }
      style={{ marginBottom: "0px", marginTop: "0px" }}
    >
      <Table
        key={refreshKey}
        columns={columns}
        dataSource={quyetDinhList}
        rowKey="id"
        pagination={false}
      />

      <Modal
        title="Thêm quyết định"
        visible={isModalVisible}
        onOk={handleAdd}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical" style={{ marginBottom: 0 }}>
          <Form.Item name="soQD" label="Số QĐ" rules={[{ required: true, message: "Vui lòng nhập số QĐ" }]} style={{ marginBottom: "8px" }}>
            <Input />
          </Form.Item>
          <Form.Item name="ngay" label="Ngày" rules={[{ required: true, message: "Vui lòng chọn ngày" }]} style={{ marginBottom: "8px" }}>
            <Input type="date" />
          </Form.Item>
          <Form.Item name="trichYeu" label="Trích yếu" rules={[{ required: true, message: "Vui lòng nhập trích yếu" }]} style={{ marginBottom: "8px" }}>
            <Input />
          </Form.Item>
          <Form.Item name="soId" label="Sổ" rules={[{ required: true, message: "Vui lòng chọn sổ" }]} style={{ marginBottom: "8px" }}>
            <Select placeholder="Chọn sổ">
              {soList.map((s) => (
                <Select.Option key={s.id} value={s.id}>
                  Sổ năm {s.year}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
    </div>
  );
}