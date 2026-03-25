// mau data
export interface NhanVien {
  id: number;
  ten: string;
  sdt: string;
  email: string;
  trangThai: "hoatDong" | "nghi";
  khachToiDa: number; // Số khách tối đa/ngày
  lichLamViec: {
    thuBatDau: number; // 0=CN, 1=T2, ..., 6=T7
    thuKetThuc: number;
    gioBatDau: string; // "09:00"
    gioKetThuc: string; // "17:00"
  };
}

export interface DichVu {
  id: number;
  ten: string;
  gia: number;
  thoiGianThucHien: number; // phút
  moTa: string;
}

export interface LichHen {
  id: number;
  khachHang: string;
  sdt: string;
  email: string;
  nhanVienId: number;
  dichVuId: number;
  ngay: string; // "2026-03-25"
  gio: string; // "09:00"
  trangThai: "choDuyet" | "xacNhan" | "hoanThanh" | "huy";
  tienDich: number; // Tính toán từ DichVu
  ghiChu: string;
}

export interface DanhGia {
  id: number;
  lichHenId: number;
  sao: number; // 1-5
  binhluan: string;
  ngayDanhGia: string;
  phanHoiNhanVien?: string;
  ngayPhanHoi?: string;
}

export const dichVuList: DichVu[] = [
  { id: 1, ten: "Cắt tóc nam", gia: 50000, thoiGianThucHien: 30, moTa: "Cắt tóc kiểu nam cơ bản" },
  { id: 2, ten: "Cắt tóc nữ", gia: 80000, thoiGianThucHien: 45, moTa: "Cắt tóc kiểu nữ" },
  { id: 3, ten: "Nhuộm tóc", gia: 150000, thoiGianThucHien: 60, moTa: "Nhuộm tóc với chất lượng cao" },
  { id: 4, ten: "Hấp dầu", gia: 100000, thoiGianThucHien: 30, moTa: "Dưỡng tóc chuyên sâu" }
];

export const nhanVienList: NhanVien[] = [
  {
    id: 1,
    ten: "Nguyễn Thị A",
    sdt: "0912345001",
    email: "a@salon.com",
    trangThai: "hoatDong",
    khachToiDa: 8,
    lichLamViec: {
      thuBatDau: 1,
      thuKetThuc: 6,
      gioBatDau: "09:00",
      gioKetThuc: "17:00"
    }
  },
  {
    id: 2,
    ten: "Trần Thị B",
    sdt: "0912345002",
    email: "b@salon.com",
    trangThai: "hoatDong",
    khachToiDa: 6,
    lichLamViec: {
      thuBatDau: 2,
      thuKetThuc: 0,
      gioBatDau: "10:00",
      gioKetThuc: "18:00"
    }
  },
  {
    id: 3,
    ten: "Lê Thị C",
    sdt: "0912345003",
    email: "c@salon.com",
    trangThai: "hoatDong",
    khachToiDa: 7,
    lichLamViec: {
      thuBatDau: 1,
      thuKetThuc: 6,
      gioBatDau: "09:00",
      gioKetThuc: "17:00"
    }
  }
];

export const lichHenList: LichHen[] = [
  {
    id: 1,
    khachHang: "Phạm Văn X",
    sdt: "0987654321",
    email: "khach1@email.com",
    nhanVienId: 1,
    dichVuId: 1,
    ngay: "2026-03-25",
    gio: "09:00",
    trangThai: "hoanThanh",
    tienDich: 50000,
    ghiChu: "Khách vip"
  },
  {
    id: 2,
    khachHang: "Hoàng Thị Y",
    sdt: "0987654322",
    email: "khach2@email.com",
    nhanVienId: 1,
    dichVuId: 2,
    ngay: "2026-03-25",
    gio: "10:00",
    trangThai: "xacNhan",
    tienDich: 80000,
    ghiChu: ""
  },
  {
    id: 3,
    khachHang: "Trần Văn Z",
    sdt: "0987654323",
    email: "khach3@email.com",
    nhanVienId: 2,
    dichVuId: 3,
    ngay: "2026-03-26",
    gio: "14:00",
    trangThai: "choDuyet",
    tienDich: 150000,
    ghiChu: ""
  }
];

export const danhGiaList: DanhGia[] = [
  {
    id: 1,
    lichHenId: 1,
    sao: 5,
    binhluan: "Dịch vụ rất tốt, nhân viên thân thiện",
    ngayDanhGia: "2026-03-25",
    phanHoiNhanVien: "Cảm ơn bạn đã tin tưởng!",
    ngayPhanHoi: "2026-03-25"
  }
];
