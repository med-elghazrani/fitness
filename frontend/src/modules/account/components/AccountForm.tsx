import { useState } from "react";

type AccountFormProps = {
  initialEmail: string;
  loading: boolean;
  onSubmit: (data: { email?: string; password?: string }) => void;
};

export default function AccountForm({
  initialEmail,
  loading,
  onSubmit,
}: AccountFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: { email?: string; password?: string } = {};

    if (email.trim() !== "") {
      payload.email = email.trim();
    }

    if (password.trim() !== "") {
      payload.password = password.trim();
    }

    onSubmit(payload);
  };

  return (
    <div className="rounded-3xl border-4 border-slate-700 bg-white shadow-2xl">
      <div className="p-8 md:p-10">
        <h2 className="mb-8 text-4xl font-black text-slate-800">
          Account Settings
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
            <label className="min-w-[200px] text-xl font-bold text-slate-800">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-2xl border-2 border-slate-300 bg-white px-5 py-4 text-xl font-semibold text-black placeholder:text-gray-300 outline-none transition focus:border-blue-600"
              placeholder="email@example.com"
            />
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
            <label className="min-w-[200px] text-xl font-bold text-slate-800">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 rounded-2xl border-2 border-slate-300 bg-white px-5 py-4 text-xl font-semibold text-black placeholder:text-gray-300 outline-none transition focus:border-blue-600"
              placeholder="Leave empty if unchanged"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-2xl bg-slate-800 px-6 py-4 text-xl font-black text-white shadow-xl transition-transform hover:scale-[1.02] hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent" />
              ) : (
                "Update Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}