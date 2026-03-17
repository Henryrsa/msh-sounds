export default function Loading() {
  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-msh-red/30 border-t-msh-red rounded-full animate-spin mx-auto mb-6"></div>
        <p className="text-foreground-muted">Loading...</p>
      </div>
    </div>
  );
}
