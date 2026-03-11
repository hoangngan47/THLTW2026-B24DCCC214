import { useState } from "react"
import { Button, InputNumber, Table, message } from "antd"

interface Question {
  id: number
  content: string
  level: string
}

export default function DeThi() {

  const [soDe, setSoDe] = useState<number>(0)
  const [soTB, setSoTB] = useState<number>(0)

  const [deThi, setDeThi] = useState<Question[]>([])

  const questions: Question[] = [
    { id: 1, content: "Câu dễ 1", level: "Dễ" },
    { id: 2, content: "Câu dễ 2", level: "Dễ" },
    { id: 3, content: "Câu trung bình 1", level: "Trung bình" }
  ]

  const taoDe = () => {

    const de = questions.filter(q => q.level === "Dễ").slice(0, soDe)

    const tb = questions.filter(q => q.level === "Trung bình").slice(0, soTB)

    if (de.length < soDe || tb.length < soTB) {
      message.error("Không đủ câu hỏi")
      return
    }

    setDeThi([...de, ...tb])
  }

  const columns = [
    { title: "Nội dung", dataIndex: "content" },
    { title: "Mức độ", dataIndex: "level" }
  ]

  return (
    <div>

      <div style={{ marginBottom: 20 }}>

        Số câu dễ:

        <InputNumber
          value={soDe}
          onChange={(value) => setSoDe(Number(value) || 0)}
          style={{ marginRight: 20 }}
        />

        Số câu trung bình:

        <InputNumber
          value={soTB}
          onChange={(value) => setSoTB(Number(value) || 0)}
        />

        <Button
          type="primary"
          onClick={taoDe}
          style={{ marginLeft: 20 }}
        >
          Tạo đề
        </Button>

      </div>

      <Table
        columns={columns}
        dataSource={deThi}
        rowKey="id"
      />

    </div>
  )
}