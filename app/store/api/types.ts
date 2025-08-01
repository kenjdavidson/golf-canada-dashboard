// Common response types will be defined here
export interface ApiResponse<T> {
  data: T;
  status: number;
  success: boolean;
  errors?: string[];
}

// Add more types as we define endpoints
