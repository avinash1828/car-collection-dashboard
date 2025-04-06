
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  imageUrl: string;
  isCollected: boolean;
  isRare?: boolean;
  description?: string;
}
