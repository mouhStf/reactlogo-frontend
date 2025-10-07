import { NavLink, useParams, useSearchParams } from "react-router";
import { Img, Loading, Mnav } from "../components/Components";
import { useBlog } from "../hooks/useBlog";
import { useCallback, useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../utils/api";
import { ChevronDownIcon, MagnifyingGlassIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { PageChanger } from "../components/PageChanger";

export function Search() {

  const [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get("term");
  const qTags = searchParams.getAll("tag");
  const qCategory = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1");

  const [pattern, setPattern] = useState("");
  const [category, setCategory] = useState("-1");
  const [selectedTags, setSelectedTags] = useState([]);

  const moreRef = useRef(null);
  const [dots, setDots] = useState(false);

  const {
    articleSearchResult, searchArticles, searchLoading,
    tags, getTags, categories, getCategories
  } = useBlog();

  const getTag = useCallback((indx) => {
    let tagName = "undefined"
    if (tags) {
      for (const t of tags) {
        if (t.id === indx) {
          tagName = t.name
          break;
        }
      }
    }
    return tagName;
  }, [tags, selectedTags]);

  useEffect(() => {
    const cTags = qTags.map((t) => parseInt(t));
    if (term) setPattern(term);
    if (qCategory) setCategory(qCategory);
    if (qTags) setSelectedTags(cTags);

    searchArticles(term, cTags, qCategory ? parseInt(qCategory) : -1, page);
  }, [term, qCategory, qTags.join(), page]);

  useEffect(() => {
    getTags();
    getCategories();
    const checkH = () => {
      if (moreRef.current) {
        setDots(moreRef.current.scrollHeight > 30);
      }
    };
    const observer = new ResizeObserver(checkH);
    if (moreRef.current) 
      observer.observe(moreRef.current);
    checkH();

    return () => observer && observer.disconnect();
  }, []);

  const doSearch = ({term = null, cat = null, tags = null, page = 1}) => {
    console.log(page);
    setSearchParams({
      term: term !== null ? term : pattern,
      tag: tags ? tags : selectedTags,
      category: cat ? cat : category,
      page 
    });
  }

  const navigate = (page) => {
    doSearch({page})
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    doSearch({});
  }

  const handleSelectChange = (e) => {
    setCategory(e.target.value)
    doSearch({cat: e.target.value});
  }

  const addTag = (t) => {
    setSelectedTags([...selectedTags, t])
    doSearch({tags: [...selectedTags, t]});
  }

  const deleteTag = (t) => {
    setSelectedTags(selectedTags.filter(tag => tag != t));
    doSearch({tags: selectedTags.filter(tag => tag != t)});
  }

  const handleTermChange = (t) => {
    setPattern(t.target.value);
    doSearch({term: t.target.value})
  }

  return (
    <>
      <section className="py-1 pt-8 space-y-4 bg-stone-100">
        <div className="flex justify-center">
          <div className="w-lg">
            <form onSubmit={(e) => handleFormSubmit(e)} className="w-full flex">
              <input className="text-lg w-full px-4 py-2 rounded-l-md border border-r-0 focus:outline-0" value={pattern} onChange={handleTermChange}/>
              <button className="border px-2 rounded-r-md hover:bg-gray-300 flex items-center" onClick={() => doSearch({})}><MagnifyingGlassIcon className="size-6"/></button>
            </form>
          </div>
        </div>
        <div className="text-md mt-2 flex items-center space-x-8 w-full px-10">
          <div className="flex">
            <button className="h-[30px] mr-1">Catégorie: </button>
            <select value={category} onChange={handleSelectChange} className="border">
              <option value={-1}>Tout</option>
              {categories && categories.map((c, i) => (
                <option key={i} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex w-full h-[30px] overflow-hidden">
            <div className="flex items-center h-[30px] min-w-[47px] px-1">
              Tags :
            </div>
            <Popover className="mr-2">
              <PopoverButton className="flex items-center h-[30px] bg-stone-300 hover:bg-stone-200 px-2 mr-1 rounded-sm">
                <ChevronDownIcon className="size-4" />
              </PopoverButton>
              <PopoverPanel anchor="bottom" className="border bg-stone-200 p-4 w-md" style={{zIndex: "1000"}}>
                <h2>Selected tags</h2>
                <div className="border-t-1 flex flex-wrap py-2 space-y-1 space-x-1">
                  {selectedTags.map((t,i) => (
                    <div className="flex" key={i}>
                      <button className="border border-r-0 pl-1 h-[30px] rounded-l-sm">{getTag(t)}</button>
                      <button onClick={() => deleteTag(t)} className="hover:bg-gray-300 w-[20px] h-[30px] border border-l-0 rounded-r-sm flex justify-center items-center"><XMarkIcon className="size-3"/></button>
                    </div>
                  ))}
                </div>
                <h2>Tags</h2>
                <div className="border-t-1 flex flex-wrap py-2 space-y-1 space-x-1">
                  {tags.filter((t) => !selectedTags.includes(t.id)).map((t,i) => (
                    <button onClick={() => addTag(t.id)} key={i} className="flex items-center h-[30px] border px-1 space-x-1 rounded-sm">{t.name}</button>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
            <div ref={moreRef} className="relative flex flex-wrap space-x-1">
              {
                dots &&
                  <button className="absolute top-0 right-0 h-[30px] bg-gradient-to-r from-transparent via-stone-100/75 via-30% to-stone-100 w-[30px] text-right">. . .</button>
              }
              {selectedTags.map((t,i) => (
                <div className="flex" key={i}>
                  <button className="border border-r-0 pl-1 h-[30px] rounded-l-sm">{getTag(t)}</button>
                  <button onClick={() => deleteTag(t)} className="hover:bg-gray-300 w-[20px] h-[30px] border border-l-0 rounded-r-sm flex justify-center items-center"><XMarkIcon className="size-3"/></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="p-[50px] flex flex-col items-center bg-stone-200">
        {searchLoading ?
          <Loading />
           :
          <>
            {articleSearchResult && articleSearchResult.articles && articleSearchResult.articles.length > 0 ?
              <>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 max-w-[1200px]">
                  {articleSearchResult.articles.map((item, i) => (
                    <div key={i} className="px-[12px] mb-16">
                      <Mnav to={`/blog/${item.id}`}>
                        <Img src={`${API_BASE_URL}/public/Fashion/${item.image}`} className="aspect-45/28 object-cover"/>
                      </Mnav>
                      <div className="text-xl text-gray-400 mt-3">{item.category} / {item.date}</div>
                      <NavLink to="article" className="text-3xl text-black mt-2">{item.title}</NavLink>
                      <div className="text-gray-400 mt-2">{item.summary}</div>
                    </div>
                  ))}
                </div>
                <PageChanger pages={articleSearchResult.pages} current={articleSearchResult.current} action={navigate}/>
              </>
              : 
              <div className="flex items-center w-full" style={{minHeight: "calc(100vh - 390px)"}}>
                <h2 className="text-4xl px-20 text-center w-full">{pattern !== "" ? `Aucun résultat trouver pour ${pattern}` : "Recherche"}</h2>
              </div>

            }
          </>
        }
      </section>
    </>
  );
}
