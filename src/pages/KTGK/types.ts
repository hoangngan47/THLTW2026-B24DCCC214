/**
 * Types and Interfaces for KTGK (Quản lý phòng học) module
 */

/**
 * Room type enum
 */
export enum RoomType {
  THEORY = 'Lý thuyết',
  PRACTICAL = 'Thực hành',
  AUDITORIUM = 'Hội trường',
}

/**
 * Room (Phòng học) interface
 */
export interface Room {
  id: string;
  roomCode: string;
  roomName: string;
  capacity: number;
  roomType: RoomType;
  manager: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Room form data interface
 */
export interface RoomFormData {
  roomCode: string;
  roomName: string;
  capacity: number;
  roomType: RoomType;
  manager: string;
}

/**
 * Filter options interface
 */
export interface FilterOptions {
  roomType?: RoomType;
  manager?: string;
  searchText?: string;
}
