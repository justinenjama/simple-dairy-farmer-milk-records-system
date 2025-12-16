import axios from "axios";
import {
  CowRequest,
  CowResponse,
  MilkRecordRequest,
  MilkRecordResponse,
  MilkReportItem,
} from "../types/types";

const API_URL = "http://localhost:8081/api";

// Add cow
export const addCow = async (cow: CowRequest): Promise<CowResponse> => {
  const response = await axios.post(`${API_URL}/cows`, cow);
  return response.data;
};

// Get all cows
export const getCows = async (): Promise<CowResponse[]> => {
  const response = await axios.get(`${API_URL}/cows`);
  return response.data;
};

// Add milk record
export const addMilkRecord = async (milk: MilkRecordRequest): Promise<MilkRecordResponse> => {
  const response = await axios.post(`${API_URL}/milk/add`, milk);
  return response.data;
};

// Get all milk records
export const getMilkRecords = async (): Promise<MilkRecordResponse[]> => {
  const response = await axios.get(`${API_URL}/milk`);
  return response.data;
};

// Get milk report
export const getMilkReport = async (startDate: string, endDate: string): Promise<MilkReportItem[]> => {
  const response = await axios.get(`${API_URL}/milk/report`, {
    params: { startDate, endDate },
  });
  return response.data;
};

