import { useState } from "react"
import { Input, Select, Button, Table } from "antd"

interface Question {
  key: number
  content: string
  level: string
}

export default function CauHoi() {

  const [list, setList] = useState<Question[]>([])

  const [content, setContent] = useState<string>("")
  const [level, setLevel] = useState<string>("Dễ")

  const add = () => {

    const q: Question = {
      key: Date.now(),
      content: content,
      level: level
    }

    setList([...list, q])
    setContent("")
  }

  const columns = [
    { title: "Nội dung câu hỏi", dataIndex: "content" },
    { title: "Mức độ", dataIndex: "level" }
  ]

  return (
    <div>

      <Input.TextArea
        placeholder="Nội dung câu hỏi"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Select
        defaultValue="Dễ"
        style={{ width: 150, marginTop: 10 }}
        onChange={(value) => setLevel(value)}
        options={[
          { value: "Dễ", label: "Dễ" },
          { value: "Trung bình", label: "Trung bình" },
          { value: "Khó", label: "Khó" },
          { value: "Rất khó", label: "Rất khó" }
        ]}
      />

      <br />

      <Button
        type="primary"
        onClick={add}
        style={{ marginTop: 10 }}
      >
        Thêm câu hỏi
      </Button>

      <Table
        columns={columns}
        dataSource={list}
        style={{ marginTop: 20 }}
      />

    </div>
  )
}