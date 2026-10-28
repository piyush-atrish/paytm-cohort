const MainContent = () => {
  return (
    <div className="bg-blue-50 min-h-[calc(100vh-72px)] flex items-center justify-center p-8">
      
      <div className="max-w-6xl w-full flex flex-col-reverse md:flex-row items-center gap-12">

        <div className="w-full md:w-1/3 flex flex-col justify-center">
          <h1 className="text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
            Master <br /> Your <span className="text-blue-600">Money.</span>
          </h1>
          <p className="mt-6 text-xl text-slate-500 font-medium leading-relaxed">
            The all-in-one platform to track your assets, review your spending, and send funds instantly.
          </p>
        </div>
        
        <div className="w-full md:w-2/3 bg-white rounded-3xl shadow-xl p-10 flex flex-col gap-8 border border-blue-100">
            
            <div className="flex items-center gap-6">
              <div className="h-14 w-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold shrink-0">1</div>
              <h2 className="text-3xl font-semibold text-slate-800">Connect your bank account</h2>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="h-14 w-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold shrink-0">2</div>
              <h2 className="text-3xl font-semibold text-slate-800">Keep record of balance and transfers</h2>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="h-14 w-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold shrink-0">3</div>
              <h2 className="text-3xl font-semibold text-slate-800">Transfer money seamlessly</h2>
            </div>

        </div>

      </div>
    </div>
  )
}

export default MainContent