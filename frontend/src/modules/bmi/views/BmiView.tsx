import { useState } from "react";
import BmiForm from "../components/BmiForm.tsx";
import BmiResultCard from "../components/BmiResultCard";
import { calculateBmiForUser, type BmiResponse } from "../api/bmiApi";
import { useAuth } from "../../auth/context/AuthContext";

export default function BmiView() {
  const { user } = useAuth();
  const userId = user?.id ?? 1;

  const [result, setResult] = useState<BmiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: { poidsKg: number; tailleCm: number }) => {
    try {
      setLoading(true);
      setError(null);

      const response = await calculateBmiForUser(userId, data);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };



  
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <BmiForm onSubmit={handleSubmit} loading={loading} />

      {error && (
        <div className="rounded-2xl border-2 border-red-300 bg-red-50 px-5 py-4 text-lg font-semibold text-red-700 shadow">
          {error}
        </div>
      )}

      {result && <BmiResultCard result={result} />}
    </div>
  );
}