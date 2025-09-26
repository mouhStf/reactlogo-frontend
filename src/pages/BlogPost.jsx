import { NavLink } from "react-router";
import { API_BASE_URL } from "../utils/api";


const blogData = [
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
  },
]

const postData = {
  category: "Fashion",
  title: "How to look outstanding in pastel colour dress",
  date: "12 jan, 2024",
  image: "0.jpg",
  content: [
    {element: "p" ,classe: "py-1", data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur facilisis vivamus massa magna. Blandit mauris libero condimentum commodo morbi consectetur sociis convallis sit. Magna diam amet justo sed vel dolor et volutpat integer. Iaculis sit sapien hac odio elementum egestas neque. Adipiscing purus euismod orci sem amet, et. Turpis erat ornare nisi laoreet est euismod." },

    {element: "p" ,classe: "py-1", data: "Sit suscipit tortor turpis sed fringilla lectus facilisis amet. Ipsum, amet dolor curabitur non aliquet orci urna volutpat. Id aliquam neque, ut vivamus sit imperdiet enim, lacus, vel. Morbi arcu amet, nulla fermentum vitae mattis arcu mi convallis. Urna in sollicitudin in vestibulum erat. Turpis faucibus augue ipsum, at aliquam. Cras sagittis tellus nunc integer vitae neque bibendum eget. Tempus malesuada et pellentesque maecenas. Sociis porttitor elit tincidunt tellus sit ornare. Purus ut quis sed venenatis eget ut ipsum, enim lacus. Praesent imperdiet vitae eu, eu tincidunt nunc integer sit." },

    {element: "p" ,classe: "py-1", data: "Sit suscipit tortor turpis sed fringilla lectus facilisis amet. Ipsum, amet dolor curabitur non aliquet orci urna volutpat. Id aliquam neque, ut vivamus sit imperdiet enim, lacus, vel." },

    {element: "h2" ,classe: "text-3xl mt-2", data: "Consectetur Facilisis Vivamus"},

    {element: "ul", classe: "list-disc pl-5 py-1", data: [
      {data: "Blandit mauris libero condimentum commodo sociis convallis sit."},
      {data: "Magna diam amet justo sed vel dolor et volutpat integer."},
      {data: "Laculis sit sapien hac odio elementum egestas neque."},
    ]},

    {element: "p" ,classe: "py-1", data: "Morbi arcu amet, nulla fermentum vitae mattis arcu mi convallis. Urna in sollicitudin in vestibulum erat. Turpis faucibus augue ipsum, at aliquam. Cras sagittis tellus nunc integer vitae neque bibendum eget. Tempus malesuada et pellentesque maecenas. Sociis porttitor elit tincidunt tellus sit ornare. Purus ut ipsum, enim lacus. Praesent imperdiet vitae eu, eu tincidunt nunc integer sit."},

    {element: "p" ,classe: "py-1", data: "Tortor diam dignissim amet, in interdum aliquet. Magnis dictum et eros purus fermentum, massa ullamcorper sit sollicitudin. Nascetur libero elementum adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc integer etiam. Mattis pulvinar non viverra donec pellentesque. Odio mi consequat libero dolor. Porta ut diam lobortis eget leo, lectus. Nunc tempus feugiat massa laoreet ultrices diam magna quam. Congue auctor auctor luctus neque. Enim lorem ultrices diam donec. Sed id placerat consectetur faucibus."},

    {element: "img", classe: "w-[460px] mt-3", data: "1.jpg" },
    {element: "h2", classe: "text-3xl text-black mb-1", data: "Velit, praesent pharetra malesuada"},

    {element: "p", classe: "py-1", data: "Id pulvinar amet. Consequat potenti mollis massa iaculis et, dolor, eget lectus. Aliquam pellentesque molestie felis fames sed eget non euismod eget. Et eget ullamcorper urna, elit ac diam tellus viverra lacus."},

    {element: "p", classe: "py-1", data: "Tortor diam dignissim amet, in interdum aliquet. Magnis dictum et eros purus fermentum, massa ullamcorper sit sollicitudin. Nascetur libero elementum adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc integer etiam. Mattis pulvinar non viverra donec pellentesque. Odio mi consequat libero dolor. Porta ut diam lobortis eget leo, lectus."},

    {element: "p", classe: "py-1", data: "Velit, praesent pharetra malesuada id pulvinar amet. Consequat potenti mollis massa iaculis et, dolor, eget lectus. Aliquam pellentesque molestie felis fames sed eget non euismod eget. Et eget ullamcorper urna, elit ac diam tellus viverra lacus."},

    {element: "p", classe: "py-1", data: "Tortor diam dignissim amet, in interdum aliquet. Magnis dictum et eros purus fermentum, massa ullamcorper sit sollicitudin. Nascetur libero elementum adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc integer etiam. Mattis pulvinar non viverra donec pellentesque. Odio mi consequat libero dolor. Porta ut diam lobortis eget leo, lectus."},
  ],
}

const author = {
  name: "Adja Youne",
  image: "9.jpg",
  title: "Fashion designer",
  summary: "Nascetur libero elementum adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc integer etiam. Mattis pulvinar non viverra donec pellentesque. Odio mi consequat libero dolor. Porta ut diam lobortis eget leo, lectus. Tortor diam dignissim amet, in interdum aliquet. Magnis dictum et eros purus fermentum, massa ullamcorper sit sollicitudin.",
}

const comments = [
  {
    author: {
      name: "Fili Kane",
      image: "3.jpg",
    }, 
    date: "10 Juillet",
    content: "Tristique tempis condimentum diam done ullancomroer sit element henddg sit he consequert.Tristique tempis condimentum diam done ullancomroer sit element henddg sit he consequert."
  },
  {
    author: {
      name: "Louise Ly",
      image: "14.jpg",
    }, 
    date: "10 Juillet",
    content: "Tristique tempis condimentum diam done ullancomroer sit element henddg sit he consequert.Tristique tempis condimentum diam done ullancomroer sit element henddg sit he consequert."
  },
  {
    author: {
      name: "Natalie Niang",
      image: "15.jpg",
    }, 
    date: "10 Juillet",
    content: "Tristique tempis condimentum diam done ullancomroer sit element henddg sit he consequert.Tristique tempis condimentum diam done ullancomroer sit element henddg sit he consequert."
  },
]

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
  return (
    <div className="min-h-screen border-t-1 border-t-stone-200">
      <div className="mt-[100px] px-8">
        <Head />
        <div className="flex flex-col items-center md:items-start md:flex-row space-x-13">
          <Main />
          <Side />
        </div>
        <Related />
      </div>
    </div>
  );
}

function Head() {
  return (
    <div className="text-center mb-28">
      <div className="text-gray-500 text-xl mb-4">
        {postData.category} / {postData.date}
      </div>
      <h1 className="text-8xl mb-6">
        {postData.title}
      </h1>
      <div className="text-lg mb-3">
        Accueil / Blog / Article
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="w-full max-w-[515px] md:max-w-full mb-16">
      <Article />
      <Links />
      <Author />
      <Commentaires />
    </div>
  )
}

function Side() {
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

      <div className="mb-10">
        <h2 className="text-3xl mb-3">Catégories</h2>
        <div className="border-t-1 border-gray-300 pt-4">
          {["Tous", "Homme", "Femme", "Accessoires", "Fashion", "Coutures", "Maquillage", "Photographie"].map((item, i) => (
            <NavLink key={i} className="block text-lg hover:underline underline-offset-4 cursor-pointer">
              {item}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-3xl mb-3">Tags</h2>
        <div className="border-t-1 border-gray-300 flex flex-wrap space-x-2 space-y-2 max-w-[288px] pt-4 text-gray-500">
          {["Beauté", "Fashion", "Voyage", "Denim", "Tendance", "Couture", "Photographie", "Jackets"].map((item, i) => (
            <NavLink key={i} className="border border-gray-600 py-2 px-3 text-md cursor-pointer hover:text-white hover:bg-gray-500">
              {item}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-3xl mb-3">Post récents</h2>
        <div className="border-t-1 border-gray-300 space-y-3 pt-4">
          {recentPosts.map((item, i) => (
            <NavLink key={i} className="flex space-x-4 text-lg cursor-pointer items-center">
              <img src={`${API_BASE_URL}/public/Fashion/${item.image}`} className="aspect-square h-[65px] w-[65px] object-cover"/>
              <div className="">
                <div className="text-gray-500 text-lg">{item.date}</div>
                <div className="text-md max-h-17 leading-5 overflow-hidden">{item.title}</div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>

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


function Article() {
  return (
    <>
      <img src={`${API_BASE_URL}/public/Fashion/${postData.image}`} className="aspect-45/28 object-cover mb-10"/>
      <div className="text-lg text-gray-600 mb-5">
        <RFormatted data={postData.content} />
      </div>

    </>
  );
}

function Links() {
  return (
    <div className="text-xl mb-14">
      <div className="flex justify-between  mb-3">
        <NavLink>Denim Trending Clothing</NavLink>
        <div>
          <span className="text-gray-500">Partager :</span> <NavLink>Facebook</NavLink> <NavLink>Twitter</NavLink> <NavLink>Instagram</NavLink> <NavLink>Youtube</NavLink>
        </div>
      </div>
      <div className="flex justify-between text-xl">
        <NavLink>Top 10 fashion trend for summer</NavLink>
        <NavLink>Crazy fashion with unique moment</NavLink>
      </div>
    </div>
  );

}

function Author() {
  return (
    <div className="border-t-1 border-b-1 flex items-center py-8 px-3 space-x-[20px] border-gray-300 mb-6">
      <img src={`${API_BASE_URL}/public/Fashion/${author.image}`} className="aspect-1/1 w-[185px] object-cover"/>
      <div>
        <div className="text-xl">{author.name}</div>
        <div className="text-lg text-gray-600">{author.title}</div>
        <div className="text-lg text-gray-600">{author.summary}</div>
      </div>
    </div>
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

function Commentaires() {

  return (
    <div className="px-5">
      <div className="text-5xl mb-6">
        N Commentaires 
      </div>
      <div className="space-y-2 mb-10">
        {comments.map((item, i) => (
          <div key={i} className="flex space-y-0 items-center space-x-2 py-2 px-1">
            <div className="overflow-hidden rounded-full w-[140px] h-[140px] min-w-[140px]">
              <img src={`${API_BASE_URL}/public/Fashion/${item.author.image}`} className="object-cover w-full h-full"/>
            </div>
            <div className="flex flex-col text-gray-600">
              <div className="text-xl">
                {item.author.name}  {item.date}
              </div>
              <p className="text-lg">
                {item.content}
              </p>
              <NavLink className="text-black text-md mt-3 underline underline-offset-4">Répondre</NavLink>
            </div>
          </div>
        ))}
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

function Related() {
  return (
    <div className="mt-16">
      <div className="text-6xl mb-10">Posts semblables</div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 max-w-[1200px]">
        {blogData.map((item) => (
          <div className="px-[12px] mb-16">
            <NavLink to="article">
              <img src={`${API_BASE_URL}/public/Fashion/${item.image}`} className="aspect-45/28 object-cover"/>
            </NavLink>
            <div className="text-xl text-gray-400 mt-3">{item.category} / {item.date}</div>
            <NavLink to="article" className="text-3xl text-black mt-2">{item.title}</NavLink>
            <div className="text-gray-400 mt-2">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

