// src/components/Loading.jsx
const Loading = ({ size = 'md', text = '' }) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8'
    };

    return (
        <div className="flex items-center justify-center gap-2">
            <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`}></div>
            {text && <span className="text-sm text-gray-600">{text}</span>}
        </div>
    );
};

export default Loading;
