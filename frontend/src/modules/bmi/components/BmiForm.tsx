import { useState } from "react";

type BmiFormProps = {
  onSubmit: (data: { poidsKg: number; tailleCm: number }) => void;
  loading: boolean;
};

type FormData = {
  poidsKg: string;
  tailleCm: string;
};

export default function BmiForm({ onSubmit, loading }: BmiFormProps) {
  const [formData, setFormData] = useState<FormData>({
    poidsKg: "",
    tailleCm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      poidsKg: parseFloat(formData.poidsKg),
      tailleCm: parseFloat(formData.tailleCm),
    });
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-white to-slate-100 shadow-2xl border-4 border-blue-600">
      <div className="p-8 md:p-10">
        <h2 className="mb-8 text-4xl font-black text-blue-600">
          BMI Calculator
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
              <label className="min-w-[200px] text-xl font-bold text-slate-800">
                Weight (kg)
              </label>
              <input
                type="number"
                name="poidsKg"
                value={formData.poidsKg}
                onChange={handleChange}
                placeholder="70"
                required
                step="0.1"
                min="30"
                max="300"
                className="flex-1 rounded-2xl border-2 border-slate-300 bg-white px-5 py-4 text-xl font-semibold text-black placeholder:text-gray-300 outline-none transition focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
              <label className="min-w-[200px] text-xl font-bold text-slate-800">
                Height (cm)
              </label>
              <input
                type="number"
                name="tailleCm"
                value={formData.tailleCm}
                onChange={handleChange}
                placeholder="175"
                required
                step="0.1"
                min="100"
                max="250"
                className="flex-1 rounded-2xl border-2 border-slate-300 bg-white px-5 py-4 text-xl font-semibold text-black placeholder:text-gray-300 outline-none transition focus:border-blue-600"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 text-xl font-black text-white shadow-xl transition-transform hover:scale-[1.02] hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent" />
              ) : (
                "Calculate My BMI"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}