import { Loader2 } from 'lucide-react'

export default function LoadingSpinner({ size = 'lg', text = 'Loading...' }) {
    const sizeMap = {
        sm: 'w-5 h-5',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Loader2 className={`${sizeMap[size]} text-primary-600 animate-spin`} />
            {text && (
                <p className="text-dark-500 text-sm font-medium animate-pulse">{text}</p>
            )}
        </div>
    )
}
