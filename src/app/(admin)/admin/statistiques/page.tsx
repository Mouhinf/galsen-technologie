'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Eye, MousePointer, Monitor, Smartphone, Tablet, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';

type Period = 'day' | 'week' | 'month' | 'year';

const PERIODS: { label: string; value: Period }[] = [
  { label: 'Aujourd\'hui', value: 'day' },
  { label: '7 jours', value: 'week' },
  { label: '30 jours', value: 'month' },
  { label: 'Année', value: 'year' },
];

const DEVICE_ICONS: Record<string, typeof Monitor> = { desktop: Monitor, mobile: Smartphone, tablet: Tablet };
const COLORS = ['#22C55E', '#F5D020', '#C8001E', '#00B8FF', '#8B5CF6', '#F97316', '#EC4899', '#14B8A6'];

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number | string; icon: React.ElementType; color: string }) {
  return (
    <div className="p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/50 uppercase">{label}</span>
        <Icon size={16} style={{ color }} />
      </div>
      <div className="text-3xl font-display font-bold text-white" style={{ color }}>{value}</div>
    </div>
  );
}

export default function AdminStatsPage() {
  const [period, setPeriod] = useState<Period>('month');
  const [visitsData, setVisitsData] = useState<{ label: string; count: number }[]>([]);
  const [totals, setTotals] = useState({ today: 0, thisWeek: 0, thisMonth: 0, total: 0 });
  const [topPages, setTopPages] = useState<{ path: string; count: number }[]>([]);
  const [actions, setActions] = useState<{ actionType: string; count: number }[]>([]);
  const [devices, setDevices] = useState<{ device: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [visitsRes, pagesRes, actionsRes, devicesRes] = await Promise.all([
        fetch(`/api/admin/stats/visits?period=${period}`),
        fetch('/api/admin/stats/top-pages'),
        fetch('/api/admin/stats/actions'),
        fetch('/api/admin/stats/devices'),
      ]);
      if (visitsRes.ok) {
        const v = await visitsRes.json();
        setVisitsData(v.data || []);
        setTotals({ today: v.today || 0, thisWeek: v.thisWeek || 0, thisMonth: v.thisMonth || 0, total: v.total || 0 });
      }
      if (pagesRes.ok) setTopPages(await pagesRes.json());
      if (actionsRes.ok) setActions(await actionsRes.json());
      if (devicesRes.ok) setDevices(await devicesRes.json());
    } catch (e) {
      console.error('Failed to load stats', e);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const deviceTotal = devices.reduce((s, d) => s + d.count, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Statistiques</h1>
          <p className="text-white/50 text-sm">Fréquentation et comportement des visiteurs.</p>
        </div>
        <button onClick={fetchAll} disabled={loading} className="btn-secondary flex items-center gap-2 text-sm">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Actualiser
        </button>
      </div>

      {/* Period selector */}
      <div className="flex gap-2">
        {PERIODS.map(p => (
          <button key={p.value} onClick={() => setPeriod(p.value)} className={`px-4 py-2 rounded-lg text-xs font-mono transition-colors ${
            period === p.value ? 'bg-[var(--green-l)]/20 text-[var(--green-l)] border border-[var(--green-l)]/30' : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
          }`}>{p.label}</button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 size={24} className="animate-spin text-white/30" />
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Aujourd'hui" value={totals.today} icon={Eye} color="#22C55E" />
            <StatCard label="Cette semaine" value={totals.thisWeek} icon={Eye} color="#F5D020" />
            <StatCard label="Ce mois" value={totals.thisMonth} icon={Eye} color="#00B8FF" />
            <StatCard label="Total" value={totals.total} icon={Eye} color="#8B5CF6" />
          </div>

          {/* Visits chart */}
          <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <h3 className="text-sm font-heading font-bold text-white mb-6">Évolution des visites</h3>
            {visitsData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={visitsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="label" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }} />
                  <Line type="monotone" dataKey="count" stroke="#22C55E" strokeWidth={2} dot={{ fill: '#22C55E', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-white/30 text-sm text-center py-12">Aucune donnée pour cette période.</p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top pages */}
            <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <h3 className="text-sm font-heading font-bold text-white mb-6">Pages les plus visitées</h3>
              {topPages.length > 0 ? (
                <div className="space-y-3">
                  {topPages.slice(0, 10).map((p, i) => (
                    <div key={p.path} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-[10px] font-mono text-white/30 w-4">{i + 1}.</span>
                        <span className="text-white/70 truncate">{p.path}</span>
                      </div>
                      <span className="text-white font-mono text-xs">{p.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/30 text-sm text-center py-8">Aucune donnée.</p>
              )}
            </div>

            {/* Actions distribution */}
            <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <h3 className="text-sm font-heading font-bold text-white mb-6">Actions utilisateurs</h3>
              {actions.length > 0 ? (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={actions}>
                    <XAxis dataKey="actionType" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {actions.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-white/30 text-sm text-center py-12">Aucune donnée.</p>
              )}
            </div>

            {/* Device distribution */}
            <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <h3 className="text-sm font-heading font-bold text-white mb-6">Appareils</h3>
              {devices.length > 0 ? (
                <div className="flex flex-col items-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={devices} dataKey="count" nameKey="device" cx="50%" cy="50%" outerRadius={80} innerRadius={50}>
                        {devices.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex gap-6 mt-4">
                    {devices.map((d, i) => {
                      const Icon = DEVICE_ICONS[d.device] || Monitor;
                      const pct = deviceTotal > 0 ? ((d.count / deviceTotal) * 100).toFixed(1) : '0';
                      return (
                        <div key={d.device} className="flex items-center gap-2 text-xs text-white/70">
                          <Icon size={14} style={{ color: COLORS[i % COLORS.length] }} />
                          <span className="capitalize">{d.device}</span>
                          <span className="font-mono text-white">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="text-white/30 text-sm text-center py-12">Aucune donnée.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
