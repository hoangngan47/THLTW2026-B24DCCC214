import { useState } from "react";
import { Card, Table, Button, Modal, Form, Input, Select, InputNumber, message, Divider, Space, Row, Col } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { nhanVienList, dichVuList, NhanVien as INhanVien } from "./data";

const thuArray = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export default function NhanVien() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDichVuModalVisible, setIsDichVuModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAdd = () => {
    form.validateFields().then((values) => {
      if (editingId) {
        const index = nhanVienList.findIndex((n) => n.id === editingId);
        if (index > -1) {
          nhanVienList[index] = {
            ...nhanVienList[index],
            ...values,
            khachToiDa: parseInt(values.khachToiDa),
            lichLamViec: {
              thuBatDau: parseInt(values.thuBatDau),
              thuKetThuc: parseInt(values.thuKetThuc),
              gioBatDau: values.gioBatDau,
              gioKetThuc: values.gioKetThuc
            }
          };
          message.success("Đã cập nhật nhân viên!");
        }
        setEditingId(null);
      } else {
        nhanVienList.push({
          id: Math.max(...nhanVienList.map((n) => n.id), 0) + 1,
          ten: values.ten,
          sdt: values.sdt,
          email: values.email,
          trangThai: "hoatDong",
          khachToiDa: parseInt(values.khachToiDa),
          lichLamViec: {
            thuBatDau: parseInt(values.thuBatDau),
            thuKetThuc: parseInt(values.thuKetThuc),
            gioBatDau: values.gioBatDau,
            gioKetThuc: values.gioKetThuc
          }
        });
        message.success("Đã thêm nhân viên mới!");
      }
      setIsModalVisible(false);
      form.resetFields();
      setRefreshKey((k) => k + 1);
    });
  };

  const handleEdit = (record: INhanVien) => {
    form.setFieldsValue({
      ten: record.ten,
      sdt: record.sdt,
      email: record.email,
      khachToiDa: record.khachToiDa,
      thuBatDau: record.lichLamViec.thuBatDau.toString(),
      thuKetThuc: record.lichLamViec.thuKetThuc.toString(),
      gioBatDau: record.lichLamViec.gioBatDau,
      gioKetThuc: record.lichLamViec.gioKetThuc
    });
    setEditingId(record.id);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn chắc chắn muốn xóa nhân viên này?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk() {
        const index = nhanVienList.findIndex((n) => n.id === id);
        if (index > -1) {
          nhanVienList.splice(index, 1);
          message.success("Đã xóa nhân viên!");
          setRefreshKey((k) => k + 1);
        }
      }
    });
  };

  const handleAddDichVu = () => {
    form.validateFields().then((values) => {
      dichVuList.push({
        id: Math.max(...dichVuList.map((d) => d.id), 0) + 1,
        ten: values.tenDichVu,
        gia: parseInt(values.giaDichVu),
        thoiGianThucHien: parseInt(values.thoiGianDichVu),
        moTa: values.moTaDichVu || ""
      });
      message.success("Đã thêm dịch vụ mới!");
      setIsDichVuModalVisible(false);
      form.resetFields();
      setRefreshKey((k) => k + 1);
    });
  };

  const handleDeleteDichVu = (id: number) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn chắc chắn muốn xóa dịch vụ này?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk() {
        const index = dichVuList.findIndex((d) => d.id === id);
        if (index > -1) {
          dichVuList.splice(index, 1);
          message.success("Đã xóa dịch vụ!");
          setRefreshKey((k) => k + 1);
        }
      }
    });
  };

  const nhanVienColumns = [
    { title: "Tên", dataIndex: "ten", key: "ten" },
    { title: "SĐT", dataIndex: "sdt", key: "sdt" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Khách/ngày", dataIndex: "khachToiDa", key: "khachToiDa" },
    {
      title: "Lịch làm",
      key: "lich",
      render: (_: any, record: any) => (
        <span>{thuArray[record.lichLamViec.thuBatDau]}-{thuArray[record.lichLamViec.thuKetThuc]} ({record.lichLamViec.gioBatDau}-{record.lichLamViec.gioKetThuc})</span>
      )
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (text: string) => text === "hoatDong" ? "Hoạt động" : "Nghỉ"
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="small">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} size="small" />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} size="small" />
        </Space>
      )
    }
  ];

  const dichVuColumns = [
    { title: "Tên dịch vụ", dataIndex: "ten", key: "ten" },
    { title: "Giá", dataIndex: "gia", key: "gia", render: (text: number) => text.toLocaleString() + " đ" },
    { title: "Thời gian (phút)", dataIndex: "thoiGianThucHien", key: "thoiGianThucHien" },
    { title: "Mô tả", dataIndex: "moTa", key: "moTa" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Button danger icon={<DeleteOutlined />} onClick={() => handleDeleteDichVu(record.id)} size="small" />
      )
    }
  ];

  return (
    <div style={{ marginBottom: "-1px" }}>
      <Card
        title="Quản lý nhân viên"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => {
            setEditingId(null);
            form.resetFields();
            setIsModalVisible(true);
          }}>
            Thêm nhân viên
          </Button>
        }
        style={{ marginBottom: "0px", marginTop: "16px" }}
      >
        <Table key={refreshKey} columns={nhanVienColumns} dataSource={nhanVienList} rowKey="id" pagination={false} />

        <Modal
          title={editingId ? "Cập nhật nhân viên" : "Thêm nhân viên mới"}
          visible={isModalVisible}
          onOk={handleAdd}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
            setEditingId(null);
          }}
          width={600}
        >
          <Form form={form} layout="vertical" style={{ marginBottom: 0 }}>
            <Form.Item name="ten" label="Tên" rules={[{ required: true, message: "Vui lòng nhập tên" }]} style={{ marginBottom: "8px" }}>
              <Input />
            </Form.Item>
            <Form.Item name="sdt" label="SĐT" rules={[{ required: true, message: "Vui lòng nhập SĐT" }]} style={{ marginBottom: "8px" }}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ type: "email", message: "Email không hợp lệ" }]} style={{ marginBottom: "8px" }}>
              <Input />
            </Form.Item>
            <Form.Item name="khachToiDa" label="Khách tối đa/ngày" rules={[{ required: true, message: "Vui lòng nhập số khách" }]} style={{ marginBottom: "8px" }}>
              <InputNumber min={1} max={20} />
            </Form.Item>
            <Divider style={{ margin: "12px 0" }}>Lịch làm việc</Divider>
            <Row gutter={16}>
              <Col xs={12}>
                <Form.Item name="thuBatDau" label="Từ thứ" rules={[{ required: true }]} style={{ marginBottom: "8px" }}>
                  <Select>
                    {thuArray.map((t, i) => <Select.Option key={i} value={i.toString()}>{t}</Select.Option>)}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item name="thuKetThuc" label="Đến thứ" rules={[{ required: true }]} style={{ marginBottom: "8px" }}>
                  <Select>
                    {thuArray.map((t, i) => <Select.Option key={i} value={i.toString()}>{t}</Select.Option>)}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={12}>
                <Form.Item name="gioBatDau" label="Giờ bắt đầu" rules={[{ required: true }]} style={{ marginBottom: "8px" }}>
                  <Input type="time" />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item name="gioKetThuc" label="Giờ kết thúc" rules={[{ required: true }]} style={{ marginBottom: "8px" }}>
                  <Input type="time" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Card>

      <div style={{ marginBottom: "-1px" }}>
        <Card
          title="Quản lý dịch vụ"
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={() => {
              form.resetFields();
              setIsDichVuModalVisible(true);
            }}>
              Thêm dịch vụ
            </Button>
          }
          style={{ marginBottom: "0px", marginTop: "0px" }}
        >
          <Table key={refreshKey} columns={dichVuColumns} dataSource={dichVuList} rowKey="id" pagination={false} />

          <Modal
            title="Thêm dịch vụ mới"
            visible={isDichVuModalVisible}
            onOk={handleAddDichVu}
            onCancel={() => {
              setIsDichVuModalVisible(false);
              form.resetFields();
            }}
          >
            <Form form={form} layout="vertical" style={{ marginBottom: 0 }}>
              <Form.Item name="tenDichVu" label="Tên dịch vụ" rules={[{ required: true, message: "Vui lòng nhập tên" }]} style={{ marginBottom: "8px" }}>
                <Input />
              </Form.Item>
              <Form.Item name="giaDichVu" label="Giá (đ)" rules={[{ required: true, message: "Vui lòng nhập giá" }]} style={{ marginBottom: "8px" }}>
                <InputNumber min={0} />
              </Form.Item>
              <Form.Item name="thoiGianDichVu" label="Thời gian thực hiện (phút)" rules={[{ required: true }]} style={{ marginBottom: "8px" }}>
                <InputNumber min={5} step={5} />
              </Form.Item>
              <Form.Item name="moTaDichVu" label="Mô tả" style={{ marginBottom: "8px" }}>
                <Input.TextArea rows={2} />
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </div>
    </div>
  );
}
