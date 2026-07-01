'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, X, RefreshCw } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  imageUrl: string | null;
  published: boolean;
  createdAt: string;
}

const defaultForm = { name: '', role: '', company: '', content: '', rating: 5, published: true };

export default function AdminTemoignagesPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => { setTestimonials(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm(defaultForm);
    setModal(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ name: t.name, role: t.role, company: t.company, content: t.content, rating: t.rating, published: t.published });
    setModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const res = await fetch(`/api/testimonials/${editing.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const updated = await res.json();
        setTestimonials(prev => prev.map(t => t.id === editing.id ? updated : t));
      } else {
        const res = await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const created = await res.json();
        setTestimonials(prev => [created, ...prev]);
      }
      setModal(false);
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (t: Testimonial) => {
    const res = await fetch(`/api/testimonials/${t.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !t.published }),
    });
    const updated = await res.json();
    setTestimonials(prev => prev.map(m => m.id === t.id ? updated : m));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce témoignage ?')) return;
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Témoignages</h1>
          <p className="text-white/50 text-sm">Gérez les avis clients affichés sur la page d&apos;accueil.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchData} className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white transition-colors">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={openNew} className="btn-primary text-xs flex items-center gap-2"><Plus size={16} /> Nouveau témoignage</button>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setModal(false)}>
          <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-heading font-bold">{editing ? 'Modifier' : 'Nouveau'} témoignage</h2>
              <button onClick={() => setModal(false)} className="text-white/30 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/50 uppercase">Nom *</label>
                  <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/50 uppercase">Rôle</label>
                  <input value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] outline-none" placeholder="CTO" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/50 uppercase">Entreprise</label>
                <input value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] outline-none" placeholder="Wave Sénégal" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/50 uppercase">Témoignage *</label>
                <textarea required value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] outline-none resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/50 uppercase">Note</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button key={n} type="button" onClick={() => setForm(p => ({ ...p, rating: n }))}>
                        <Star size={20} className={n <= form.rating ? 'text-[var(--gold)] fill-[var(--gold)]' : 'text-white/20'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 flex flex-col justify-end">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className={`w-10 h-6 rounded-full transition-colors relative ${form.published ? 'bg-[var(--green-l)]' : 'bg-white/10'}`} onClick={() => setForm(p => ({ ...p, published: !p.published }))}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${form.published ? 'left-5' : 'left-1'}`} />
                    </div>
                    <span className="text-xs font-mono uppercase text-white/50">{form.published ? 'Publié' : 'Masqué'}</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary text-xs flex-1 py-3 flex items-center justify-center gap-2">
                  {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Plus size={14} /> {editing ? 'Enregistrer' : 'Créer'}</>}
                </button>
                <button type="button" onClick={() => setModal(false)} className="btn-secondary text-xs flex-1 py-3 text-center">Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-white/30 font-mono text-sm mb-4">Aucun témoignage pour le moment.</p>
            <button onClick={openNew} className="btn-primary text-xs inline-flex items-center gap-2"><Plus size={14} /> Ajouter un témoignage</button>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] font-mono text-white/30 uppercase bg-white/[0.03]">
              <tr>
                <th className="px-6 py-4">Nom</th>
                <th className="px-6 py-4">Entreprise</th>
                <th className="px-6 py-4">Note</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t.id} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{t.name}</div>
                    <div className="text-white/30 text-xs">{t.role}</div>
                  </td>
                  <td className="px-6 py-4 text-white/60">{t.company}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={12} className={j < t.rating ? 'text-[var(--gold)] fill-[var(--gold)]' : 'text-white/10'} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => togglePublish(t)} className={`flex items-center gap-1.5 text-[10px] font-mono uppercase transition-colors ${t.published ? 'text-[var(--green-l)]' : 'text-white/30 hover:text-white/50'}`}>
                      {t.published ? <Eye size={12} /> : <EyeOff size={12} />}
                      {t.published ? 'Publié' : 'Masqué'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(t)} className="p-1.5 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
