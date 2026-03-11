import { useState } from "react"
import { Input, Button, Table } from "antd"

interface MonHocType {
  key: number
  ma: string
  ten: string
  tc: number
}

export default function MonHoc() {

  const [list, setList] = useState<MonHocType[]>([])

  const [ma, setMa] = useState<string>("")
  const [ten, setTen] = useState<string>("")
  const [tc, setTc] = useState<number>(0)

  const add = () => {

    const mon: MonHocType = {
      key: Date.now(),
      ma: ma,
      ten: ten,
      tc: tc
    }

    setList([...list, mon])
  }

  const columns = [
    { title: "Mã môn", dataIndex: "ma" },
    { title: "Tên môn", dataIndex: "ten" },
    { title: "Tín chỉ", dataIndex: "tc" }
  ]

  return (
    <div>

      <Input
        placeholder="Mã môn"
        onChange={(e) => setMa(e.target.value)}
        style={{ width: 150, marginRight: 10 }}
      />

      <Input
        placeholder="Tên môn"
        onChange={(e) => setTen(e.target.value)}
        style={{ width: 200, marginRight: 10 }}
      />

      <Input
        type="number"
        placeholder="Tín chỉ"
        onChange={(e) => setTc(Number(e.target.value))}
        style={{ width: 100, marginRight: 10 }}
      />

      <Button type="primary" onClick={add}>
        Thêm môn
      </Button>

      <Table
        columns={columns}
        dataSource={list}
        style={{ marginTop: 20 }}
      />

    </div>
  )
}