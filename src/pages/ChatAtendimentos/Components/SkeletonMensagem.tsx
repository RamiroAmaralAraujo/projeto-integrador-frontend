export function SkeletonMensagem() {
  return (
    <>
      <div className="p-8 mt-14 animate-pulse">
        <div className="flex justify-start mb-4">
          <div className="w-5/6 h-32 bg-gray-200 rounded-2xl animate-pulse" />
        </div>
        <div className="flex justify-end mb-4">
          <div className="w-5/6 h-32 bg-gray-200 rounded-2xl animate-pulse" />
        </div>
        <div className="flex justify-start mb-4">
          <div className="w-5/6 h-32 bg-gray-200 rounded-2xl animate-pulse" />
        </div>
        <div className="flex justify-end mb-4">
          <div className="w-5/6 h-32 bg-gray-200 rounded-2xl animate-pulse" />
        </div>
      </div>
    </>
  );
}
