const modules = [
  { key: 'nodal', label: 'Nodal Analysis' },
  { key: 'mesh', label: 'Mesh Analysis' },
  { key: 'thevenin', label: 'Thevenin/Norton' },
  { key: 'ac', label: 'AC Circuits' },
];

export default function Sidebar({ active, onChange, darkMode, toggleDarkMode }) {
  return (
    <aside className="w-full md:w-72 border-r border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
      <h1 className="text-xl font-bold text-brand-700 dark:text-brand-500 mb-6">Network Theory Solver</h1>
      <nav className="space-y-2">
        {modules.map((module) => (
          <button
            key={module.key}
            type="button"
            onClick={() => onChange(module.key)}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              active === module.key
                ? 'bg-brand-500 text-white'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'
            }`}
          >
            {module.label}
          </button>
        ))}
      </nav>
      <button
        type="button"
        onClick={toggleDarkMode}
        className="mt-6 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600"
      >
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </aside>
  );
}
