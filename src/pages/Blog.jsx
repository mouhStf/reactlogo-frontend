import { NavLink } from "react-router";
import { PageChanger } from "./Shop";
import { API_BASE_URL, apiFetch } from "../utils/api";
import { useEffect } from "react";
import { useBlog } from "../hooks/useBlog";
import { Img, Mnav } from "../components/Components";

export function Blog() {
  const {articles, getArticles} = useBlog();
  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="p-[50px] mt-[50px] flex flex-col items-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 max-w-[1200px]">
        {articles.map((item, i) => (
          <div key={i} className="px-[12px] mb-16">
            <Mnav to={`${item.id}`}>
              <Img src={`${API_BASE_URL}/public/Fashion/${item.image}`} className="aspect-45/28 object-cover"/>
            </Mnav>
            <div className="text-xl text-gray-400 mt-3">{item.category} / {item.date}</div>
            <NavLink to="article" className="text-3xl text-black mt-2">{item.title}</NavLink>
            <div className="text-gray-400 mt-2">{item.summary}</div>
          </div>
        ))}
      </div>
      <PageChanger />
    </div>
  );
}
