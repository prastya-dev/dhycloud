import { useState, useEffect, FormEvent } from 'react'
import { Card, CardLink } from '@/types'
import api from '@/lib/axios'

interface Props {
  card: Card
  onClose: () => void
  onUpdate: (card: Card) => void
  onDelete: (cardId: string) => void
}

export default function CardModal({ card, onClose, onUpdate, onDelete }: Props) {
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description || '')
  const [dueDate, setDueDate] = useState(
    card.dueDate ? new Date(card.dueDate).toISOString().slice(0, 16) : ''
  )
  const [links, setLinks] = useState<CardLink[]>(card.links || [])
  const [linkUrl, setLinkUrl] = useState('')
  const [linkLabel, setLinkLabel] = useState('')
  const [saving, setSaving] = useState(false)
  const [addingLink, setAddingLink] = useState(false)
  const [error, setError] = useState('')

  // tutup modal dengan Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      const res = await api.put(`/cards/${card.id}`, {
        title: title.trim(),
        description: description.trim() || null,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null
      })
      onUpdate({ ...res.data.data, links })
    } catch {
      setError('Gagal menyimpan perubahan')
    } finally {
      setSaving(false)
    }
  }

  const handleAddLink = async (e: FormEvent) => {
    e.preventDefault()
    if (!linkUrl.trim()) return
    setAddingLink(true)
    try {
      const res = await api.post(`/cards/${card.id}/links`, {
        url: linkUrl.trim(),
        label: linkLabel.trim() || null
      })
      setLinks(prev => [...prev, res.data.data])
      setLinkUrl('')
      setLinkLabel('')
    } catch {
      setError('URL tidak valid atau gagal menambah link')
    } finally {
      setAddingLink(false)
    }
  }

  const handleDeleteLink = async (linkId: string) => {
    try {
      await api.delete(`/cards/${card.id}/links/${linkId}`)
      setLinks(prev => prev.filter(l => l.id !== linkId))
    } catch {
      setError('Gagal menghapus link')
    }
  }

  const isOverdue = dueDate && new Date(dueDate) < new Date()

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 p-4 pt-16 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">

        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-0">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="text-lg font-semibold text-gray-900 flex-1 outline-none border-b-2 border-transparent focus:border-blue-500 pb-0.5 bg-transparent"
          />
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition text-xl leading-none ml-4 flex-shrink-0"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-5">

          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* Deskripsi */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-2">
              Deskripsi
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Tambah deskripsi..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-2">
              Deadline
            </label>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 transition ${
                isOverdue
                  ? 'border-red-300 bg-red-50 text-red-700 focus:border-red-400 focus:ring-red-200'
                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {isOverdue && (
              <p className="text-xs text-red-500 mt-1">⚠ Deadline sudah lewat</p>
            )}
            {dueDate && (
              <button
                onClick={() => setDueDate('')}
                className="text-xs text-gray-400 hover:text-gray-600 mt-1"
              >
                Hapus deadline
              </button>
            )}
          </div>

          {/* Links */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-2">
              Link terlampir
            </label>

            {/* Daftar link */}
            {links.length > 0 && (
              <div className="space-y-2 mb-3">
                {links.map(link => (
                  <div
                    key={link.id}
                    className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2"
                  >
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-blue-500">
                      <path d="M6.5 9.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5L7.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M9.5 6.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5l1-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex-1 truncate"
                    >
                      {link.label || link.url}
                    </a>
                    <button
                      onClick={() => handleDeleteLink(link.id)}
                      className="text-gray-300 hover:text-red-400 transition flex-shrink-0"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Form tambah link */}
            <form onSubmit={handleAddLink} className="space-y-2">
              <input
                type="url"
                value={linkUrl}
                onChange={e => setLinkUrl(e.target.value)}
                placeholder="https://..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={linkLabel}
                  onChange={e => setLinkLabel(e.target.value)}
                  placeholder="Label (opsional)"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={addingLink || !linkUrl.trim()}
                  className="bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-200 transition disabled:opacity-60 flex-shrink-0"
                >
                  {addingLink ? '...' : '+ Tambah'}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <button
            onClick={() => {
              if (confirm('Hapus card ini?')) onDelete(card.id)
            }}
            className="text-sm text-red-400 hover:text-red-600 transition"
          >
            Hapus card
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="text-sm text-gray-400 px-4 py-2 rounded-xl hover:bg-gray-50 transition"
            >
              Tutup
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-blue-800 transition disabled:opacity-60"
            >
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}