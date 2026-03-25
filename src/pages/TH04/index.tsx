import { Tabs, PageHeader, Layout } from "antd";
import SoVanBang from "./SoVanBang";
import QuyetDinh from "./QuyetDinh";
import VanBang from "./VanBang";
import TraCuu from "./TraCuu";

const { Content } = Layout;

export default function BaiTap2() {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <PageHeader
        title="Quản lý văn bằng tốt nghiệp"
        subTitle="Hệ thống quản lý sổ văn bằng và tra cứu thông tin"
        style={{ background: "#fff", marginBottom: 0 }}
      />
      <Content style={{ flex: 1, padding: "0 20px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <Tabs style={{ background: "transparent", marginTop: "-16px" }}>
          <Tabs.TabPane tab="Quản lý" key="1" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <SoVanBang />
            <QuyetDinh />
            <VanBang />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tra cứu" key="2" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <TraCuu />
          </Tabs.TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}