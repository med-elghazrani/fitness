import { useEffect, useState } from "react";
import StatsTable from "../components/StatsTable";
import { getUserMeasures, type MeasureSummary } from "../api/statsApi";
import { useAuth } from "../../auth/context/AuthContext";

export default function StatsView() {
  const { user } = useAuth();
  const userId = user?.id ?? 1;

  const [measures, setMeasures] = useState<MeasureSummary[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  
  const loadMeasures = (targetPage: number) => {
    setLoading(true);
    setError(null);

    getUserMeasures(userId, targetPage, 5)
      .then((data) => {
        setMeasures(data.content);
        setPage(data.number);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Unexpected error")
      )
      .finally(() => setLoading(false));
  };






  useEffect(() => {
    loadMeasures(0);
  }, []);

  if (loading) {
    return (
      <div className="mx-auto flex max-w-5xl justify-center px-4 py-10">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }




  

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      {error && <div className="rounded-2xl border-2 border-red-300 bg-red-50 px-5 py-4 text-lg font-semibold text-red-700 shadow">{error}</div>}
      <StatsTable measures={measures} />
      <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow">
        <button onClick={() => loadMeasures(page - 1)} disabled={page === 0} className="rounded-xl bg-purple-600 px-5 py-3 text-lg font-bold text-white disabled:opacity-50">Previous</button>
        <p className="text-lg font-bold text-slate-800">Page {page + 1} / {totalPages}</p>
        <button onClick={() => loadMeasures(page + 1)} disabled={page + 1 >= totalPages} className="rounded-xl bg-purple-600 px-5 py-3 text-lg font-bold text-white disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}