import { Search, Loader2, MapPin, Star, Navigation, ChevronRight } from 'lucide-react';

export const ShopSelection = ({
  searchQuery,
  setSearchQuery,
  isSearching,
  handleSearch,
  branches,
  selectedBranch,
  setSelectedBranch
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-[#1E3A8A]">Select a Shop</h2>
        <form onSubmit={handleSearch} className="relative flex-grow max-w-md">
          <input 
            type="text"
            placeholder="Search by city or zip code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-[#BFDBFE] focus:border-[#2563EB] focus:outline-none transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={18} />
          <button 
            type="submit"
            disabled={isSearching}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2563EB] text-white p-1 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSearching ? <Loader2 size={16} className="animate-spin" /> : <ChevronRight size={16} />}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {branches.map((branch) => (
            <button
              key={branch.id}
              onClick={() => setSelectedBranch(branch)}
              className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 group relative ${
                selectedBranch?.id === branch.id
                  ? 'border-[#2563EB] bg-blue-50/50 shadow-sm'
                  : 'border-[#BFDBFE] hover:border-[#2563EB]/30 hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-[#1E3A8A] group-hover:text-[#2563EB] transition-colors">
                  {branch.name}
                </h3>
                <div className="flex items-center gap-1 bg-orange-50 text-orange-500 px-2 py-1 rounded-lg text-xs font-bold">
                  <Star size={12} fill="currentColor" />
                  {branch.rating.toFixed(1)}
                </div>
              </div>
              <div className="space-y-3 text-[#64748B]">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#2563EB]" />
                  <span className="text-sm">{branch.address}</span>
                </div>
                <div className="flex items-center gap-2 text-[#2563EB]">
                  <Navigation size={14} />
                  <span className="text-xs font-bold uppercase tracking-wider">{branch.distance}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="lg:col-span-3 relative rounded-3xl overflow-hidden border border-[#BFDBFE] bg-slate-100 min-h-[400px] flex items-center justify-center shadow-inner">
          <img 
            src="https://picsum.photos/seed/mapview/1200/800" 
            alt="Map View" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="relative z-10 flex flex-col items-center text-[#64748B] bg-white/90 backdrop-blur-md p-8 rounded-[2rem] shadow-2xl border border-white/50">
            <div className="w-16 h-16 bg-[#2563EB] rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-[#2563EB]/30">
              <MapPin size={32} />
            </div>
            <span className="font-bold text-[#1E3A8A] text-xl">Map View</span>
            <p className="text-sm text-center mt-2 max-w-[200px]">Find the nearest service center to your location</p>
          </div>
        </div>
      </div>
    </div>
  );
};
