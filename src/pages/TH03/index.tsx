import { Tabs, PageHeader, Layout } from "antd";
import NhanVien from "./NhanVien";
import LichHen from "./LichHen";
import DanhGia from "./DanhGia";
import ThongKe from "./ThongKe";

const { Content } = Layout;

export default function QuanLyDichVu() {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <PageHeader
        title="Quản lý dịch vụ & lịch hẹn"
        subTitle="Hệ thống quản lý nhân viên, lịch hẹn, đánh giá và thống kê"
        style={{ background: "#fff", marginBottom: 0 }}
      />
      <Content style={{ flex: 1, padding: "0 20px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <Tabs style={{ background: "transparent", marginTop: "-16px" }}>
          <Tabs.TabPane tab="Quản lý" key="1" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <NhanVien />
            <LichHen />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đánh giá" key="2" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <DanhGia />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Thống kê" key="3" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <ThongKe />
          </Tabs.TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}
