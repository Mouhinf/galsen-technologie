'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, ExternalLink, X, Save, ToggleLeft, ToggleRight } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  client: string | null;
  year: string | null;
  description: string;
  content: string;
  techStack: string;
  imageUrl: string;
  liveUrl: string | null;
  published: boolean;
  createdAt: string;
}

const CATEGORIES = ['Web & Mobile', 'IA & Data', 'Cybersécurité', 'Cloud', 'Formation', 'Conseil'];

export default function AdminProjetsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Web & Mobile',
    client: '',
    year: new Date().getFullYear().toString(),
    description: '',
    content: '',
    techStack: '',
    imageUrl: '',
    liveUrl: '',
    published: false,
  });

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: '', category: 'Web & Mobile', client: '', year: new Date().getFullYear().toString(), description: '', content: '', techStack: '', imageUrl: '', liveUrl: '', published: false });
    setShowModal(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    const techStack = (() => { try { return JSON.parse(p.techStack).join(', '); } catch { return p.techStack; } })();
    setForm({
      title: p.title,
      category: p.category,
      client: p.client || '',
      year: p.year || '',
      description: p.description,
      content: p.content,
      techStack,
      imageUrl: p.imageUrl,
      liveUrl: p.liveUrl || '',
      published: p.published,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const techStack = form.techStack.split(',').map(t => t.trim()).filter(Boolean);
    const payload = { ...form, techStack, client: form.client || null, liveUrl: form.liveUrl || null };

    if (editing) {
      await fetch(`/api/projects/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    } else {
      await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    setSaving(false);
    setShowModal(false);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce projet ?')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    fetchProjects();
  };

  const togglePublished = async (p: Project) => {
    await fetch(`/api/projects/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !p.published }),
    });
    fetchProjects();
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Projets</h1>
          <p className="text-white/50 text-sm">Gérez les réalisations affichées dans le portfolio. {projects.length} projet(s).</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-xs flex items-center gap-2"><Plus size={16} /> Nouveau projet</button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-white/30">Chargement...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-white/20 text-6xl mb-4">+</div>
          <p className="text-white/40 mb-4">Aucun projet pour le moment</p>
          <button onClick={openCreate} className="btn-primary text-xs">Ajouter votre premier projet</button>
        </div>
      ) : (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] font-mono text-white/30 uppercase bg-white/[0.03]">
              <tr>
                <th className="px-6 py-4">Titre</th>
                <th className="px-6 py-4">Catégorie</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{p.title}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-mono bg-white/5 text-white/50 px-2 py-1 rounded">{p.category}</span>
                  </td>
                  <td className="px-6 py-4 text-white/60">{p.client || '—'}</td>
                  <td className="px-6 py-4 text-white/40 text-xs">{formatDate(p.createdAt)}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => togglePublished(p)} className={`flex items-center gap-1.5 text-[10px] font-mono uppercase ${p.published ? 'text-[var(--green-l)]' : 'text-white/30'}`}>
                      {p.published ? <Eye size={12} /> : <EyeOff size={12} />}
                      {p.published ? 'Publié' : 'Brouillon'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors"><Pencil size={14} /></button>
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener" className="p-1.5 rounded hover:bg-white/10 text-white/40 hover:text-[var(--blue)] transition-colors"><ExternalLink size={14} /></a>
                      )}
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-2xl p-8 space-y-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-heading font-bold">{editing ? 'Modifier le projet' : 'Nouveau projet'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Titre *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none transition-colors" placeholder="ex: AI Health Monitor" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Catégorie *</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Année</label>
                  <input value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none" placeholder="2024" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Client</label>
                <input value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none transition-colors" placeholder="ex: Ministère de la Santé" />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Description courte *</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none transition-colors resize-none" placeholder="Résumé du projet..." />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Contenu détaillé (HTML) - page projet</label>
                <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={6} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none transition-colors resize-y font-mono" placeholder="<h2>Description technique</h2><p>Contenu détaillé...</p>" />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Technologies (séparées par des virgules)</label>
                <input value={form.techStack} onChange={e => setForm({ ...form, techStack: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none transition-colors" placeholder="Next.js, React, Python, TensorFlow" />
              </div>

              <ImageUpload
                value={form.imageUrl}
                onChange={(url) => setForm({ ...form, imageUrl: url })}
                label="Image *"
              />

              <div>
                <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">URL du site (optionnel)</label>
                <input value={form.liveUrl} onChange={e => setForm({ ...form, liveUrl: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none transition-colors" placeholder="https://example.com" />
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => setForm({ ...form, published: !form.published })} className={form.published ? 'text-[var(--green-l)]' : 'text-white/20'}>
                  {form.published ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </button>
                <span className="text-sm text-white/60">{form.published ? 'Publié (visible sur le site)' : 'Brouillon (non visible)'}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-white/[0.06]">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm transition-colors">Annuler</button>
              <button onClick={handleSave} disabled={saving || !form.title || !form.description || !form.imageUrl} className="flex-1 btn-primary text-xs flex items-center justify-center gap-2 disabled:opacity-40">
                <Save size={16} /> {saving ? 'Enregistrement...' : editing ? 'Modifier' : 'Créer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
