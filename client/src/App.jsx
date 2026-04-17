import { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import InputForm from './components/InputForm';
import ResultPanel from './components/ResultPanel';
import { solve } from './utils/api';

const HISTORY_KEY = 'network_theory_solver_history';

export default function App() {
  const [activeModule, setActiveModule] = useState('nodal');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const recentHistory = useMemo(() => history.slice(0, 5), [history]);

  const handleSolve = async ({ endpoint, payload }) => {
    setLoading(true);
    setError('');

    try {
      const solved = await solve(endpoint, payload);
      setResult(solved);
      const next = [{ date: new Date().toISOString(), endpoint, payload }, ...history].slice(0, 20);
      setHistory(next);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:flex">
      <Sidebar
        active={activeModule}
        onChange={setActiveModule}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode((prev) => !prev)}
      />

      <main className="flex-1 p-4 md:p-6 space-y-4">
        <div className="grid lg:grid-cols-2 gap-4">
          <InputForm activeModule={activeModule} onSolve={handleSolve} loading={loading} />
          <ResultPanel loading={loading} error={error} result={result} />
        </div>

        <section className="bg-white dark:bg-slate-900 rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Previous Problems</h2>
          {recentHistory.length === 0 ? (
            <p className="text-sm text-slate-500">No history yet.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {recentHistory.map((item, idx) => (
                <li key={idx} className="border border-slate-200 dark:border-slate-700 rounded p-2">
                  <span className="font-medium uppercase">{item.endpoint}</span>
                  <span className="text-slate-500"> — {new Date(item.date).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
