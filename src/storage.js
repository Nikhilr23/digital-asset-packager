@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light;
}

body {
  font-family: Inter, Arial, sans-serif;
}

textarea {
  resize: vertical;
}

#status-box {
  min-height: 80px;
}

.asset-card {
  border-left: 3px solid #3b82f6;
}

.text-emerald-700 {
  color: #047857;
}

.text-slate-500 {
  color: #64748b;
}

.text-red-500 {
  color: #ef4444;
}

.text-xs {
  font-size: 0.75rem;
}

.text-sm {
  font-size: 0.875rem;
}

.text-blue-600 {
  color: #2563eb;
}

.text-emerald-600 {
  color: #059669;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}

.space-y-3 > * + * {
  margin-top: 0.75rem;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-3 {
  gap: 0.75rem;
}

.flex {
  display: flex;
}

.flex-1 {
  flex: 1 1 0%;
}

.rounded-xl {
  border-radius: 0.75rem;
}

.rounded-2xl {
  border-radius: 1rem;
}

.border-slate-200 {
  border-color: #e2e8f0;
}

.border-slate-300 {
  border-color: #cbd5e1;
}

.border-slate-700 {
  border-color: #334155;
}

.bg-slate-50 {
  background-color: #f8fafc;
}

.bg-slate-900 {
  background-color: #0f172a;
}

.bg-white {
  background-color: white;
}

.bg-slate-800 {
  background-color: #1e293b;
}

.border-blue-500\/30 {
  border-color: rgba(59, 130, 246, 0.3);
}

.border-emerald-500\/30 {
  border-color: rgba(16, 185, 129, 0.3);
}

.bg-blue-500\/10 {
  background-color: rgba(59, 130, 246, 0.1);
}

.bg-emerald-500\/10 {
  background-color: rgba(16, 185, 129, 0.1);
}

.p-3 {
  padding: 0.75rem;
}

.p-4 {
  padding: 1rem;
}

.p-6 {
  padding: 1.5rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

.text-slate-900 {
  color: #0f172a;
}

.text-slate-700 {
  color: #334155;
}

.text-slate-100 {
  color: #f1f5f9;
}

.text-slate-200 {
  color: #e2e8f0;
}

.text-slate-500 {
  color: #64748b;
}

.text-blue-200 {
  color: #bfdbfe;
}

.text-blue-300 {
  color: #93c5fd;
}

.text-emerald-200 {
  color: #a7f3d0;
}

.text-emerald-300 {
  color: #6ee7b7;
}

.text-blue-600 {
  color: #2563eb;
}

.text-emerald-600 {
  color: #059669;
}

.border {
  border-width: 1px;
}

.outline-none {
  outline: none;
}

.focus\:border-blue-500:focus {
  border-color: #3b82f6;
}

.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px rgba(191, 219, 254, 0.7);
}

.focus\:ring-blue-200:focus {
  box-shadow: 0 0 0 2px rgba(191, 219, 254, 0.7);
}

.hover\:bg-slate-700:hover {
  background-color: #334155;
}

.hover\:bg-slate-50:hover {
  background-color: #f8fafc;
}

.transition {
  transition: all 0.2s ease;
}

input, button {
  font: inherit;
}

button {
  cursor: pointer;
}
