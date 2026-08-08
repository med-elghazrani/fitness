export type AccountResponse = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  message: string;};





export type UpdateAccountRequest = {
  email?: string;
  password?: string;};





export type NutritionHistoryEntry = {
  id: number;
  userId: number;
  date: string;
  calories: number;
  proteines: number;
  glucides: number;
  lipides: number;};





const API_BASE_URL = "/api";

export async function getAccount(userId: number): Promise<AccountResponse> {
  const response = await fetch(`${API_BASE_URL}/account/${userId}`);
  if (!response.ok) {throw new Error("Failed to load account");}
  return response.json();}





export async function updateAccount(
  userId: number,
  data: UpdateAccountRequest
): Promise<AccountResponse> {
  const response = await fetch(`${API_BASE_URL}/account/${userId}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(data), });
  if (!response.ok) {throw new Error("Failed to update account");}
  return response.json();}


  


export async function getNutritionHistory(userId: number): Promise<NutritionHistoryEntry[]> {
  const response = await fetch(`${API_BASE_URL}/account/${userId}/nutrition-history`);
  if (!response.ok) {throw new Error("Failed to load nutrition history");}
  return response.json();
}