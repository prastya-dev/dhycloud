import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { List, Card } from '@/types'
import CardItem from '@/components/Card/CardItem'

interface Props {
  list: List
  onCardClick: (card: Card) => void
  onAddCard: (listId: string, title: string) => void
  onDeleteCard: (cardId: string, listId: string) => void
  overId?: string | null   // 🔥 tambah
}

export default function Column({ list, onCardClick, onAddCard, onDeleteCard, overId }: Props) {
  const [showInput, setShowInput] = useState(false)
  const [title, setTitle] = useState('')
  const [adding, setAdding] = useState(false)

  const { setNodeRef, isOver } = useDroppable({ id: list.id })
const isOverList =
  overId === list.id ||
  list.cards.some(card => card.id === overId)
  const handleAdd = async () => {
    if (!title.trim()) return
    setAdding(true)
    await onAddCard(list.id, title.trim())
    setTitle('')
    setShowInput(false)
    setAdding(false)
  }

  const getBadgeStyle = () => {
    switch (list.title) {
      case 'To Do':    return 'bg-blue-50 text-blue-700'
      case 'On Going': return 'bg-amber-50 text-amber-700'
      case 'Finish':   return 'bg-green-50 text-green-700'
      default:         return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div
      ref={setNodeRef}
      className={`w-72 rounded-2xl p-3 flex flex-col gap-2 transition
  ${isOverList
    ? 'bg-blue-50 ring-2 ring-blue-300 shadow-md'
    : 'bg-gray-100'
  }
`}
    >
      {/* Header kolom */}
      <div className="flex items-center justify-between px-1 py-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">{list.title}</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getBadgeStyle()}`}>
            {list.cards.length}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2 min-h-[4px]">
        {list.cards.map(card => (
          <CardItem
            key={card.id}
            card={card}
            onClick={() => onCardClick(card)}
            onDelete={() => onDeleteCard(card.id, list.id)}
              isOver={overId === card.id}
          />
        ))}
      </div>

      {/* Form tambah card */}
      {showInput ? (
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <textarea
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleAdd()
              }
              if (e.key === 'Escape') {
                setShowInput(false)
                setTitle('')
              }
            }}
            placeholder="Judul card..."
            autoFocus
            rows={2}
            className="w-full text-sm outline-none resize-none text-gray-800 placeholder-gray-400"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleAdd}
              disabled={adding || !title.trim()}
              className="bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-800 transition disabled:opacity-60"
            >
              {adding ? 'Menambah...' : 'Tambah'}
            </button>
            <button
              onClick={() => { setShowInput(false); setTitle('') }}
              className="text-gray-400 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
            >
              Batal
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="text-left text-sm text-gray-400 hover:text-gray-600 px-2 py-1.5 rounded-xl hover:bg-white transition"
        >
          + Tambah card
        </button>
      )}
    </div>
  )
}