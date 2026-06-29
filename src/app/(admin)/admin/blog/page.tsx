'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save, ToggleLeft, ToggleRight } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  tags: string;
  author: string;
  published: boolean;
  createdAt: string;
}

const CATEGORIES = ['IA & Data', 'Développement', 'Cybersécurité', 'Cloud', 'Formation', 'Stratégie', "Vie d'entreprise"];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    category: 'Développement',
    tags: '',
    author: 'Galsen Technologie',
    published: false,
  });

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: '', excerpt: '', content: '', imageUrl: '', category: 'Développement', tags: '', author: 'Galsen Technologie', published: false });
    setShowModal(true);
  };

  const openEdit = (p: Post) => {
    setEditing(p);
    const tags = (() => { try { return JSON.parse(p.tags).join(', '); } catch { return p.tags; } })();
    setForm({
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      imageUrl: p.imageUrl,
      category: p.category,
      tags,
      author: p.author,
      published: p.published,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);
    const payload = { ...form, tags };

    if (editing) {
      await fetch(`/api/posts/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    } else {
      await fetch('/api/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    setSaving(false);
    setShowModal(false);
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet article ?')) return;
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    fetchPosts();
  };

  const togglePublished = async (p: Post) => {
    await fetch(`/api/posts/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !p.published }),
    });
    fetchPosts();
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Blog</h1>
          <p className="text-white/50 text-sm">Gérez les articles du blog. {posts.length} article(s).</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-xs flex items-center gap-2"><Plus size={16} /> Nouvel article</button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-white/30">Chargement...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-white/20 text-6xl mb-4">+</div>
          <p className="text-white/40 mb-4">Aucun article pour le moment</p>
          <button onClick={openCreate} className="btn-primary text-xs">Écrire votre premier article</button>
        </div>
      ) : (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] font-mono text-white/30 uppercase bg-white/[0.03]">
              <tr>
                <th className="px-6 py-4">Titre</th>
                <th className="px-6 py-4">Catégorie</th>
                <th className="px-6 py-4">Auteur</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-white max-w-xs truncate">{p.title}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-mono bg-white/5 text-white/50 px-2 py-1 rounded">{p.category}</span>
                  </td>
                  <td className="px-6 py-4 text-white/60 text-xs">{p.author}</td>
                  <td className="px-6 py-4 text-white/40 text-xs">{formatDate(p.createdAt)}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => togglePublished(p)} className={`flex items-center gap-1.5 text-[10px] font-mono uppercase ${p.published ? 'text-[var(--green-l)]' : 'text-[var(--gold)]'}`}>
                      {p.published ? <Eye size={12} /> : <EyeOff size={12} />}
                      {p.published ? 'Publié' : 'Brouillon'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors"><Pencil size={14} /></button>
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
              <h2 className="text-xl font-heading font-bold">{editing ? "Modifier l'article" : 'Nouvel article'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Titre *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none transition-colors" placeholder="ex: L'avenir de l'IA en Afrique" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Catégorie *</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Auteur</label>
                  <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none" placeholder="Nom de l'auteur" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Extrait / Résumé *</label>
                <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none transition-colors resize-none" placeholder="Un court résumé de l'article..." />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Contenu de l'article * (HTML supporté)</label>
                <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={10} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none transition-colors resize-y font-mono" placeholder="<h2>Introduction</h2>
<p>Votre contenu ici...</p>" />
              </div>

              <ImageUpload
                value={form.imageUrl}
                onChange={(url) => setForm({ ...form, imageUrl: url })}
                label="Image de couverture *"
              />

              <div>
                <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2">Tags (séparés par des virgules)</label>
                <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--green-l)] focus:outline-none transition-colors" placeholder="IA, Machine Learning, Afrique" />
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => setForm({ ...form, published: !form.published })} className={form.published ? 'text-[var(--green-l)]' : 'text-white/20'}>
                  {form.published ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </button>
                <span className="text-sm text-white/60">{form.published ? 'Publié (visible sur le blog)' : 'Brouillon (non visible)'}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-white/[0.06]">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm transition-colors">Annuler</button>
              <button onClick={handleSave} disabled={saving || !form.title || !form.excerpt || !form.content || !form.imageUrl} className="flex-1 btn-primary text-xs flex items-center justify-center gap-2 disabled:opacity-40">
                <Save size={16} /> {saving ? 'Enregistrement...' : editing ? 'Modifier' : 'Publier'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
