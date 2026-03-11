import { useState } from "react"
import { Input, Button, Table } from "antd"

interface Khoi {
  key: number
  name: string
}

export default function KhoiKienThuc() {

  const [list, setList] = useState<Khoi[]>([])
  const [name, setName] = useState<string>("")

  const add = () => {

    if (!name) return

    const item: Khoi = {
      key: Date.now(),
      name: name
    }

    setList([...list, item])
    setName("")
  }

  const columns = [
    {
      title: "Tên khối kiến thức",
      dataIndex: "name"
    }
  ]

  return (
    <div>

      <Input
        placeholder="Nhập tên khối"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: 300, marginRight: 10 }}
      />

      <Button type="primary" onClick={add}>
        Thêm
      </Button>

      <Table
        columns={columns}
        dataSource={list}
        style={{ marginTop: 20 }}
      />

    </div>
  )
}