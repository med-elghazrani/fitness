import { useEffect, useState } from "react";
import AccountForm from "../components/AccountForm";
import { getAccount, updateAccount, getNutritionHistory, type AccountResponse, type NutritionHistoryEntry } from "../api/accountApi";
import { useAuth } from "../../auth/context/AuthContext";

export default function AccountView() {
  const { user } = useAuth();
  const userId = user?.id ?? 1;



  const [account, setAccount] = useState<AccountResponse | null>(null);
  const [history, setHistory] = useState<NutritionHistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); const [successMessage, setSuccessMessage] = useState<string | null>(null);





  useEffect(() => {
    getAccount(userId)
      .then((data) => setAccount(data))
      .catch((err) => setError(err instanceof Error ? err.message : "Unexpected error"))
      .finally(() => setPageLoading(false));
    getNutritionHistory(userId).then((data) => setHistory(data)).catch(() => {});
  }, []);





  const handleSubmit = async (data: { email?: string; password?: string }) => {
    try {
      setLoading(true); setError(null); setSuccessMessage(null);
      const updated = await updateAccount(userId, data);
      setAccount(updated); setSuccessMessage(updated.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally { setLoading(false); }
  };



  

  if (pageLoading) {
    return (
      <div className="mx-auto flex max-w-5xl justify-center px-4 py-10">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-800 border-t-transparent" />
      </div>
    );
  }




  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      {account && (
        <div className="rounded-3xl border-4 border-blue-600 bg-gradient-to-br from-white to-slate-100 shadow-2xl">
          <div className="p-8 md:p-10">
            <h1 className="mb-6 text-4xl font-black text-blue-600">My Account</h1>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-lg font-semibold text-slate-600">First Name</p>
                <p className="mt-2 text-2xl font-black text-slate-900">{account.prenom}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-lg font-semibold text-slate-600">Last Name</p>
                <p className="mt-2 text-2xl font-black text-slate-900">{account.nom}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-lg font-semibold text-slate-600">Current Email</p>
                <p className="mt-2 text-xl font-black text-slate-900">{account.email}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <div className="rounded-2xl border-2 border-red-300 bg-red-50 px-5 py-4 text-lg font-semibold text-red-700 shadow">{error}</div>}
      {successMessage && <div className="rounded-2xl border-2 border-green-300 bg-green-50 px-5 py-4 text-lg font-semibold text-green-700 shadow">{successMessage}</div>}
      <AccountForm initialEmail={account?.email ?? ""} loading={loading} onSubmit={handleSubmit} />




      {history.length > 0 && (
        <div className="rounded-3xl border-4 border-blue-600 bg-gradient-to-br from-white to-slate-100 shadow-2xl">
          <div className="p-8 md:p-10">
            <h2 className="mb-6 text-3xl font-black text-blue-600">Nutrition History</h2>
            <div className="space-y-3">
              {history.map((entry) => (
                <div key={entry.id} className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-500">{new Date(entry.date).toLocaleString()}</p>
                  <p className="mt-1 text-lg font-black text-slate-900">{entry.calories} kcal - P {entry.proteines}g - G {entry.glucides}g - L {entry.lipides}g</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
);}