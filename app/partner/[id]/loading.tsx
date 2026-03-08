export default function PartnerLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-32">
      <div className="h-72 sm:h-96 w-full bg-panel border-b border-border-dark animate-pulse"></div>
      <div className="max-w-4xl mx-auto px-6 sm:px-12 pt-8 sm:pt-12 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <div className="h-6 bg-white/5 w-40 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-panel border border-border-dark p-6 h-24"></div>
              ))}
            </div>
          </div>
          <div className="md:col-span-1 space-y-8">
            <div className="bg-panel border border-border-dark p-6 sm:p-8 h-64"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
