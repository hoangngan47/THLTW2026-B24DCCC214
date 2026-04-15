/**
 * Service APIs for Travel Planning Application
 */

import { Destination, TravelPlan } from './types';

/**
 * GET all destinations
 */
export const getDestinations = async (): Promise<Destination[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock API call
      resolve([]);
    }, 500);
  });
};

/**
 * GET destination by ID
 */
export const getDestinationById = async (id: string): Promise<Destination | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock API call
      resolve(null);
    }, 300);
  });
};

/**
 * POST create new destination
 */
export const createDestination = async (
  destination: Partial<Destination>,
): Promise<Destination> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock API call
      resolve({
        id: Date.now().toString(),
        ...destination,
      } as Destination);
    }, 500);
  });
};

/**
 * PUT update destination
 */
export const updateDestination = async (
  id: string,
  destination: Partial<Destination>,
): Promise<Destination> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock API call
      resolve({
        id,
        ...destination,
      } as Destination);
    }, 500);
  });
};

/**
 * DELETE destination
 */
export const deleteDestination = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock API call
      resolve();
    }, 300);
  });
};

/**
 * GET all travel plans
 */
export const getTravelPlans = async (): Promise<TravelPlan[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock API call
      resolve([]);
    }, 500);
  });
};

/**
 * GET travel plan by ID
 */
export const getTravelPlanById = async (id: string): Promise<TravelPlan | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock API call
      resolve(null);
    }, 300);
  });
};

/**
 * POST create new travel plan
 */
export const createTravelPlan = async (
  plan: Partial<TravelPlan>,
): Promise<TravelPlan> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock API call
      resolve({
        id: Date.now().toString(),
        ...plan,
      } as TravelPlan);
    }, 500);
  });
};

/**
 * PUT update travel plan
 */
export const updateTravelPlan = async (
  id: string,
  plan: Partial<TravelPlan>,
): Promise<TravelPlan> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock API call
      resolve({
        id,
        ...plan,
      } as TravelPlan);
    }, 500);
  });
};

/**
 * DELETE travel plan
 */
export const deleteTravelPlan = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock API call
      resolve();
    }, 300);
  });
};

/**
 * Upload image
 */
export const uploadImage = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  });
};
