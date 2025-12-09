export function LoadingPlayer() {
  return (
    <div className="relative aspect-video w-full bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    </div>
  );
}
