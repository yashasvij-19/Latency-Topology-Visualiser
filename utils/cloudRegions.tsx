// utils/cloudRegions.ts

export interface CloudRegion {
  provider: "AWS" | "GCP" | "Azure";
  name: string;
  regionCode: string;
  longitude: number;
  latitude: number;
  servers: number; // count of exchange servers here
}

export const cloudRegions: CloudRegion[] = [
  { provider: "AWS", name: "Frankfurt", regionCode: "eu-central-1", longitude: 8.6821, latitude: 50.1109, servers: 4 },
  { provider: "AWS", name: "Singapore", regionCode: "ap-southeast-1", longitude: 103.8198, latitude: 1.3521, servers: 6 },
  { provider: "GCP", name: "Tokyo", regionCode: "asia-northeast1", longitude: 139.6917, latitude: 35.6895, servers: 3 },
  { provider: "Azure", name: "London", regionCode: "uksouth", longitude: -0.1278, latitude: 51.5074, servers: 5 },
  // Add more regions for demo!
];
