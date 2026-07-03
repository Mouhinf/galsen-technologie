'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setPreview(data.url);
        onChange(data.url);
      }
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearImage = () => {
    setPreview('');
    onChange('');
  };

  return (
    <div>
      {label && <label className="block text-[11px] font-mono text-white/60 uppercase tracking-wider mb-2">{label}</label>}

      {preview ? (
        <div className="relative rounded-xl overflow-hidden border border-white/10 group">
          <Image src={preview} alt="Preview" width={400} height={192} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              onClick={() => inputRef.current?.click()}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Upload size={18} />
            </button>
            <button
              onClick={clearImage}
              className="p-2 rounded-lg bg-red-500/30 hover:bg-red-500/50 text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => inputRef.current?.click()}
          className={`relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
            dragOver
              ? 'border-[var(--green-l)] bg-[var(--green-l)]/5'
              : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-[var(--green-l)] border-t-transparent rounded-full animate-spin" />
              <p className="text-white/60 text-sm">Upload en cours...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <ImageIcon size={32} className="text-white/45" />
              <p className="text-white/60 text-sm">
                Dépose une image ici ou <span className="text-[var(--green-l)]">parcours</span>
              </p>
              <p className="text-white/45 text-[10px]">PNG, JPG, WebP</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
