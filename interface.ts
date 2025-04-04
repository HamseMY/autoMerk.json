export interface Manufacturer {
    id: number;
    name: string;
    isPublic: boolean;
    foundedYear: number;
    logoUrl: string;
}
  
export interface Car {
    id: number;
    name: string;
    description: string;
    age: number;
    isActive: boolean;
    manufactureDate: string;
    imageUrl: string;
    fuelType: string;
    features: string[];
    manufacturer: Manufacturer;
}