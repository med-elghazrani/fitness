import type { MeasureSummary } from "../api/statsApi";

type StatsTableProps = {
  measures: MeasureSummary[];
};

export default function StatsTable({ measures }: StatsTableProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-white to-slate-100 shadow-2xl border-4 border-purple-600">
      <div className="p-8 md:p-10">
        <h2 className="mb-8 text-3xl font-black text-purple-700">
          BMI History
        </h2>

        {measures.length === 0 ? (
          <div className="rounded-2xl bg-slate-100 p-6 text-center text-lg font-semibold text-slate-600">
            No measurements found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-left">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 text-lg font-black text-slate-800">ID</th>
                  <th className="px-6 py-4 text-lg font-black text-slate-800">Weight (kg)</th>
                  <th className="px-6 py-4 text-lg font-black text-slate-800">BMI</th>
                  <th className="px-6 py-4 text-lg font-black text-slate-800">Date</th>
                </tr>
              </thead>
              <tbody>
                {measures.map((measure) => (
                  <tr key={measure.id} className="border-t border-slate-200">
                    <td className="px-6 py-4 text-lg font-bold text-slate-900">
                      {measure.id}
                    </td>
                    <td className="px-6 py-4 text-lg text-slate-700">
                      {measure.poidsKg}
                    </td>
                    <td className="px-6 py-4 text-lg text-slate-700">
                      {measure.bmi}
                    </td>
                    <td className="px-6 py-4 text-lg text-slate-700">
                      {new Date(measure.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}