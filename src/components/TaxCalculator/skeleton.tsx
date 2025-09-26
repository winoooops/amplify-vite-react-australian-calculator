function Skeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* header */}
      <div className="animate-pulse flex-col text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-slate-200 rounded-2xl"></div>
          <div className="h-12 w-80 bg-slate-200 rounded-lg"></div>
        </div>
        <div className="h-6 w-96 bg-slate-200 rounded-lg mx-auto"></div>
      </div>

      {/* main */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-slate-200 rounded-3xl p-8 shadow-xl border border-slate-200/20 h-fit">
          <div className="animate-pulse flex justify-start items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl"></div>
            <div className="h-12 w-80 bg-slate-100 rounded-lg"></div>
          </div>

          <div className="animate-pulse space-y-4 grid gap-4">
            <div className="h-20 bg-slate-100 rounded-2xl"></div>
            <div className="h-20 bg-slate-100 rounded-2xl"></div>
            <div className="h-20 bg-slate-100 rounded-2xl"></div>
            <div className="h-20 bg-slate-100 rounded-2xl"></div>
            <div className="h-20 bg-slate-100 rounded-2xl"></div>
          </div>
        </div>
        <div className="bg-slate-200 rounded-3xl p-8 shadow-xl grid gap-4 border border-slate-200/20 h-fit">
          <div className="animate-pulse flex justify-start items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl"></div>
            <div className="h-12 w-80 bg-slate-100 rounded-lg"></div>
          </div>

          <div className="animate-pulse space-y-4 grid gap-4">
            <div className="h-20 bg-slate-100 rounded-2xl"></div>
            <div className="h-20 bg-slate-100 rounded-2xl"></div>
            <div className="h-20 bg-slate-100 rounded-2xl"></div>
            <div className="h-20 bg-slate-100 rounded-2xl"></div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
        <div className="animate-pulse flex justify-start items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-slate-200 rounded-2xl"></div>
          <div className="h-12 w-80 bg-slate-200 rounded-lg"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-slate-700">
          <div className="bg-slate-200 rounded-2xl h-12"></div>
          <div className="bg-slate-200 rounded-2xl h-12"></div>
        </div>
      </div>
    </div>
  )
}

export default Skeleton;