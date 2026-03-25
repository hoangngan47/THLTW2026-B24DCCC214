export interface So {
  id: number;
  year: number;
  currentNumber: number;
}

export interface QuyetDinh {
  id: number;
  soQD: string;
  ngay: string;
  trichYeu: string;
  soId: number;
  luotTraCuu: number;
}

export interface Field {
  id: number;
  name: string;
  type: "string" | "number" | "date";
}

export interface VanBang {
  id: number;
  soVaoSo: number;
  soHieu: string;
  msv: string;
  hoTen: string;
  ngaySinh: string;
  quyetDinhId: number;
  extra: Record<string, any>;
}

export const soList: So[] = [
  { id: 1, year: 2026, currentNumber: 0 }
];

export const quyetDinhList: QuyetDinh[] = [
  {
    id: 1,
    soQD: "QD01",
    ngay: "2026-06-01",
    trichYeu: "Đợt 1",
    soId: 1,
    luotTraCuu: 0
  }
];

export const fields: Field[] = [
  { id: 1, name: "Dân tộc", type: "string" },
  { id: 2, name: "Điểm TB", type: "number" }
];

export const vanBangList: VanBang[] = [];