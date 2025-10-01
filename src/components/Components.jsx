import { NavLink } from "react-router";
import { API_BASE_URL } from "../utils/api";

export function Img({...props }) {
  return <img {...props} onError={(e) => e.currentTarget.src=`${API_BASE_URL}/public/Fashion/1.jpg`} />;
}


export function Mnav({children, ...props}) {
  return <NavLink {...props} onClick={() => window.scrollTo(0, 0)}>{children}</NavLink>
}
