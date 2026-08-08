export type BmiRequest = {
  poidsKg: number;
  tailleCm: number;
};

export type BmiResponse = {
  id: number;
  poidsKg: number;
  tailleCm: number;
  bmi: number;
  categorie: string;
  date: string;
};

const API_BASE_URL = "/api";

export async function calculateBmiForUser(
  userId: number,
  data: BmiRequest
): Promise<BmiResponse> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/bmi`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to calculate BMI");
  }

  return response.json();
}