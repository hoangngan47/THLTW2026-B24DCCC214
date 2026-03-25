import { useState } from "react";
import { Card, Form, Button, Table, Input, Row, Col, message, Empty } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { vanBangList, quyetDinhList, VanBang } from "./data";

export default function TraCuu() {
  const [search, setSearch] = useState<Record<string, string>>({});
  const [result, setResult] = useState<VanBang[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const filledParams = Object.entries(search)
      .filter(([_, v]) => v && v.trim() !== "")
      .map(([key, _]) => key);

    if (filledParams.length < 2) {
      message.error("Vui lòng nhập ít nhất 2 tham số tìm kiếm!");
      return;
    }

    const res = vanBangList.filter((v) => {
      return (
        (!search.soHieu || v.soHieu.toLowerCase().includes(search.soHieu.toLowerCase())) &&
        (!search.soVaoSo || v.soVaoSo.toString().includes(search.soVaoSo)) &&
        (!search.msv || v.msv.toLowerCase().includes(search.msv.toLowerCase())) &&
        (!search.hoTen || v.hoTen.toLowerCase().includes(search.hoTen.toLowerCase())) &&
        (!search.ngaySinh || v.ngaySinh.includes(search.ngaySinh))
      );
    });

    const quyetDinhIds = new Set(res.map((r) => r.quyetDinhId));
    quyetDinhIds.forEach((qdId) => {
      const qd = quyetDinhList.find((q) => q.id === qdId);
      if (qd) {
        qd.luotTraCuu++;
      }
    });

    setResult(res);
    setSearched(true);
    message.success(`Tìm thấy ${res.length} kết quả`);
  };

  const handleReset = () => {
    setSearch({});
    setResult([]);
    setSearched(false);
    message.info("Đã xóa tìm kiếm");
  };

  const getQuyetDinhInfo = (qdId: number) => {
    return quyetDinhList.find((q) => q.id === qdId);
  };

  const columns = [
    { title: "Số vào sổ", dataIndex: "soVaoSo", key: "soVaoSo" },
    { title: "Số hiệu", dataIndex: "soHieu", key: "soHieu" },
    { title: "MSV", dataIndex: "msv", key: "msv" },
    { title: "Họ tên", dataIndex: "hoTen", key: "hoTen" },
    { title: "Ngày sinh", dataIndex: "ngaySinh", key: "ngaySinh" },
    {
      title: "Quyết định",
      key: "qd",
      render: (_: any, record: any) => {
        const qd = getQuyetDinhInfo(record.quyetDinhId);
        return qd ? qd.soQD : "N/A";
      },
    },
  ];

  return (
    <div style={{ marginBottom: "-1px" }}>
      <Card title="Tra cứu văn bằng" style={{ marginBottom: "0px", marginTop: "16px" }}>
      <Form layout="vertical" style={{ marginBottom: 0 }}>
        <p style={{ color: "#666", fontStyle: "italic", marginBottom: "12px" }}>
          *Nhập ít nhất 2 tham số để tìm kiếm
        </p>

        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Số hiệu" style={{ marginBottom: "8px" }}>
              <Input
                placeholder="Số hiệu"
                value={search.soHieu || ""}
                onChange={(e) => setSearch({ ...search, soHieu: e.target.value })}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Số vào sổ" style={{ marginBottom: "8px" }}>
              <Input
                type="number"
                placeholder="Số vào sổ"
                value={search.soVaoSo || ""}
                onChange={(e) => setSearch({ ...search, soVaoSo: e.target.value })}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="MSV" style={{ marginBottom: "8px" }}>
              <Input
                placeholder="Mã sinh viên"
                value={search.msv || ""}
                onChange={(e) => setSearch({ ...search, msv: e.target.value })}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Họ tên" style={{ marginBottom: "8px" }}>
              <Input
                placeholder="Họ tên"
                value={search.hoTen || ""}
                onChange={(e) => setSearch({ ...search, hoTen: e.target.value })}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Ngày sinh" style={{ marginBottom: "8px" }}>
              <Input
                type="date"
                value={search.ngaySinh || ""}
                onChange={(e) => setSearch({ ...search, ngaySinh: e.target.value })}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginBottom: "8px" }}>
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} style={{ marginRight: "10px" }}>
            Tìm
          </Button>
          <Button icon={<ClearOutlined />} onClick={handleReset}>
            Xóa
          </Button>
        </Form.Item>
      </Form>

      {searched && (
        <div style={{ marginTop: "20px" }}>
          <h4>Kết quả tìm kiếm: {result.length} kết quả</h4>
          {result.length === 0 ? (
            <Empty description="Không tìm thấy kết quả nào" />
          ) : (
            <Table columns={columns} dataSource={result} rowKey="id" pagination={{ pageSize: 10 }} />
          )}
        </div>
      )}
    </Card>
    </div>
  );
}