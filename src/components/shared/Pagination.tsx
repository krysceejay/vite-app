

export default function Pagination() {
    return (
        <div className="flex flex-wrap items-center space-x-3 text-xs">
            <button className="w-6 h-6 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mx-auto">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
            </button>
            <button className="w-6 h-6 bg-[#EBF2FC] rounded">1</button>
            <button className="w-6 h-6 bg-white rounded">2</button>
            <button className="w-6 h-6 bg-white rounded">3</button>
            <button className="w-6 h-6 bg-white rounded">4</button>
            <button className="w-6 h-6 bg-white rounded">5</button>
            <button className="w-6 h-6 bg-white rounded">6</button>
            <button className="w-6 h-6 bg-white rounded">7</button>
            <button className="w-6 h-6 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mx-auto">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    )
}