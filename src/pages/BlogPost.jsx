import { NavLink, useParams } from "react-router";
import { API_BASE_URL } from "../utils/api";
import { useEffect } from "react";
import { useBlog } from "../hooks/useBlog";
import { Img, Mnav } from "../components/Components";


function Crender({element, cls, data}) {
  switch(element) {
    case 'p':
      return <p className={cls}>{data}</p>
    case 'h2':
      return <h2 className={cls}>{data}</h2>
    case 'ul':
      return (
        <ul className={cls}>
          {data.map((item, i) => (
            <li key={i} className={item.classe}>{item.data}</li>
          ))}
        </ul>
      );
    case 'img':
      return <img className={cls} src={`${API_BASE_URL}/public/Fashion/${data}`}/>
    default:
      return <div className={cls}>{data}</div>
  }
}

export function RFormatted({data}) {
  return (
    <>
      {data.map((item, i) => (
        <Crender key={i} element={item.element} cls={item.classe} data={item.data} />
      ))}
    </>
  );
}

export function BlogPost() {
  const { id } = useParams();
  const {blogPost: b, getBlogPost} = useBlog();

  useEffect(()=>{
    getBlogPost(id);
  },[id]);

  return (
    <div className="min-h-screen border-t-1 border-t-stone-200">
      { b &&
        <div className="mt-[100px] px-8">
          <Head category={b.category.name} date={b.article.date} title={b.article.title} />
          <div className="flex flex-col items-center md:items-start md:flex-row space-x-13">
            <div className="w-full max-w-[515px] md:max-w-full mb-16">
              <Article image={b.article.image} content={b.article.content}/>
              <Links tags={b.tags} prev={b.previous} next={b.next}/>
              <Author author={b.author} user={b.user}/>
              <Commentaires n={b.n} comments={b.comments} />
            </div>
            <Side />
          </div>
          <Related articles={b.sims}/>
        </div>
      }
    </div>
  );
}

function Head({category, date, title}) {
  return (
    <div className="text-center mb-28">
      <div className="text-gray-500 text-xl mb-4">
        {category} / {date}
      </div>
      <h1 className="text-8xl mb-6">
        {title}
      </h1>
      <div className="text-lg mb-3">
        Accueil / Blog / Article
      </div>
    </div>
  );
}

function Side() {
  const {blogPostSide, getBlogPostSide} = useBlog();
  useEffect(() => {
    getBlogPostSide();
  }, []);
  const recentPosts = [
    {
      image: '0.jpg',
      category: 'Tenues Traditionnelles',
      date: '15 janv. 2022',
      title: 'Le Boubou Iconique : Vêtement Intemporel du Sénégal',
      description: 'Découvrez la signification culturelle et les adaptations modernes du boubou, une robe fluide symbolisant respect et communauté dans la mode sénégalaise.',
    },
    {
      image: '1.jpg',
      category: 'Focus Créateur',
      date: '10 févr. 2022',
      title: 'Selly Raby Kane : Révolution de la Couture Sénégalaise',
      description: 'Découvrez comment Selly Raby Kane mêle motifs wolofs traditionnels et silhouettes contemporaines pour une renommée mondiale.',
    },
    {
      image: '2.jpg',
      category: 'Streetwear',
      date: '05 mars, 2022',
      title: 'Style Urbain de Dakar : Fusion d’Héritage et Modernité',
      description: 'Des marchés animés aux avenues branchées, les jeunes sénégalais mêlent streetwear et motifs culturels pour un look unique.',
    }
  ]
  return (
    <div className="max-w-[515px] lg:min-w-[300px]">
      <input type="text" className="border border-gray-300 w-full py-3 px-4 mb-10" placeholder="Chercher"/>

      {
        blogPostSide && 
        <>
          <div className="mb-10">
            <h2 className="text-3xl mb-3">Catégories</h2>
            <div className="border-t-1 border-gray-300 pt-4">
              {blogPostSide.categories.map((c, i) => (
                <NavLink key={i} className="block text-lg hover:underline underline-offset-4 cursor-pointer">
                  {c.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl mb-3">Tags</h2>
            <div className="border-t-1 border-gray-300 flex flex-wrap space-x-2 space-y-2 max-w-[288px] pt-4 text-gray-500">
              {blogPostSide.tags.map((t, i) => (
                <NavLink key={i} className="border border-gray-600 py-2 px-3 text-md cursor-pointer hover:text-white hover:bg-gray-500">
                  {t.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl mb-3">Post récents</h2>
            <div className="border-t-1 border-gray-300 space-y-3 pt-4">
              {blogPostSide.recents.map((a, i) => (
                <Mnav key={i} className="flex space-x-4 text-lg cursor-pointer items-center" to={`/blog/${a.id}`}>
                  <img src={`${API_BASE_URL}/public/Fashion/${a.image}`} className="aspect-square h-[65px] w-[65px] object-cover"/>
                  <div className="">
                    <div className="text-gray-500 text-lg">{a.date}</div>
                    <div className="text-md max-h-17 leading-5 overflow-hidden">{a.title}</div>
                  </div>
                </Mnav>
              ))}
            </div>
          </div>
        </>
      }

      <div className="mb-10">
        <h2 className="text-3xl mb-3">Suivez nous</h2>
        <div className="border-t-1 border-gray-300 pt-4">
          {["Facebook", "Twitter", "Pinterest", "Youtube"].map((item, i) => (
            <NavLink key={i} className="block text-lg hover:underline underline-offset-4 cursor-pointer">
              {item}
            </NavLink>
          ))}
        </div>
      </div>

    </div>
  );
}


function Article({image, content}) {

  return (
    <>
      {content && image && 
        <>
          <img src={`${API_BASE_URL}/public/Fashion/${image}`} className="aspect-45/28 object-cover mb-10"/>
          <div className="text-lg text-gray-600 mb-5">
            <RFormatted data={content} />
          </div>

        </>
      }

    </>
  );
}

function Links({tags, prev, next}) {
  return (
    <div className="text-xl mb-14">
      <div className="flex justify-between  mb-3">
        <div className="space-x-2">
          {tags && 
            <>
              {tags.map((tag, i) => (
              <NavLink key={i}>{tag.name}</NavLink>
              ))}
            </>
           }
        </div>
        <div>
          <span className="text-gray-500">Partager :</span> <NavLink>Facebook</NavLink> <NavLink>Twitter</NavLink> <NavLink>Instagram</NavLink> <NavLink>Youtube</NavLink>
        </div>
      </div>
      <div className="flex justify-between text-xl">
        {prev && <Mnav to={`/blog/${prev.id}`}>{prev.title}</Mnav>}
        {next && <Mnav to={`/blog/${next.id}`}>{next.title}</Mnav>}
      </div>
    </div>
  );

}

function Author({author, user}) {

  return (
    <>
      {author && user && (
        <div className="border-t-1 border-b-1 flex items-center py-8 px-3 space-x-[20px] border-gray-300 mb-6">
          <Img src={`${API_BASE_URL}/public/Fashion/${user.avatarURL}`} className="aspect-1/1 w-[185px] object-cover"/>
          <div>
            <div className="text-xl">{author.name}</div>
            <div className="text-lg text-gray-600">{author.title}</div>
            <div className="text-lg text-gray-600">{author.summary}</div>
          </div>
        </div>
      )}
    </>
  );
}

function Input({type = "text", placeholder, className}) {

  const cls = "border border-gray-300 w-full rounded-md text-gray-500 placeholder:text-gray-600 focus:outline-5 outline-gray-300 focus:border-gray-400"

  if (type === "textarea") {
    return (
          <textarea placeholder={placeholder} className={`${cls} h-20 p-4 ${className}`}/>
    );
  }
  return (
            <input type="text" placeholder={placeholder} className={`${cls} py-2 px-4 ${className}`}/>
);
}

function Commentaires({comments, n}) {

  return (
    <div className="px-5">
      <div className="text-5xl mb-6">
        {n} Commentaires 
      </div>
      <div className="space-y-2 mb-10">
        {comments && 
          <>
            {comments.map((c, i) => (
            <div key={i} className="flex space-y-0 items-center space-x-2 py-2 px-1">
              <div className="overflow-hidden rounded-full w-[140px] h-[140px] min-w-[140px]">
                <Img src={`${API_BASE_URL}/public/Fashion/${c.user.avatarURL}`} className="object-cover w-full h-full"/>
              </div>
              <div className="flex flex-col text-gray-600">
                <div className="text-xl">
                  {c.user.prenom} {c.user.nom}  {c.comment.date}
                </div>
                <p className="text-lg">
                  {c.comment.comment}
                </p>
                <NavLink className="text-black text-md mt-3 underline underline-offset-4">Répondre</NavLink>
              </div>
            </div>
            ))}
          </>
          }
      </div>

      <div>
        <h2 className="text-5xl">Mettre un commentaire</h2>
        <form className="">
          <div className="text-lg text-gray-500 mb-5">Votre adresse email ne sera pas publié. Les chams requis sont marqué *</div>
          <Input type="textarea" placeholder="Ecrivez votre commentaire ici *" className="mb-2"/>
          <div className="flex space-x-6 mb-3">
            <Input placeholder="Ecrivez votre nom complet ici *" />
            <Input placeholder="Ecrivez votre email ici *"/>
          </div>
          <div className="text-lg text-gray-500 mb-5">
            <input type="checkbox" /> Enregistrer mon nom et mon adresse email sur ce navigateur pour la prochaine fois.
          </div>

          <button className="bg-[#8c907e] text-white text-xl w-full py-2 cursor-pointer hover:bg-[#5e624e]">Poster le commentaire</button>
        </form>
      </div>
    </div>
  );
}

function Related({articles}) {
  return (
    <div className="mt-16">
      <div className="text-6xl mb-10">Posts semblables</div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 max-w-[1200px]">
        {articles.map((a, i) => (
          <div key={i} className="px-[12px] mb-16">
            <NavLink to="article">
              <Img src={`${API_BASE_URL}/public/Fashion/${a.image}`} className="aspect-45/28 object-cover"/>
            </NavLink>
            <div className="text-xl text-gray-400 mt-3">{a.category} / {a.date}</div>
            <NavLink to="article" className="text-3xl text-black mt-2">{a.title}</NavLink>
            <div className="text-gray-400 mt-2">{a.summary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

