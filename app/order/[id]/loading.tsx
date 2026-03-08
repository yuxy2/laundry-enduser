export default function OrderStatusLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-20 pt-20 selection:bg-gold selection:text-background flex items-start justify-center">
      <div className="w-full max-w-3xl px-6 lg:px-8 py-10 space-y-12 animate-pulse">
        <div className="bg-panel border border-border-dark h-80"></div>
        <div className="bg-panel border border-border-dark h-32"></div>
        <div className="bg-panel border border-border-dark h-64"></div>
      </div>
    </div>
  );
}
