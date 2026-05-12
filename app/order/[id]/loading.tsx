export default function OrderStatusLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-20 pt-20 flex items-start justify-center">
      <div className="w-full max-w-3xl px-6 lg:px-8 py-10 space-y-6">
        <div className="skeleton h-72 rounded-3xl"></div>
        <div className="skeleton h-28 rounded-2xl"></div>
        <div className="skeleton h-52 rounded-2xl"></div>
      </div>
    </div>
  );
}
