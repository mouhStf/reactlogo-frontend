import { NavLink, useSearchParams } from "react-router";
import { API_BASE_URL, apiFetch } from "../utils/api";
import { useCallback, useEffect } from "react";
import { useBlog } from "../hooks/useBlog";
import { Img, Loading, Mnav } from "../components/Components";
import { motion, useScroll, useTransform } from "framer-motion";
import { PageChanger } from "../components/PageChanger";

export function Blog() {

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const category = parseInt(searchParams.get("category") || "0");
  const bTags = (searchParams.getAll("tag") || []).map((t, i) => parseInt(t))
  const qTags = bTags.filter((it, id) => bTags.indexOf(it) === id);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -200]);
  const {articles, getArticles, articlesLoading, categories, getCategories, tags, getTags} = useBlog();

  useEffect(() => {
    getCategories();
    getTags();
    getArticles(page, category, qTags);
  }, [page, category, qTags.join(',')]);

  const navigate = useCallback((page = 0) => {
    setSearchParams({page, category, tag: qTags});
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  const getCategoryName = (id) => {
    let r = "";
    if (categories) {
      for (const c of categories) {
        if (c.id === id) {
          r = c.name;
          break;
        }
      }
    }
    return r;
  }

  const getTagName = (id) => {
    let r = "";
    console.log(tags, id)
    if (tags) {
      for (const c of tags) {
        if (c.id === id) {
          r = c.name;
          break;
        }
      }
    }
    return r;
  }

  return (
    <>
      <section className="h-[420px] relative overflow-hidden" >
        <motion.img src={`${API_BASE_URL}/public/Fashion/1.jpg`} className="fixed object-cover w-full h-full" alt=""
           style={{zIndex: -1, y}}/>
        <div className="relative top-16 flex flex-col justify-center items-center w-full h-full">
          <div className="flex flex-col space-y-3 justify-center items-center text-white px-20 py-10 bg-stone-700/60" >
            <h2 className="text-5xl"><Mnav to={'/blog'} className="hover:underline">Blog</Mnav>{category === 0 ? "" : ` / ${getCategoryName(category)}`}</h2>
            <div className="flex space-x-5">
              {qTags.map((t, i) => (
                <div className="text-3xl border px-1">{getTagName(t)}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="p-[50px] mt-[50px] flex flex-col items-center bg-stone-200">
        { articlesLoading ? 
          <Loading /> :
          <>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 max-w-[1200px]">
              {articles && articles.articles && articles.articles.map((item, i) => (
                <div key={i} className="px-[12px] mb-16">
                  <Mnav to={`${item.id}`}>
                    <Img src={`${API_BASE_URL}/public/Fashion/${item.image}`} className="aspect-45/28 object-cover"/>
                  </Mnav>
                  <Mnav to={`/blog?category=${item.categoryId}`} className="block text-xl text-gray-400 mt-3">{`${getCategoryName(item.categoryId)} /`} {item.date}</Mnav>
                  <NavLink to="article" className="text-3xl text-black mt-2">{item.title}</NavLink>
                  <div className="text-gray-400 mt-2">{item.summary}</div>
                </div>
              ))}
            </div>
            {
              articles && 
                <PageChanger action={navigate} pages={articles.pages ? articles.pages : 1} current={articles.current ? articles.current : 1}/>
            }
          </>
        }
      </section>
    </>
  );
}
