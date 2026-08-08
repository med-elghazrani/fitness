import type { BmiResponse } from "../api/bmiApi";

type BmiResultCardProps = {
  result: BmiResponse;
};

export default function BmiResultCard({ result }: BmiResultCardProps) {
  return (
    <div className="rounded-3xl bg-white shadow-2xl border-4 border-emerald-500">
      <div className="p-8 md:p-10">
        <h2 className="mb-8 text-3xl font-black text-emerald-600">
          Your BMI Result
        </h2>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-slate-100 p-5 shadow-sm">
            <p className="text-lg font-semibold text-slate-600">BMI</p>
            <p className="mt-2 text-4xl font-black text-slate-900">{result.bmi}</p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-5 shadow-sm">
            <p className="text-lg font-semibold text-slate-600">Category</p>
            <p className="mt-2 text-2xl font-black text-slate-900">{result.categorie}</p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-5 shadow-sm">
            <p className="text-lg font-semibold text-slate-600">Weight</p>
            <p className="mt-2 text-2xl font-black text-slate-900">{result.poidsKg} kg</p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-5 shadow-sm">
            <p className="text-lg font-semibold text-slate-600">Height</p>
            <p className="mt-2 text-2xl font-black text-slate-900">{result.tailleCm} cm</p>
          </div>
        </div>
      </div>
    </div>
  );
}