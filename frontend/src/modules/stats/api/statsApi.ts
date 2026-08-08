export type MeasureSummary = {
  id: number;
  poidsKg: number;
  bmi: number;
  date: string;
};

export type MeasuresPage = {
  content: MeasureSummary[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
};

const API_BASE_URL = "/api";

export async function getUserMeasures(
  userId: number,
  page = 0,
  size = 10
): Promise<MeasuresPage> {
  const response = await fetch(
    `${API_BASE_URL}/users/${userId}/measures?page=${page}&size=${size}`
  );

  if (!response.ok) {
    throw new Error("Failed to load stats");
  }

  return response.json();
}