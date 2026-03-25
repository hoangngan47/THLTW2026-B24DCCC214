import { useState } from "react";
import { Card, Table, Button, Modal, Form, Input, Select, DatePicker, TimePicker, message, Space, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { lichHenList, nhanVienList, dichVuList, LichHen as ILichHen } from "./data";
import dayjs from "dayjs";

export default function LichHen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingId, setEditingId] = useState<number | null>(null);

  const checkConflict = (nhanVienId: number, ngay: string, gio: string, thoiGianPhut: number, excludeId?: number): boolean => {
    const gioBatDauMoi = parseInt(gio.split(":")[0]) * 60 + parseInt(gio.split(":")[1]);
    const gioKetThucMoi = gioBatDauMoi + thoiGianPhut;

    return lichHenList.some((lh) => {
      if (lh.nhanVienId !== nhanVienId || lh.ngay !== ngay) return false;
      if (excludeId && lh.id === excludeId) return false;
      if (lh.trangThai === "huy") return false;

      const gioBatDauHien = parseInt(lh.gio.split(":")[0]) * 60 + parseInt(lh.gio.split(":")[1]);
      const gioKetThucHien = gioBatDauHien + (dichVuList.find(d => d.id === lh.dichVuId)?.thoiGianThucHien || 0);

      return !(gioKetThucMoi <= gioBatDauHien || gioBatDauMoi >= gioKetThucHien);
    });
  };

  const handleAdd = () => {
    form.validateFields().then((values) => {
      const dichVu = dichVuList.find(d => d.id === parseInt(values.dichVuId));
      const ngay = values.ngay.format("YYYY-MM-DD");
      const gio = values.gio.format("HH:mm");

      if (checkConflict(parseInt(values.nhanVienId), ngay, gio, dichVu?.thoiGianThucHien || 0, editingId || undefined)) {
        message.error("Lịch trùng! Nhân viên này đã có cuộc hẹn tại thời gian này.");
        return;
      }

      if (editingId) {
        const index = lichHenList.findIndex((l) => l.id === editingId);
        if (index > -1) {
          lichHenList[index] = {
            ...lichHenList[index],
            khachHang: values.khachHang,
            sdt: values.sdt,
            email: values.email,
            nhanVienId: parseInt(values.nhanVienId),
            dichVuId: parseInt(values.dichVuId),
            ngay: ngay,
            gio: gio,
            tienDich: dichVu?.gia || 0,
            ghiChu: values.ghiChu || ""
          };
          message.success("Đã cập nhật lịch hẹn!");
        }
        setEditingId(null);
      } else {
        lichHenList.push({
          id: Math.max(...lichHenList.map((l) => l.id), 0) + 1,
          khachHang: values.khachHang,
          sdt: values.sdt,
          email: values.email,
          nhanVienId: parseInt(values.nhanVienId),
          dichVuId: parseInt(values.dichVuId),
          ngay: ngay,
          gio: gio,
          trangThai: "choDuyet",
          tienDich: dichVu?.gia || 0,
          ghiChu: values.ghiChu || ""
        });
        message.success("Đã tạo lịch hẹn mới!");
      }
      setIsModalVisible(false);
      form.resetFields();
      setRefreshKey((k) => k + 1);
    });
  };

  const handleEdit = (record: ILichHen) => {
    form.setFieldsValue({
      khachHang: record.khachHang,
      sdt: record.sdt,
      email: record.email,
      nhanVienId: record.nhanVienId.toString(),
      dichVuId: record.dichVuId.toString(),
      ngay: dayjs(record.ngay),
      gio: dayjs(record.gio, "HH:mm"),
      ghiChu: record.ghiChu
    });
    setEditingId(record.id);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn chắc chắn muốn xóa lịch hẹn này?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk() {
        const index = lichHenList.findIndex((l) => l.id === id);
        if (index > -1) {
          lichHenList.splice(index, 1);
          message.success("Đã xóa lịch hẹn!");
          setRefreshKey((k) => k + 1);
        }
      }
    });
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    const index = lichHenList.findIndex((l) => l.id === id);
    if (index > -1) {
      lichHenList[index].trangThai = newStatus as any;
      message.success("Đã cập nhật trạng thái!");
      setRefreshKey((k) => k + 1);
    }
  };

  const getStatusTag = (status: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      "choDuyet": { color: "orange", text: "Chờ duyệt" },
      "xacNhan": { color: "blue", text: "Xác nhận" },
      "hoanThanh": { color: "green", text: "Hoàn thành" },
      "huy": { color: "red", text: "Hủy" }
    };
    return <Tag color={statusMap[status]?.color}>{statusMap[status]?.text}</Tag>;
  };

  const columns = [
    { title: "Khách hàng", dataIndex: "khachHang", key: "khachHang" },
    { title: "SĐT", dataIndex: "sdt", key: "sdt" },
    {
      title: "Nhân viên",
      key: "nhanVienId",
      render: (_: any, record: any) => nhanVienList.find(n => n.id === record.nhanVienId)?.ten || "N/A"
    },
    {
      title: "Dịch vụ",
      key: "dichVuId",
      render: (_: any, record: any) => dichVuList.find(d => d.id === record.dichVuId)?.ten || "N/A"
    },
    { title: "Ngày", dataIndex: "ngay", key: "ngay" },
    { title: "Giờ", dataIndex: "gio", key: "gio" },
    { title: "Tiền", key: "tienDich", render: (_: any, record: any) => record.tienDich.toLocaleString() + " đ" },
    {
      title: "Trạng thái",
      key: "trangThai",
      render: (_: any, record: any) => getStatusTag(record.trangThai)
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="small">
          <Button size="small" onClick={() => handleEdit(record)} icon={<EditOutlined />} />
          <Select
            size="small"
            style={{ width: 100 }}
            value={record.trangThai}
            onChange={(val) => handleStatusChange(record.id, val)}
            options={[
              { label: "Chờ duyệt", value: "choDuyet" },
              { label: "Xác nhận", value: "xacNhan" },
              { label: "Hoàn thành", value: "hoanThanh" },
              { label: "Hủy", value: "huy" }
            ]}
          />
          <Button danger size="small" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </Space>
      )
    }
  ];

  return (
    <div style={{ marginBottom: "-1px" }}>
      <Card
        title="Quản lý lịch hẹn"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => {
            setEditingId(null);
            form.resetFields();
            setIsModalVisible(true);
          }}>
            Đặt lịch hẹn
          </Button>
        }
        style={{ marginBottom: "0px", marginTop: "0px" }}
      >
        <Table key={refreshKey} columns={columns} dataSource={lichHenList} rowKey="id" pagination={{ pageSize: 10 }} scroll={{ x: 1200 }} />

        <Modal
          title={editingId ? "Cập nhật lịch hẹn" : "Đặt lịch hẹn mới"}
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
            <Form.Item name="khachHang" label="Tên khách hàng" rules={[{ required: true }]} style={{ marginBottom: "8px" }}>
              <Input />
            </Form.Item>
            <Form.Item name="sdt" label="SĐT" rules={[{ required: true }]} style={{ marginBottom: "8px" }}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ type: "email" }]} style={{ marginBottom: "8px" }}>
              <Input />
            </Form.Item>
            <Form.Item name="nhanVienId" label="Nhân viên" rules={[{ required: true }]} style={{ marginBottom: "8px" }}>
              <Select placeholder="Chọn nhân viên">
                {nhanVienList.map(nv => <Select.Option key={nv.id} value={nv.id.toString()}>{nv.ten}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item name="dichVuId" label="Dịch vụ" rules={[{ required: true }]} style={{ marginBottom: "8px" }}>
              <Select placeholder="Chọn dịch vụ">
                {dichVuList.map(dv => <Select.Option key={dv.id} value={dv.id.toString()}>{dv.ten} - {dv.gia.toLocaleString()}đ ({dv.thoiGianThucHien}p)</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item name="ngay" label="Ngày hẹn" rules={[{ required: true }]} style={{ marginBottom: "8px" }}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="gio" label="Giờ hẹn" rules={[{ required: true }]} style={{ marginBottom: "8px" }}>
              <TimePicker format="HH:mm" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="ghiChu" label="Ghi chú" style={{ marginBottom: "8px" }}>
              <Input.TextArea rows={2} />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}
