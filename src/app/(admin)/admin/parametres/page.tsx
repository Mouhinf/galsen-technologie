'use client';

import React, { useState, useEffect } from 'react';
import { Save, Globe, Search as SearchIcon, Mail, ShieldCheck, Loader2 } from 'lucide-react';

const TABS = [
  { name: 'Général', icon: Globe, group: 'general' },
  { name: 'SEO', icon: SearchIcon, group: 'seo' },
  { name: 'Emails', icon: Mail, group: 'emails' },
  { name: 'Sécurité', icon: ShieldCheck, group: 'security' },
];

const GENERAL_FIELDS = [
  { key: 'site_name', label: 'Nom du site', type: 'text', default: 'Galsen Technologie' },
  { key: 'tagline', label: 'Tagline', type: 'text', default: 'IA & Tech au Sénégal' },
  { key: 'contact_email', label: 'Email de contact', type: 'email', default: 'contact@galsentechnologie.sn' },
  { key: 'phone', label: 'Téléphone', type: 'tel', default: '+221 70 000 30 04' },
  { key: 'address', label: 'Adresse', type: 'text', default: 'Dakar, Sénégal - Plateau, Rue Carnot' },
  { key: 'linkedin', label: 'LinkedIn', type: 'url', default: '' },
  { key: 'twitter', label: 'Twitter / X', type: 'url', default: '' },
  { key: 'github', label: 'GitHub', type: 'url', default: '' },
  { key: 'whatsapp', label: 'WhatsApp', type: 'url', default: '' },
];

const SEO_FIELDS = [
  { key: 'seo_title', label: 'Titre par défaut', type: 'text', default: 'Galsen Technologie | IA & Tech au Sénégal' },
  { key: 'seo_description', label: 'Meta description', type: 'textarea', default: 'Galsen Technologie propulse votre entreprise vers le futur numérique. IA, cybersécurité, développement web et mobile.' },
  { key: 'seo_keywords', label: 'Mots-clés', type: 'text', default: 'Galsen Technologie, IA, intelligence artificielle, développement web, Sénégal' },
];

const EMAIL_FIELDS = [
  { key: 'email_smtp_host', label: 'Serveur SMTP', type: 'text', default: '' },
  { key: 'email_smtp_port', label: 'Port SMTP', type: 'text', default: '587' },
  { key: 'email_smtp_user', label: 'Utilisateur SMTP', type: 'text', default: '' },
  { key: 'email_smtp_pass', label: 'Mot de passe SMTP', type: 'password', default: '' },
  { key: 'email_from', label: 'Email expéditeur', type: 'email', default: 'noreply@galsentechnologie.sn' },
  { key: 'email_notifications', label: 'Notifications (destinataire)', type: 'email', default: 'contact@galsentechnologie.sn' },
];

const SECURITY_FIELDS = [
  { key: 'recaptcha_site_key', label: 'reCAPTCHA Site Key', type: 'text', default: '' },
  { key: 'recaptcha_secret_key', label: 'reCAPTCHA Secret Key', type: 'password', default: '' },
  { key: 'rate_limit_max', label: 'Rate limit max (requêtes/min)', type: 'number', default: '60' },
  { key: 'allowed_origins', label: 'Origines autorisées (CORS)', type: 'text', default: '*' },
];

export default function AdminParametresPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => { setSettings(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const getValue = (key: string, defaultVal: string) => settings[key] !== undefined ? settings[key] : defaultVal;

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (e) {
      console.error('Save failed', e);
    } finally {
      setSaving(false);
    }
  };

  const renderFields = (fields: typeof GENERAL_FIELDS) => (
    <div className="space-y-6 p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl">
      {fields.map(f => (
        <div key={f.key} className="space-y-2">
          <label htmlFor={f.key} className="text-[10px] font-mono text-white/50 uppercase">{f.label}</label>
          {f.type === 'textarea' ? (
            <textarea id={f.key} value={getValue(f.key, f.default)} onChange={e => handleChange(f.key, e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors" />
          ) : (
            <input id={f.key} type={f.type} value={getValue(f.key, f.default)} onChange={e => handleChange(f.key, e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--green-l)] outline-none transition-colors" />
          )}
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={24} className="animate-spin text-white/30" />
      </div>
    );
  }

  const tab = TABS[activeTab];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Paramètres</h1>
          <p className="text-white/50 text-sm">Configuration générale du site Galsen Technologie.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 text-sm">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/[0.06] pb-0">
        {TABS.map((t, i) => (
          <button key={t.name} onClick={() => setActiveTab(i)} className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
            i === activeTab ? 'border-[var(--green-l)] text-[var(--green-l)]' : 'border-transparent text-white/40 hover:text-white'
          }`}>
            <t.icon size={16} />
            {t.name}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="max-w-2xl space-y-8">
        {tab.group === 'general' && renderFields(GENERAL_FIELDS)}
        {tab.group === 'seo' && renderFields(SEO_FIELDS)}
        {tab.group === 'emails' && renderFields(EMAIL_FIELDS)}
        {tab.group === 'security' && renderFields(SECURITY_FIELDS)}
      </div>

      {/* Bottom save */}
      <div className="flex items-center gap-4">
        <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 text-sm">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </button>
        {saved && <span className="text-[var(--green-l)] text-sm">✓ Enregistré</span>}
      </div>
    </div>
  );
}
