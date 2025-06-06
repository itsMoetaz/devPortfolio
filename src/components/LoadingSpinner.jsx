const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
      <div className="text-center space-y-4">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <p className="text-base-content/70">Loading 3D Experience...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner