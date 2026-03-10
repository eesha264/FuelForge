import { Star } from 'lucide-react'

export default function ReviewCard({ review }) {
    const date = review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''

    return (
        <div className="bg-white border border-dark-100/60 rounded-2xl p-5 hover:shadow-md hover:shadow-primary-100/30 transition-all">
            <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-200 to-primary-200 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary-700">{review.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-dark-800 truncate">{review.name || 'Anonymous'}</h4>
                        <span className="text-xs text-dark-400 shrink-0">{date}</span>
                    </div>
                    <div className="flex mt-1">{[1, 2, 3, 4, 5].map((s) => (<Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'text-warm-400 fill-warm-400' : 'text-dark-200'}`} />))}</div>
                </div>
            </div>
            <p className="text-sm text-dark-600 leading-relaxed">{review.comment}</p>
        </div>
    )
}
