import { useState } from "react";
import { Card, Form, Button, Table, Input, Select, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { soList, vanBangList, fields, quyetDinhList, VanBang, Field } from "./data";

export default function VanBangPage() {
  const [form] = Form.useForm();
  const [mode, setMode] = useState<"form" | "config">("form");
  const [newField, setNewField] = useState<Partial<Field>>({ name: "", type: "string" });
  const [nextFieldId, setNextFieldId] = useState(fields.length + 1);

  const handleAdd = () => {
    form.validateFields().then((values) => {
      const so = soList[0];
      const newNumber = so.currentNumber + 1;
      so.currentNumber = newNumber;

      const newVB: VanBang = {
        id: vanBangList.length + 1,
        soVaoSo: newNumber,
        soHieu: values.soHieu,
        msv: values.msv,
        hoTen: values.hoTen,
        ngaySinh: values.ngaySinh,
        quyetDinhId: parseInt(values.quyetDinhId),
        extra: {},
      };

      fields.forEach((f) => {
        newVB.extra[f.name] = values[f.name] || "";
      });

      vanBangList.push(newVB);
      message.success("Đã thêm văn bằng thành công!");
      form.resetFields();
    });
  };

  const handleAddField = () => {
    if (!newField.name || !newField.type) {
      message.error("Vui lòng điền tên trường và chọn kiểu!");
      return;
    }

    fields.push({
      id: nextFieldId,
      name: newField.name,
      type: newField.type as "string" | "number" | "date",
    });

    setNextFieldId(nextFieldId + 1);
    setNewField({ name: "", type: "string" });
    message.success("Đã thêm trường thông tin!");
  };

  const handleDeleteField = (fieldId: number) => {
    const index = fields.findIndex((f) => f.id === fieldId);
    if (index > -1) {
      fields.splice(index, 1);
      message.success("Đã xóa trường thông tin!");
    }
  };

  const fieldColumns = [
    { title: "Tên trường", dataIndex: "name", key: "name" },
    { title: "Kiểu dữ liệu", dataIndex: "type", key: "type" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Button danger onClick={() => handleDeleteField(record.id)} icon={<DeleteOutlined />} size="small">
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div style={{ marginBottom: "-1px" }}>
      <Card
        title="Thêm văn bằng"
        extra={
          <Button
            onClick={() => setMode(mode === "form" ? "config" : "form")}
          >
            {mode === "form" ? "Cấu hình biểu mẫu" : "Ẩn cấu hình"}
          </Button>
        }
        style={{ marginBottom: "0px", marginTop: "0px" }}
      >
      {mode === "form" ? (
        <Form form={form} layout="vertical" style={{ marginBottom: 0 }}>
          <Form.Item name="soHieu" label="Số hiệu" rules={[{ required: true, message: "Vui lòng nhập số hiệu" }]} style={{ marginBottom: "8px" }}>
            <Input />
          </Form.Item>

          <Form.Item name="msv" label="MSV" rules={[{ required: true, message: "Vui lòng nhập MSV" }]} style={{ marginBottom: "8px" }}>
            <Input />
          </Form.Item>

          <Form.Item name="hoTen" label="Họ tên" rules={[{ required: true, message: "Vui lòng nhập họ tên" }]} style={{ marginBottom: "8px" }}>
            <Input />
          </Form.Item>

          <Form.Item name="ngaySinh" label="Ngày sinh" rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]} style={{ marginBottom: "8px" }}>
            <Input type="date" />
          </Form.Item>

          <Form.Item name="quyetDinhId" label="Quyết định" rules={[{ required: true, message: "Vui lòng chọn quyết định" }]} style={{ marginBottom: "8px" }}>
            <Select placeholder="Chọn quyết định">
              {quyetDinhList.map((qd) => (
                <Select.Option key={qd.id} value={qd.id}>
                  {qd.soQD} - {qd.trichYeu}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {fields.map((f) => (
            <Form.Item key={f.id} name={f.name} label={f.name} style={{ marginBottom: "8px" }}>
              <Input type={f.type === "date" ? "date" : f.type === "number" ? "number" : "text"} />
            </Form.Item>
          ))}

          <Form.Item>
            <Button type="primary" onClick={handleAdd} block>
              Thêm
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div>
          <h4>Danh sách trường hiện tại</h4>
          <Table columns={fieldColumns} dataSource={fields} rowKey="id" pagination={false} />

          <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #f0f0f0" }}>
            <h4>Thêm trường mới</h4>
            <Form layout="vertical">
              <Form.Item label="Tên trường">
                <Input
                  value={newField.name || ""}
                  onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                />
              </Form.Item>

              <Form.Item label="Kiểu dữ liệu">
                <Select
                  value={newField.type || "string"}
                  onChange={(val) => setNewField({ ...newField, type: val })}
                >
                  <Select.Option value="string">String</Select.Option>
                  <Select.Option value="number">Number</Select.Option>
                  <Select.Option value="date">Date</Select.Option>
                </Select>
              </Form.Item>

              <Button type="primary" onClick={handleAddField} block>
                Thêm trường
              </Button>
            </Form>
          </div>
        </div>
      )}
    </Card>
    </div>
  );
}