/**
 * Types and Interfaces for Travel Planning Application
 */

/**
 * Destination Type Enum
 */
export enum DestinationType {
  BEACH = 'Biển',
  MOUNTAIN = 'Núi',
  CITY = 'Thành phố',
  HISTORICAL = 'Di tích lịch sử',
  NATURE = 'Tự nhiên',
}

/**
 * Destination Interface
 */
export interface Destination {
  id: string;
  name: string;
  description: string;
  type: DestinationType;
  image?: string;
  rating: number;
  reviewCount: number;
  viewingTime: number; // Giờ
  price: number; // VNĐ (tổng chi)
  foodPrice: number; // ăn uống
  accommodationPrice: number; // lưu trú
  transportPrice: number; // di chuyển
  latitude?: number;
  longitude?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Itinerary Day Interface
 */
export interface ItineraryDay {
  day: number;
  date: string;
  destinations: DestinationInItinerary[];
  totalBudget: number;
  notes?: string;
}

/**
 * Destination in Itinerary
 */
export interface DestinationInItinerary {
  id: string;
  destinationId: string;
  destinationName: string;
  order: number;
  startTime?: string;
  endTime?: string;
  transportTime?: number; // phút đi từ điểm trước
  budgetLocal?: number;
}

/**
 * Travel Plan Interface
 */
export interface TravelPlan {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  destinations: Destination[];
  itinerary: ItineraryDay[];
  totalBudget: number;
  budgetBreakdown: BudgetBreakdown;
  status: PlanStatus;
  createdAt: string;
  updatedAt?: string;
}

/**
 * Budget Breakdown
 */
export interface BudgetBreakdown {
  food: number;
  accommodation: number;
  transport: number;
  activities: number;
  other: number;
}

/**
 * Plan Status
 */
export type PlanStatus = 'draft' | 'planned' | 'ongoing' | 'completed';

/**
 * Statistics Interface
 */
export interface Statistics {
  totalPlans: number;
  totalRevenue: number;
  plansThisMonth: number;
  popularDestinations: {
    name: string;
    count: number;
  }[];
  budgetByCategory: {
    category: string;
    value: number;
  }[];
  monthlyRevenue: {
    month: string;
    revenue: number;
  }[];
}

/**
 * Filter Options
 */
export interface FilterOptions {
  type?: DestinationType;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  searchText?: string;
}
