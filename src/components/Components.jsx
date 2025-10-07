import { NavLink } from "react-router";
import { API_BASE_URL } from "../utils/api";
import { useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

export function Img({...props }) {
  const [err, setErr] = useState(false);

  useEffect(() => {
    setErr(false);
  }, [props.src])

  const handleError = (e) => {
    setErr(true);
  }

  return (
    <>
      {err ?
        <div {...props} className={props.className + " flex justify-center items-center"}>
          <PhotoIcon className="size-17"/>
        </div>
        :
        <img {...props} onError={handleError} />
      }
    </>
  );
}


export function Mnav({children, ...props}) {
  return <NavLink {...props} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>{children}</NavLink>
}

export function Loading() {
  return (
    <div className="flex justify-center items-center" style={{minHeight: "calc(100vh - 390px)"}}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
    </div> 
  )
}
