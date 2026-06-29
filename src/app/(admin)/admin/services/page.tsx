'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, GripVertical, X, Save } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string;
  imageUrl: string | null;
  active: boolean;
  order: number;
}

const ICONS = ['Code2', 'BrainCircuit', 'Shield', 'Cloud', 'GraduationCap', 'Cpu', 'Database', 'Globe', 'Rocket', 'Zap'];
const COLORS = ['#22C55E', '#F5D020', '#C8001E', '#00B8FF', '#8B5CF6', '#F97316', '#EC4899'];

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [form, setForm] = useState({
    title: '',
    description: '',
    icon: 'Code2',
    color: '#22C55E',
    features: '',
    imageUrl: '',
    active: true,
    order: 0,
  });

  const fetchServices = async () => {
    const res = await fetch('/api/services');
    const data = await res.json();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: '', description: '', icon: 'Code2', color: '#22C55E', features: '', imageUrl: '', active: true, order: services.length });
    setShowModal(true);
  };

  const openEdit = (s: Service) => {
    setEditing(s);
    const features = (() => { try { return JSON.parse(s.features).join(', '); } catch { return s.features; } })();
    setForm({
      title: s.title,
      description: s.description,
      icon: s.icon,
      color: s.color,
      features,
      imageUrl: s.imageUrl || '',
      active: s.active,
      order: s.order,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const features = form.features.split(',').map(f => f.trim()).filter(Boolean);
    const payload = { ...form, features, imageUrl: form.imageUrl || null };

    if (editing) {
      await fetch(`/api/services/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    } else {
      await fetch('/api/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    setSaving(false);
    setShowModal(false);
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce service ?')) return;
    await fetch(`/api/services/${id}`, { method: 'DELETE' });
    fetchServices();
  };

  const toggleActive = async (s: Service) => {
    await fetch(`/api/services/${s.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !s.active }),
    });
    fetchServices();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Services</h1>
          <p className="text-white/50 text-sm">Gérez les services affichés sur le site. {services.length} service(s).</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-xs flex items-center gap-2"><Plus size={16} /> Nouveau service</button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-white/30">Chargement...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-white/20 text-6xl mb-4">+</div>
          <p className="text-white/40 mb-4">Aucun service pour le moment</p>
          <button onClick={openCreate} className="btn-primary text-xs">Ajouter votre premier service</button>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((s) => (
            <div key={s.id} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-white/10 transition-colors group">
              <div className="text-white/20"><GripVertical size={16} /></div>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold" style={{ backgroundColor: s.color + '20', color: s.color }}>
                {s.icon.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white">{s.title}</div>
                <div className="text-white/30 text-xs truncate">{s.description}</div>
              </div>
              <div className="text-[10px] font-mono text-white/20 border border-white/[0.06] px-2 py-1 rounded">#{s.order}</div>
              <button onClick={() => toggleActive(s)} className={`${s.active ? 'text-[var(--green-l)]' : 'text-white/20'}`}>
                {s.active ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
              </button>
              <button onClick={() => openEdit(s)} className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                <Pencil size={14} />
              </button>
              <button onClick={() => handleDelete(s.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-lg p-8 space-y-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-heading font-bold">{editing ? 'Modifier le service' : 'Nouveau service'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Titre *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none transition-colors" placeholder="ex: Développement Web & Mobile" />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Description *</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none transition-colors resize-none" placeholder="Description du service..." />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Fonctionnalités (séparées par des virgules)</label>
                <input value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none transition-colors" placeholder="PWA, E-commerce, Mobile, API" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Icône</label>
                  <select value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none">
                    {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Couleur</label>
                  <div className="flex gap-2 flex-wrap">
                    {COLORS.map(c => (
                      <button key={c} onClick={() => setForm({ ...form, color: c })} className={`w-8 h-8 rounded-lg border-2 transition-all ${form.color === c ? 'border-white scale-110' : 'border-transparent'}`} style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">URL de l'image</label>
                <input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none transition-colors" placeholder="https://images.unsplash.com/..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Ordre</label>
                  <input type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none" />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <button onClick={() => setForm({ ...form, active: !form.active })} className={form.active ? 'text-[var(--green-l)]' : 'text-white/20'}>
                      {form.active ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                    </button>
                    <span className="text-sm text-white/60">{form.active ? 'Actif' : 'Inactif'}</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-white/[0.06]">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm transition-colors">Annuler</button>
              <button onClick={handleSave} disabled={saving || !form.title || !form.description} className="flex-1 btn-primary text-xs flex items-center justify-center gap-2 disabled:opacity-40">
                <Save size={16} /> {saving ? 'Enregistrement...' : editing ? 'Modifier' : 'Créer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
