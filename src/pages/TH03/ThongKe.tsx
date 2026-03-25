import { useState } from "react";
import { Card, Table, Row, Col, Statistic, DatePicker, Select, Button, Divider } from "antd";
import { lichHenList, nhanVienList, dichVuList } from "./data";
import moment from "moment";

export default function ThongKe() {
  const [filterType, setFilterType] = useState("thang");
  const [selectedDate, setSelectedDate] = useState(moment());

  const getCompletedAppointments = () => {
    return lichHenList.filter((l) => l.trangThai === "hoanThanh");
  };

  const getAppointmentsByDate = () => {
    const completed = getCompletedAppointments();
    if (filterType === "ngay") {
      const dayKey = moment(selectedDate).format("YYYY-MM-DD");
      return completed.filter((l) => l.ngay === dayKey);
    } else if (filterType === "thang") {
      const monthKey = moment(selectedDate).format("YYYY-MM");
      return completed.filter((l) => l.ngay.startsWith(monthKey));
    }
    return completed;
  };

  const getAppointmentStats = () => {
    const completed = getAppointmentsByDate();
    const stats: Record<string, number> = {};
    
    completed.forEach((lh) => {
      const key = filterType === "ngay" ? lh.gio : lh.ngay;
      stats[key] = (stats[key] || 0) + 1;
    });

    return Object.entries(stats).map(([key, value]) => ({ time: key, soLuong: value }));
  };

  const getRevenueByService = () => {
    const completed = getAppointmentsByDate();
    const revenue: Record<number, number> = {};
    
    completed.forEach((lh) => {
      revenue[lh.dichVuId] = (revenue[lh.dichVuId] || 0) + lh.tienDich;
    });

    return Object.entries(revenue).map(([serviceId, total]) => {
      const service = dichVuList.find((d) => d.id === parseInt(serviceId));
      return { name: service?.ten || "N/A", revenue: total };
    });
  };

  const getRevenueByEmployee = () => {
    const completed = getAppointmentsByDate();
    const revenue: Record<number, number> = {};
    
    completed.forEach((lh) => {
      revenue[lh.nhanVienId] = (revenue[lh.nhanVienId] || 0) + lh.tienDich;
    });

    return Object.entries(revenue).map(([empId, total]) => {
      const emp = nhanVienList.find((n) => n.id === parseInt(empId));
      return { name: emp?.ten || "N/A", revenue: total };
    });
  };

  const getEmployeeStats = () => {
    const completed = getAppointmentsByDate();
    const stats: Record<number, { appointments: number; revenue: number }> = {};
    
    completed.forEach((lh) => {
      if (!stats[lh.nhanVienId]) {
        stats[lh.nhanVienId] = { appointments: 0, revenue: 0 };
      }
      stats[lh.nhanVienId].appointments += 1;
      stats[lh.nhanVienId].revenue += lh.tienDich;
    });

    return nhanVienList.map((emp) => ({
      ten: emp.ten,
      luotHen: stats[emp.id]?.appointments || 0,
      doanhThu: stats[emp.id]?.revenue || 0
    }));
  };

  const getTotalStats = () => {
    const completed = getAppointmentsByDate();
    const totalRevenue = completed.reduce((sum, l) => sum + l.tienDich, 0);
    return {
      appointments: completed.length,
      revenue: totalRevenue,
      avgRevenue: completed.length > 0 ? totalRevenue / completed.length : 0
    };
  };

  const appointmentStats = getAppointmentStats();
  const revenueByService = getRevenueByService();
  const revenueByEmployee = getRevenueByEmployee();
  const employeeStats = getEmployeeStats();
  const totalStats = getTotalStats();

  const employeeColumns = [
    { title: "Tên nhân viên", dataIndex: "ten", key: "ten" },
    {
      title: "Số lượt hẹn",
      dataIndex: "luotHen",
      key: "luotHen",
      render: (text: number) => <strong>{text}</strong>
    },
    {
      title: "Doanh thu",
      dataIndex: "doanhThu",
      key: "doanhThu",
      render: (text: number) => <span style={{ color: "#D73345", fontWeight: 600 }}>{text.toLocaleString()} đ</span>
    }
  ];

  return (
    <div style={{ marginBottom: "-1px" }}>
      <Card
        title="Thống kê & Báo cáo"
        style={{ marginBottom: "0px", marginTop: "0px" }}
      >
        <Row gutter={16} style={{ marginBottom: "16px" }}>
          <Col xs={24} md={8}>
            <Select
              value={filterType}
              onChange={(val) => setFilterType(val)}
              style={{ width: "100%" }}
              options={[
                { label: "Theo ngày", value: "ngay" },
                { label: "Theo tháng", value: "thang" }
              ]}
            />
          </Col>
          <Col xs={24} md={8}>
            <DatePicker
              value={selectedDate}
              onChange={(date: any) => setSelectedDate(date || moment())}
              picker={filterType === "ngay" ? "date" : "month"}
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={24} md={8}>
            <Button
              type="primary"
              onClick={() => setSelectedDate(moment())}
              style={{ width: "100%" }}
            >
              Hôm nay
            </Button>
          </Col>
        </Row>

        <Divider />

        <Row gutter={16} style={{ marginBottom: "24px" }}>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic
                title="Tổng lượt hẹn"
                value={totalStats.appointments}
                suffix="lượt"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic
                title="Tổng doanh thu"
                value={totalStats.revenue}
                suffix="đ"
                valueStyle={{ color: "#D73345" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic
                title="Doanh thu trung bình"
                value={totalStats.avgRevenue.toFixed(0)}
                suffix="đ"
                valueStyle={{ color: "#52C41A" }}
              />
            </Card>
          </Col>
        </Row>

        <Divider />

        <h3>Thống kê lịch hẹn ({filterType === "ngay" ? "theo giờ" : "theo ngày"})</h3>
        {appointmentStats.length === 0 ? (
          <p style={{ color: "#999" }}>Không có dữ liệu</p>
        ) : (
          <Table
            columns={[
              { title: filterType === "ngay" ? "Giờ" : "Ngày", dataIndex: "time", key: "time" },
              { title: "Số lượng", dataIndex: "soLuong", key: "soLuong", render: (text) => <strong>{text}</strong> }
            ]}
            dataSource={appointmentStats.map((item, idx) => ({ ...item, key: idx }))}
            pagination={false}
          />
        )}

        <Divider />

        <Row gutter={24}>
          <Col xs={24} md={12}>
            <h3>Doanh thu theo dịch vụ</h3>
            {revenueByService.length === 0 ? (
              <p style={{ color: "#999" }}>Không có dữ liệu</p>
            ) : (
              <Table
                columns={[
                  { title: "Dịch vụ", dataIndex: "name", key: "name" },
                  { title: "Doanh thu", dataIndex: "revenue", key: "revenue", render: (text) => <span style={{ color: "#D73345", fontWeight: 600 }}>{text.toLocaleString()}đ</span> }
                ]}
                dataSource={revenueByService.map((item, idx) => ({ ...item, key: idx }))}
                pagination={false}
              />
            )}
          </Col>
          <Col xs={24} md={12}>
            <h3>Doanh thu theo nhân viên</h3>
            {revenueByEmployee.length === 0 ? (
              <p style={{ color: "#999" }}>Không có dữ liệu</p>
            ) : (
              <Table
                columns={[
                  { title: "Nhân viên", dataIndex: "name", key: "name" },
                  { title: "Doanh thu", dataIndex: "revenue", key: "revenue", render: (text) => <span style={{ color: "#52C41A", fontWeight: 600 }}>{text.toLocaleString()}đ</span> }
                ]}
                dataSource={revenueByEmployee.map((item, idx) => ({ ...item, key: idx }))}
                pagination={false}
              />
            )}
          </Col>
        </Row>

        <Divider />

        <h3>Chi tiết theo nhân viên</h3>
        <Table columns={employeeColumns} dataSource={employeeStats} rowKey="ten" pagination={false} />
      </Card>
    </div>
  );
}
