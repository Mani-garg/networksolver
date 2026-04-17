import { useMemo, useState } from 'react';
import { defaultPayloads } from '../modules/defaultPayloads';

function TextAreaJson({ value, onChange }) {
  return (
    <textarea
      className="w-full h-56 p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default function InputForm({ activeModule, onSolve, loading }) {
  const [rawPayload, setRawPayload] = useState(JSON.stringify(defaultPayloads[activeModule], null, 2));

  const endpoint = useMemo(() => {
    if (activeModule === 'nodal') return 'nodal';
    if (activeModule === 'mesh') return 'mesh';
    if (activeModule === 'thevenin') return 'thevenin';
    return 'ac';
  }, [activeModule]);

  const handleLoadSample = () => {
    setRawPayload(JSON.stringify(defaultPayloads[activeModule], null, 2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = JSON.parse(rawPayload);
    onSolve({ endpoint, payload });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-xl shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Input Form</h2>
        <button
          type="button"
          onClick={handleLoadSample}
          className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-700"
        >
          Load Sample
        </button>
      </div>

      <p className="text-sm text-slate-500 mb-2">Provide JSON payload for the selected module.</p>
      <TextAreaJson value={rawPayload} onChange={setRawPayload} />

      <button
        className="mt-4 px-4 py-2 rounded bg-brand-500 hover:bg-brand-700 text-white disabled:opacity-60"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Solving…' : 'Solve'}
      </button>
    </form>
  );
}
