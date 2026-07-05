'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Eye, MousePointer, Monitor, Smartphone, Tablet, Loader2, Download, TrendingUp, TrendingDown, Clock, Globe, Activity, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, AreaChart, Area } from 'recharts';

type Period = 'day' | 'week' | 'month' | 'year';

const PERIODS: { label: string; value: Period }[] = [
  { label: "Aujourd'hui", value: 'day' },
  { label: '7 jours', value: 'week' },
  { label: '30 jours', value: 'month' },
  { label: 'Année', value: 'year' },
];

const DEVICE_ICONS: Record<string, typeof Monitor> = { desktop: Monitor, mobile: Smartphone, tablet: Tablet };
const COLORS = ['#22C55E', '#F5D020', '#C8001E', '#00B8FF', '#8B5CF6', '#F97316', '#EC4899', '#14B8A6'];

const SOURCE_COLORS: Record<string, string> = { direct: '#22C55E', social: '#00B8FF', search: '#F5D020', email: '#8B5CF6', other: '#6B7280' };
const SOURCE_LABELS: Record<string, string> = { direct: 'Direct', social: 'Réseaux', search: 'Moteurs', email: 'Email', other: 'Autres' };

function StatCard({ label, value, icon: Icon, color, subtitle }: { label: string; value: number | string; icon: React.ElementType; color: string; subtitle?: string }) {
  return (
    <div className="p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/50 uppercase">{label}</span>
        <Icon size={16} style={{ color }} />
      </div>
      <div className="text-3xl font-display font-bold" style={{ color }}>{value}</div>
      {subtitle && <div className="text-[11px] text-white/40">{subtitle}</div>}
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
  const [referrers, setReferrers] = useState<{ source: string; count: number }[]>([]);
  const [hourly, setHourly] = useState<{ hour: string; count: number }[]>([]);
  const [sessions, setSessions] = useState<{ avgPagesPerSession: string; avgDurationSec: number; bounceRate: string; totalSessions: number; pageviews: number } | null>(null);
  const [compare, setCompare] = useState<{ currentVisits: number; prevVisits: number; change: string; currentSessions: number; prevSessions: number } | null>(null);
  const [latest, setLatest] = useState<{ id: string; path: string; device: string; country: string | null; createdAt: string }[]>([]);
  const [countries, setCountries] = useState<{ country: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [visitsRes, pagesRes, actionsRes, devicesRes, refsRes, hourlyRes, sessRes, compareRes, latestRes, countriesRes] = await Promise.all([
        fetch(`/api/admin/stats/visits?period=${period}`),
        fetch('/api/admin/stats/top-pages'),
        fetch('/api/admin/stats/actions'),
        fetch('/api/admin/stats/devices'),
        fetch('/api/admin/stats/referrers'),
        fetch('/api/admin/stats/hourly'),
        fetch('/api/admin/stats/sessions'),
        fetch('/api/admin/stats/compare'),
        fetch('/api/admin/stats/latest'),
        fetch('/api/admin/stats/countries'),
      ]);

      if (visitsRes.ok) { const v = await visitsRes.json(); setVisitsData(v.data || []); setTotals({ today: v.today || 0, thisWeek: v.thisWeek || 0, thisMonth: v.thisMonth || 0, total: v.total || 0 }); }
      if (pagesRes.ok) setTopPages(await pagesRes.json());
      if (actionsRes.ok) setActions(await actionsRes.json());
      if (devicesRes.ok) setDevices(await devicesRes.json());
      if (refsRes.ok) setReferrers(await refsRes.json());
      if (hourlyRes.ok) setHourly(await hourlyRes.json());
      if (sessRes.ok) setSessions(await sessRes.json());
      if (compareRes.ok) setCompare(await compareRes.json());
      if (latestRes.ok) setLatest(await latestRes.json());
      if (countriesRes.ok) setCountries(await countriesRes.json());
    } catch (e) {
      console.error('Failed to load stats', e);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const deviceTotal = devices.reduce((s, d) => s + d.count, 0);
  const refTotal = referrers.reduce((s, r) => s + r.count, 0);
  const compareUp = compare ? parseFloat(compare.change) >= 0 : true;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Statistiques</h1>
          <p className="text-white/50 text-sm">Fréquentation et comportement des visiteurs.</p>
        </div>
        <div className="flex gap-2">
          <a href="/api/admin/stats/export" download className="btn-secondary flex items-center gap-2 text-sm">
            <Download size={14} /> Exporter CSV
          </a>
          <button onClick={fetchAll} disabled={loading} className="btn-secondary flex items-center gap-2 text-sm">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Actualiser
          </button>
        </div>
      </div>

      {/* Period selector */}
      <div className="flex gap-2 flex-wrap">
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
          {/* Comparison banner */}
          {compare && (
            <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2">
                {compareUp ? <TrendingUp size={18} className="text-[var(--green-l)]" /> : <TrendingDown size={18} className="text-red-400" />}
                <span className="text-sm text-white/70">vs mois dernier :</span>
                <span className={`text-lg font-bold font-mono ${compareUp ? 'text-[var(--green-l)]' : 'text-red-400'}`}>{compare.change}</span>
              </div>
              <div className="text-xs text-white/40">
                {compare.currentVisits} visites (mois en cours) · {compare.prevVisits} visites (mois précédent)
              </div>
            </div>
          )}

          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            <StatCard label="Aujourd'hui" value={totals.today} icon={Eye} color="#22C55E" />
            <StatCard label="Cette semaine" value={totals.thisWeek} icon={Eye} color="#F5D020" />
            <StatCard label="Ce mois" value={totals.thisMonth} icon={Eye} color="#00B8FF" />
            <StatCard label="Total" value={totals.total} icon={Eye} color="#8B5CF6" />
            {sessions && (
              <>
                <StatCard label="Pages / session" value={sessions.avgPagesPerSession} icon={Activity} color="#14B8A6" />
                <StatCard label="Taux de rebond" value={sessions.bounceRate} icon={Activity} color="#F97316" />
              </>
            )}
          </div>

          {/* Session metrics row */}
          {sessions && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Sessions (30j)" value={sessions.totalSessions} icon={Activity} color="#22C55E" />
              <StatCard label="Pages vues (30j)" value={sessions.pageviews} icon={Eye} color="#00B8FF" />
              <StatCard label="Durée moyenne" value={`${Math.floor(sessions.avgDurationSec / 60)}m ${sessions.avgDurationSec % 60}s`} icon={Clock} color="#F5D020" subtitle="par session" />
              <StatCard label="Taux de rebond" value={sessions.bounceRate} icon={Activity} color="#F97316" subtitle="1 page seulement" />
            </div>
          )}

          {/* Visits chart */}
          <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <h3 className="text-sm font-heading font-bold text-white mb-6">Évolution des visites</h3>
            {visitsData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={visitsData}>
                  <defs>
                    <linearGradient id="visitGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="label" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }} />
                  <Area type="monotone" dataKey="count" stroke="#22C55E" strokeWidth={2} fill="url(#visitGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-white/30 text-sm text-center py-12">Aucune donnée pour cette période.</p>
            )}
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hourly distribution */}
            <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <h3 className="text-sm font-heading font-bold text-white mb-6">Activité par heure</h3>
              {hourly.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={hourly}>
                    <XAxis dataKey="hour" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }} />
                    <Bar dataKey="count" radius={[2, 2, 0, 0]} fill="#22C55E" opacity={0.6} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-white/30 text-sm text-center py-12">Aucune donnée.</p>
              )}
            </div>

            {/* Traffic sources */}
            <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <h3 className="text-sm font-heading font-bold text-white mb-6">Sources de trafic</h3>
              {referrers.length > 0 && refTotal > 0 ? (
                <div className="flex flex-col items-center">
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={referrers} dataKey="count" nameKey="source" cx="50%" cy="50%" outerRadius={70} innerRadius={45}>
                        {referrers.map((r) => <Cell key={r.source} fill={SOURCE_COLORS[r.source] || '#6B7280'} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4">
                    {referrers.map(r => (
                      <div key={r.source} className="flex items-center gap-2 text-xs">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: SOURCE_COLORS[r.source] || '#6B7280' }} />
                        <span className="text-white/70">{SOURCE_LABELS[r.source] || r.source}</span>
                        <span className="font-mono text-white">{((r.count / refTotal) * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-white/30 text-sm text-center py-12">Aucune donnée.</p>
              )}
            </div>

            {/* Top pages */}
            <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <h3 className="text-sm font-heading font-bold text-white mb-6">Pages les plus visitées</h3>
              {topPages.length > 0 ? (
                <div className="space-y-2">
                  {topPages.slice(0, 10).map((p, i) => (
                    <div key={p.path} className="flex items-center justify-between text-sm py-1.5 border-b border-white/[0.03] last:border-0">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-[10px] font-mono text-white/30 w-4 shrink-0">{i + 1}.</span>
                        <span className="text-white/70 truncate text-xs">{p.path}</span>
                      </div>
                      <span className="text-white font-mono text-xs shrink-0 ml-3">{p.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/30 text-sm text-center py-8">Aucune donnée.</p>
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

            {/* Countries */}
            <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <h3 className="text-sm font-heading font-bold text-white mb-6">Pays</h3>
              {countries.length > 0 ? (
                <div className="space-y-2">
                  {countries.slice(0, 8).map((c, i) => {
                    const max = countries[0]?.count || 1;
                    const pct = (c.count / max) * 100;
                    return (
                      <div key={c.country} className="flex items-center gap-3 text-sm">
                        <span className="text-white/50 w-4 text-[10px] font-mono">{i + 1}</span>
                        <span className="text-white/80 w-24 truncate">{c.country}</span>
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-[var(--green-l)] to-[var(--green-l)]/40" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-white font-mono text-xs w-10 text-right">{c.count}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-white/30 text-sm text-center py-8">Aucune donnée.</p>
              )}
            </div>

            {/* Recent visits feed */}
            <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <h3 className="text-sm font-heading font-bold text-white mb-6">Dernières visites</h3>
              {latest.length > 0 ? (
                <div className="space-y-1 max-h-[320px] overflow-y-auto scrollbar-hide">
                  {latest.map(v => (
                    <div key={v.id} className="flex items-center justify-between text-xs py-2 border-b border-white/[0.03] last:border-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <Globe size={12} className="text-white/30 shrink-0" />
                        <span className="text-white/70 truncate max-w-[180px]">{v.path}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {v.country && <span className="text-white/40 text-[10px]">{v.country}</span>}
                        {(() => { const Icon = DEVICE_ICONS[v.device] || Monitor; return <Icon size={12} className="text-white/30" />; })()}
                        <span className="text-white/30 text-[10px]">{new Date(v.createdAt).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/30 text-sm text-center py-8">Aucune visite récente.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
