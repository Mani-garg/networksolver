import { BlockMath } from 'react-katex';

function renderValue(value) {
  if (Array.isArray(value)) {
    return (
      <ul className="list-disc pl-5 space-y-1">
        {value.map((item, index) => (
          <li key={index}>{typeof item === 'object' ? JSON.stringify(item) : String(item)}</li>
        ))}
      </ul>
    );
  }

  if (typeof value === 'object' && value !== null) {
    return <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(value, null, 2)}</pre>;
  }

  return <p>{String(value)}</p>;
}

export default function ResultPanel({ loading, error, result }) {
  return (
    <section className="bg-white dark:bg-slate-900 rounded-xl shadow p-4 min-h-72">
      <h2 className="text-lg font-semibold mb-4">Output</h2>

      {loading && <p className="text-brand-700 dark:text-brand-500">Solving…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && !result && <p className="text-slate-500">Submit a problem to see equations and results.</p>}

      {!loading && !error && result && (
        <div className="space-y-4">
          {result.equations && (
            <div>
              <h3 className="font-medium mb-2">Generated Equations</h3>
              <div className="space-y-2">
                {result.equations.map((eq, i) => (
                  <BlockMath key={i} math={eq.replaceAll('*', '\\cdot ')} />
                ))}
              </div>
            </div>
          )}

          {result.matrixForm && (
            <div>
              <h3 className="font-medium mb-1">Matrix Form (Ax=b)</h3>
              <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-xs overflow-x-auto">{result.matrixForm.pretty}</pre>
            </div>
          )}

          {result.steps && (
            <div>
              <h3 className="font-medium mb-1">Step-by-step</h3>
              <ol className="list-decimal pl-5 space-y-1">
                {result.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          <div>
            <h3 className="font-medium mb-1">Final Answer</h3>
            <div className="rounded bg-emerald-50 dark:bg-emerald-950 p-3">
              {Object.entries(result)
                .filter(([key]) => !['equations', 'matrixForm', 'steps'].includes(key))
                .map(([key, value]) => (
                  <div key={key} className="mb-2">
                    <strong>{key}: </strong>
                    {renderValue(value)}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
