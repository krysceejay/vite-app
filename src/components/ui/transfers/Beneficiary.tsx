
interface BeneficiaryProps {
  goTo: (int: number) => void
}

export default function Beneficiary({ goTo }: BeneficiaryProps) {
  return (
    <div className="w-full sm:w-[420px] mx-auto">
      <div className="flex justify-between items-center">
        <div
          className="
                relative flex flex-col justify-center items-center w-full">
          <div className="w-4 h-4 bg-green-color rounded-full z-10 cursor-pointer" onClick={() => goTo(0)} />
          <p className="text-green-color text-[10px] min-[420px]:text-xs font-semibold mt-2.5">Transfer Details</p>
        </div>
        <div
          className="
                relative flex flex-col justify-center items-center w-full 
                before:content-[''] before:bg-green-color before:absolute before:w-full before:h-[2px] 
                before:right-1/2 before:top-[36%] before:-translate-y-2">
          <div className="w-4 h-4 bg-green-color rounded-full z-10 cursor-pointer" onClick={() => goTo(1)} />
          <p className="text-green-color text-[10px] min-[420px]:text-xs font-semibold mt-2.5">Select Beneficiary</p>
        </div>
        <div
          className="
                relative flex flex-col justify-center items-center w-full 
                before:content-[''] before:bg-[#D9D9D9] before:absolute before:w-full before:h-[2px] 
                before:right-1/2 before:top-[36%] before:-translate-y-2">
          <div className="w-4 h-4 bg-[#D9D9D9] rounded-full z-10 cursor-pointer" onClick={() => goTo(2)} />
          <p className="text-[10px] min-[420px]:text-xs font-semibold mt-2.5">Confirm & Pay</p>
        </div>
      </div>
      <div className="mt-8 px-2">
        <div className="w-full p-4 rounded-md flex items-center">
          <input
            className="
                    flex-1 w-full h-9 appearance-none border border-[#D7D7D7] rounded-l rounded-r-none bg-white px-3 text-[#242424] text-sm 
                    leading-tight focus:outline-none focus:shadow-none placeholder:italic"
            type="text"
            name="firstname"
            placeholder="Search Beneficiaries"
          />
          <div className="border border-[#D7D7D7] border-l-0 w-20 h-9 rounded-r text-center text-xs flex justify-center items-center px-3 cursor-pointer">Search</div>
        </div>
        <div className="mt-5 auto-grid2">
          <div className="border border-dashed border-[#D7D7D7] rounded flex flex-col justify-center items-center p-4">
            <div className="w-[38px] h-[38px] rounded-full border border-green-color flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-color">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <div className="mt-1.5 text-center">
              <p className="text-[10px]">New Recipient</p>
              <p className="text-[8px] mt-1">Create New Recipient</p>
            </div>
          </div>
          <div
            className="border border-[#D7D7D7] rounded flex flex-col justify-center items-center p-4 cursor-pointer"
            onClick={() => goTo(2)}>
            <div className="w-[38px] h-[38px] rounded-full bg-[#2872A7] flex justify-center items-center">
              <h3 className="text-white text-[10px] font-bold">TB</h3>
            </div>
            <div className="mt-1.5 text-center">
              <p className="text-[10px]">Toure Birame</p>
              <p className="text-[8px] mt-1">Mobile Money</p>
            </div>
          </div>
          <div className="border border-[#D7D7D7] rounded flex flex-col justify-center items-center p-4 cursor-pointer"
            onClick={() => goTo(2)}>
            <div className="w-[38px] h-[38px] rounded-full bg-[#2872A7] flex justify-center items-center">
              <h3 className="text-white text-[10px] font-bold">AD</h3>
            </div>
            <div className="mt-1.5 text-center">
              <p className="text-[10px]">Aminatou Diallo</p>
              <p className="text-[8px] mt-1">Bank Account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}