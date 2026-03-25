import { useState } from "react";
import { Card, Table, Button, Modal, Form, Input, Rate, message, Space, Divider, Select } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { danhGiaList, lichHenList, nhanVienList, DanhGia as IDanhGia } from "./data";

export default function DanhGia() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedDanhGia, setSelectedDanhGia] = useState<IDanhGia | null>(null);

  const getCompletedAppointments = () => {
    return lichHenList.filter((l) => l.trangThai === "hoanThanh");
  };

  const getUnratedAppointments = () => {
    const ratedIds = new Set(danhGiaList.map((d) => d.lichHenId));
    return getCompletedAppointments().filter((l) => !ratedIds.has(l.id));
  };

  const handleAddRating = () => {
    form.validateFields().then((values) => {
      const lichHenId = parseInt(values.lichHenId);
      
      if (danhGiaList.some(d => d.lichHenId === lichHenId)) {
        message.error("Lịch hẹn này đã được đánh giá!");
        return;
      }

      danhGiaList.push({
        id: Math.max(...danhGiaList.map((d) => d.id), 0) + 1,
        lichHenId: lichHenId,
        sao: parseInt(values.sao),
        binhluan: values.binhluan,
        ngayDanhGia: new Date().toISOString().split("T")[0]
      });
      message.success("Đã đánh giá dịch vụ!");
      setIsModalVisible(false);
      form.resetFields();
      setRefreshKey((k) => k + 1);
    });
  };

  const handleReply = () => {
    form.validateFields().then((values) => {
      if (selectedDanhGia) {
        const index = danhGiaList.findIndex((d) => d.id === selectedDanhGia.id);
        if (index > -1) {
          danhGiaList[index].phanHoiNhanVien = values.phanHoi;
          danhGiaList[index].ngayPhanHoi = new Date().toISOString().split("T")[0];
          message.success("Đã phản hồi đánh giá!");
          setIsReplyModalVisible(false);
          form.resetFields();
          setSelectedDanhGia(null);
          setRefreshKey((k) => k + 1);
        }
      }
    });
  };

  const handleDeleteRating = (id: number) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn chắc chắn muốn xóa đánh giá này?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk() {
        const index = danhGiaList.findIndex((d) => d.id === id);
        if (index > -1) {
          danhGiaList.splice(index, 1);
          message.success("Đã xóa đánh giá!");
          setRefreshKey((k) => k + 1);
        }
      }
    });
  };

  const getEmployeeStats = () => {
    const stats: Record<number, { totalRating: number; count: number }> = {};
    danhGiaList.forEach((dg) => {
      const lh = lichHenList.find((l) => l.id === dg.lichHenId);
      if (lh) {
        if (!stats[lh.nhanVienId]) {
          stats[lh.nhanVienId] = { totalRating: 0, count: 0 };
        }
        stats[lh.nhanVienId].totalRating += dg.sao;
        stats[lh.nhanVienId].count += 1;
      }
    });
    return stats;
  };

  const getAverageRating = (nhanVienId: number) => {
    const stats = getEmployeeStats();
    if (!stats[nhanVienId] || stats[nhanVienId].count === 0) return 0;
    return (stats[nhanVienId].totalRating / stats[nhanVienId].count).toFixed(1);
  };

  const getRatingCount = (nhanVienId: number) => {
    const stats = getEmployeeStats();
    return stats[nhanVienId]?.count || 0;
  };

  const getLichHenInfo = (lichHenId: number) => {
    return lichHenList.find((l) => l.id === lichHenId);
  };

  const getNhanVienName = (nhanVienId: number) => {
    return nhanVienList.find((n) => n.id === nhanVienId)?.ten || "N/A";
  };

  const danhGiaColumns = [
    {
      title: "Lịch hẹn",
      key: "lichHen",
      render: (_: any, record: any) => {
        const lh = getLichHenInfo(record.lichHenId);
        return lh ? `${lh.khachHang} - ${lh.ngay} ${lh.gio}` : "N/A";
      }
    },
    {
      title: "Nhân viên",
      key: "nhanVien",
      render: (_: any, record: any) => {
        const lh = getLichHenInfo(record.lichHenId);
        return lh ? getNhanVienName(lh.nhanVienId) : "N/A";
      }
    },
    {
      title: "Đánh giá",
      key: "sao",
      render: (_: any, record: any) => <Rate disabled value={record.sao} />
    },
    { title: "Bình luận", dataIndex: "binhluan", key: "binhluan", ellipsis: true },
    { title: "Ngày đánh giá", dataIndex: "ngayDanhGia", key: "ngayDanhGia" },
    {
      title: "Phản hồi",
      key: "phanHoi",
      render: (_: any, record: any) => (
        record.phanHoiNhanVien ? (
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <span style={{ color: "#666", fontSize: "12px" }}>Đã phản hồi {record.ngayPhanHoi}</span>
          </Space>
        ) : (
          <Button type="link" size="small" onClick={() => {
            setSelectedDanhGia(record);
            setIsReplyModalVisible(true);
          }}>
            Phản hồi
          </Button>
        )
      )
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Button danger icon={<DeleteOutlined />} onClick={() => handleDeleteRating(record.id)} size="small" />
      )
    }
  ];

  const employeeRatingColumns = [
    { title: "Nhân viên", key: "ten", render: (_: any, record: any) => record.ten },
    {
      title: "Đánh giá trung bình",
      key: "rating",
      render: (_: any, record: any) => {
        const ratingStr = getAverageRating(record.id);
        const avg = typeof ratingStr === "string" ? parseFloat(ratingStr) : 0;
        return avg > 0 ? <Rate disabled value={avg} allowHalf /> : "Chưa có";
      }
    },
    {
      title: "Điểm",
      key: "diem",
      render: (_: any, record: any) => getAverageRating(record.id)
    },
    {
      title: "Số lượt đánh giá",
      key: "count",
      render: (_: any, record: any) => getRatingCount(record.id)
    }
  ];

  return (
    <div style={{ marginBottom: "-1px" }}>
      <Card
        title="Đánh giá dịch vụ & nhân viên"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => {
            form.resetFields();
            setIsModalVisible(true);
          }}>
            Thêm đánh giá
          </Button>
        }
        style={{ marginBottom: "0px", marginTop: "0px" }}
      >
        {getUnratedAppointments().length === 0 ? (
          <p style={{ color: "#666" }}>Tất cả lịch hẹn hoàn thành đã được đánh giá hoặc không có lịch hoàn thành.</p>
        ) : (
          <p style={{ color: "#D73345", fontWeight: 600 }}>Có {getUnratedAppointments().length} lịch hẹn chờ đánh giá</p>
        )}

        <Table key={refreshKey} columns={danhGiaColumns} dataSource={danhGiaList} rowKey="id" pagination={false} scroll={{ x: 1200 }} />

        <Divider />

        <h3>Đánh giá trung bình theo nhân viên</h3>
        <Table columns={employeeRatingColumns} dataSource={nhanVienList} rowKey="id" pagination={false} />

        <Modal
          title="Thêm đánh giá"
          visible={isModalVisible}
          onOk={handleAddRating}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
          }}
          width={600}
        >
          <Form form={form} layout="vertical" style={{ marginBottom: 0 }}>
            <Form.Item name="lichHenId" label="Lịch hẹn" rules={[{ required: true }]} style={{ marginBottom: "8px" }}>
              <Select placeholder="Chọn lịch hẹn" disabled={getUnratedAppointments().length === 0}>
                {getUnratedAppointments().map((lh) => (
                  <Select.Option key={lh.id} value={lh.id.toString()}>
                    {lh.khachHang} - {getNhanVienName(lh.nhanVienId)} - {lh.ngay} {lh.gio}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="sao" label="Đánh giá sao" rules={[{ required: true }]} style={{ marginBottom: "8px" }}>
              <Rate />
            </Form.Item>
            <Form.Item name="binhluan" label="Bình luận" rules={[{ required: true }]} style={{ marginBottom: "8px" }}>
              <Input.TextArea rows={3} placeholder="Chia sẻ cảm nhận của bạn" />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Phản hồi đánh giá"
          visible={isReplyModalVisible}
          onOk={handleReply}
          onCancel={() => {
            setIsReplyModalVisible(false);
            form.resetFields();
            setSelectedDanhGia(null);
          }}
        >
          {selectedDanhGia && (
            <>
              <div style={{ marginBottom: "16px", padding: "12px", background: "#f5f5f5", borderRadius: "4px" }}>
                <p><strong>Đánh giá:</strong> <Rate disabled value={selectedDanhGia.sao} /></p>
                <p><strong>Bình luận:</strong> {selectedDanhGia.binhluan}</p>
                <p><strong>Ngày:</strong> {selectedDanhGia.ngayDanhGia}</p>
              </div>
              <Form form={form} layout="vertical" style={{ marginBottom: 0 }}>
                <Form.Item name="phanHoi" label="Phản hồi của bạn" rules={[{ required: true }]} style={{ marginBottom: "8px" }}>
                  <Input.TextArea rows={3} placeholder="Cảm ơn đánh giá của bạn..." />
                </Form.Item>
              </Form>
            </>
          )}
        </Modal>
      </Card>
    </div>
  );
}
