import useTranslate from "../../hooks/useTranslate"

interface IPaginationProps {
    page: number
    pages: number
    totalRecords?: number
    limit: number
    showDetails?: boolean
    changePage: (num: number) => void
}

const Pagination = ({ page, pages, changePage, totalRecords, limit, showDetails = true }: IPaginationProps) => {
	const {t} = useTranslate()

    let middleNumbers

    if (pages <= 5) {
        middleNumbers = [...Array(pages)].map((_, ind) => (
            <li key={ind + 1}>
                <button
                    onClick={() => changePage(ind + 1)}
                    disabled={page === ind + 1}
                    className={`w-6 h-6 rounded ${page === ind + 1 ? 'bg-[#EBF2FC]' : 'bg-white'} `}>
                    {ind + 1}
                </button>
            </li>
        ))
    } else {
        const startValue = Math.floor((page - 1) / 5) * 5
        middleNumbers = (
            <>
                {[...Array(5)].map((_, ind) => (
                    <li key={startValue + ind + 1}>
                        <button
                            onClick={() => changePage(startValue + ind + 1)}
                            disabled={page === startValue + ind + 1}
                            className={`w-6 h-6 rounded ${page === startValue + ind + 1 ? 'bg-[#EBF2FC]' : 'bg-white'} `}>
                            {startValue + ind + 1}
                        </button>
                    </li>
                ))}
                <li><button className="w-6 h-6 rounded bg-white">...</button></li>
                <li><button className="w-6 h-6 rounded bg-white" onClick={() => changePage(pages)}>{pages}</button></li>
            </>
        )

        if (page > 5) {
            if (pages - page >= 5) {
                middleNumbers = (
                    <>
                        <li><button onClick={() => changePage(1)}
                            className="w-6 h-6 rounded bg-white">1</button></li>
                        <li><button className="w-6 h-6 rounded bg-white">...</button></li>
                        <li><button onClick={() => changePage(startValue)}
                            className="w-6 h-6 rounded bg-white">{startValue}</button></li>
                        {[...Array(5)].map((_, ind) => (
                            <li key={startValue + ind + 1}>
                                <button
                                    onClick={() => changePage(startValue + ind + 1)}
                                    disabled={page === startValue + ind + 1}
                                    className={`w-6 h-6 rounded ${page === startValue + ind + 1 ? 'bg-[#EBF2FC]' : 'bg-white'} `}>
                                    {startValue + ind + 1}
                                </button>
                            </li>
                        ))}
                        <li><button className="w-6 h-6 rounded bg-white">...</button></li>
                        <li><button className="w-6 h-6 rounded bg-white" onClick={() => changePage(pages)}>{pages}</button></li>
                    </>
                )
            } else {
                let amountLeft = pages - page + 5
                middleNumbers = (
                    <>
                        <li><button onClick={() => changePage(1)}
                            className="w-6 h-6 rounded bg-white">1</button></li>
                        <li><button className="w-6 h-6 rounded bg-white">...</button></li>
                        <li><button onClick={() => changePage(startValue)}
                            className="w-6 h-6 rounded bg-white">{startValue}</button></li>
                        {amountLeft > 0 &&
                            [...Array(amountLeft)].map((_, ind) => (
                                <li key={startValue + ind + 1} className={`${pages < startValue + ind + 1 && 'hidden'}`}>
                                    <button
                                        onClick={() => changePage(startValue + ind + 1)}
                                        disabled={page === startValue + ind + 1}
                                        className={`w-6 h-6 rounded ${page === startValue + ind + 1 ? 'bg-[#EBF2FC]' : 'bg-white'} `}>
                                        {startValue + ind + 1}
                                    </button>
                                </li>
                            ))
                        }

                    </>
                )
            }
        }
    }

    return (
        <div className="text-sm block md:flex items-center justify-between space-x-3">
            {showDetails &&
            <h5 className="mb-2 md:mb-0">{t('paginate.text', { page: 1 + (page - 1) * limit, limit: page === pages ? totalRecords : (page * limit), total: totalRecords })}</h5>
            }
            <ul className="flex flex-wrap items-center space-x-1 font-normal">
                <li>
                    <button
                        onClick={() => changePage(page - 1)}
                        disabled={page === 1}
                        className="w-6 h-6 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mx-auto">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                    </button>
                </li>
                {middleNumbers}
                <li>
                    <button
                        onClick={() => changePage(page + 1)}
                        disabled={page === pages}
                        className="w-6 h-6 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mx-auto">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Pagination