// Types and Interfaces for TH05 module

/**
 * Club (Câu lạc bộ) type
 */
export interface Club {
  id: string;
  name: string;
  avatar?: string;
  establishmentDate: string;
  description: string;
  leader: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Registration Status
 */
export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

/**
 * Registration Application (Đơn đăng ký)
 */
export interface RegistrationApplication {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  specialty: string;
  clubId: string;
  reason: string;
  status: RegistrationStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Operation History (Lịch sử thao tác)
 */
export interface OperationHistory {
  id: string;
  applicationId: string;
  action: 'approved' | 'rejected'; // hoặc các action khác
  reason?: string;
  performedBy: string;
  performedAt: string;
  notes?: string;
}

/**
 * Club Member (Thành viên câu lạc bộ)
 */
export interface ClubMember {
  id: string;
  applicationId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  specialty: string;
  clubId: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

/**
 * Statistics (Thống kê)
 */
export interface Statistics {
  totalClubs: number;
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
}

/**
 * Chart Data for Reports
 */
export interface ClubApplicationStats {
  clubName: string;
  pending: number;
  approved: number;
  rejected: number;
}

/**
 * Modal states
 */
export interface ModalState {
  visible: boolean;
  mode: 'create' | 'edit' | 'view';
  data?: any;
}
