import { Room, RoomType } from './types';

// Mock data
export const mockRooms: Room[] = [
  {
    id: '1',
    roomCode: 'A101',
    roomName: 'Phòng tin học 1',
    capacity: 30,
    roomType: RoomType.THEORY,
    manager: 'Sơn Tùng MTP',
    createdAt: '2026-04-15',
  },
  {
    id: '2',
    roomCode: 'A102',
    roomName: 'Phòng thực hành',
    capacity: 25,
    roomType: RoomType.PRACTICAL,
    manager: 'Hải Tú',
    createdAt: '2026-04-15',
  },
  {
    id: '3',
    roomCode: 'B201',
    roomName: 'Hội trường A2',
    capacity: 100,
    roomType: RoomType.AUDITORIUM,
    manager: 'Trịnh Trần Phương Tuấn',
    createdAt: '2024-04-15',
  },
  {
    id: '4',
    roomCode: 'A103',
    roomName: 'Phòng học nhóm',
    capacity: 20,
    roomType: RoomType.THEORY,
    manager: 'Anh Độ Mixi',
    createdAt: '2024-04-15',
  },
  {
    id: '5',
    roomCode: 'C301',
    roomName: 'Phòng thực hành 2',
    capacity: 40,
    roomType: RoomType.PRACTICAL,
    manager: 'Justin Bieber',
    createdAt: '2024-04-15',
  },
];

// Managers
export const managersList = [
  'Sơn Tùng MTP',
  'Trịnh Trần Phương Tuấn',
  'Hải Tú',
  'Anh Độ Mixi',
  'Thanh Thị Hóa',
  'Justin Bieber',
  'G Dragon',
];
