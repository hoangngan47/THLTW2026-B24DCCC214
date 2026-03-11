import { Tabs } from "antd"
import KhoiKienThuc from "./KhoiKienThuc"
import MonHoc from "./MonHoc"
import CauHoi from "./CauHoi"
import DeThi from "./DeThi"

export default function BaiTap2() {

  const items = [
    {
      key: "1",
      label: "Khối kiến thức",
      children: <KhoiKienThuc />
    },
    {
      key: "2",
      label: "Môn học",
      children: <MonHoc />
    },
    {
      key: "3",
      label: "Câu hỏi",
      children: <CauHoi />
    },
    {
      key: "4",
      label: "Tạo đề thi",
      children: <DeThi />
    }
  ]

  return (
    <div style={{ padding: 30 }}>
      <h1>Quản lý ngân hàng câu hỏi</h1>
      <Tabs items={items} />
    </div>
  )
}