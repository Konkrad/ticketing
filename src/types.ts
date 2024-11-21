export interface EventPass {
  id: string;
  name: string;
  counter: number;
  validQRCodes: string[];
  usedQRCodes: string[];
}

export interface ScanResult {
  success: boolean;
  message: string;
}