type ModalProps = {
  hide: () => void
  children: React.ReactNode
}

const Modal = ({hide, children}: ModalProps) => {
    return (
        <div className="bg-overlay-color fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-md rounded-md relative p-4">
                <div 
                onClick={() => hide()}
                className="absolute top-2 right-2 flex items-center cursor-pointer px-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal