import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card } from '@/types'

interface Props {
  card: Card
  onClick: () => void
  onDelete: () => void
  isDragging?: boolean
}

export default function CardItem({ card, onClick, onDelete, isDragging = false }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } =
    useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.4 : 1,
    userSelect: 'none' as const,
    WebkitUserSelect: 'none' as const,
    touchAction: 'none' as const,
  }

  const isOverdue = card.dueDate && new Date(card.dueDate) < new Date()
  const isDueSoon = card.dueDate && !isOverdue &&
    new Date(card.dueDate).getTime() - Date.now() < 24 * 60 * 60 * 1000

  const formatDue = (dueDate: string) => {
    const d = new Date(dueDate)
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-xl border border-gray-100 p-3 shadow-sm group cursor-grab active:cursor-grabbing hover:shadow-md transition ${
        isDragging ? 'shadow-lg rotate-1' : ''
      }`}
    >
      <div className="flex items-start gap-2">

        {/* Content */}
        <div
          className="flex-1 min-w-0"
          onClick={(e) => {
            if (isSortableDragging) return
            e.stopPropagation()
            onClick()
          }}
        >
          {/* ✅ Title */}
          <p className="text-sm font-medium text-gray-800 leading-snug">
            {card.title}
          </p>

          {/* ✅ Description — tampil singkat di bawah title */}
          {card.description && (
            <p className="text-xs text-gray-400 mt-1 leading-snug line-clamp-2">
              {card.description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {/* Badge deadline */}
            {card.dueDate && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${
                isOverdue
                  ? 'bg-red-50 text-red-600'
                  : isDueSoon
                  ? 'bg-amber-50 text-amber-600'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {formatDue(card.dueDate)}
              </span>
            )}

            {/* Badge links */}
            {card.links?.length > 0 && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                  <path d="M6.5 9.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5L7.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M9.5 6.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5l1-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {card.links.length}
              </span>
            )}
          </div>
        </div>

        {/* Tombol hapus */}
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); onDelete() }}
          className="text-gray-200 hover:text-red-400 transition opacity-0 group-hover:opacity-100 flex-shrink-0 text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  )
}