export function Picture({src, aspect, maxHeight, alt=""}) {

  return (
    <div className="flex items-center justify-center transition-all duration-500 overflow-hidden hover:scale-95 " >
      <img 
        className={`object-cover object-center transition-all duration-500 overflow-hidden hover:scale-110`}
        style={{ aspectRatio: aspect, maxHeight: `${maxHeight}px` }}
        src={src} alt={alt} />
    </div>
  );
}
