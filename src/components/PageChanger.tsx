function generatePaginationArray(totalPages: number, currentPage: number) {
  console.log(totalPages, currentPage)
  const maxPages = Math.min(7, totalPages);
  const pages: number[] = [];

  const d = -Math.floor((maxPages-1)/2);
  const f = Math.ceil((maxPages-1)/2);

  let k = 0;
  if (currentPage + d < 1) {
    k = 1 - (currentPage + d)
  }
  if (currentPage + f > totalPages) {
    k = totalPages - (currentPage + f)
  }

  for (let i = d; i <= f; i++) {
    pages.push(i + currentPage + k)
  }

  return pages;
}

export function PageChanger(
  {current, pages, action = () => {}} :
  {current: number; pages: number; action: (page: number) => void}) {

  // action : (page) => {}

  return (
    <div className="py-10 flex justify-center">
      <div className="flex w-fit font-sans space-x-1">
        {generatePaginationArray(pages, current).map((p, i) => (
          p === current ?
            <button key={i} onClick={() => action(p)} className="bg-black text-white cursor-pointer w-6 h-8 text-center"><div className="mt-1" >{p}</div></button>
            :
            <button key={i} onClick={() => action(p)} className="hover:bg-gray-200 cursor-pointer w-6 h-8 text-center"><div className="mt-1" >{p}</div></button>
        ))}
      </div>
    </div>
  ); 
}
