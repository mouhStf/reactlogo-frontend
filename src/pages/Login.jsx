import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";


export function LoginPage() {

  const [error, setError] = useState('');

  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    await login(data.get('email'), data.get('password'))
    .then(navigate('/dashboard'))
    .catch(e => setError(e.message));
  }


  return (
    <div className="bg-white">
      <div className="flex justify-center py-15">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h2 className="text-4xl text-black py-5">Connexion</h2>
          {error && <p className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4 w-sm">{error}</p>}
          <div className="flex flex-col py-2">
            <label htmlFor="email" className="text-gray-400">Adresse email *</label>
            <input type="email" name="email" placeholder="Veuillez entrez votre adresse email" className="bg-white border border-gray-300 p-2 rounded-xs w-sm" required/>
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="password" className="text-gray-400">Mot de passe *</label>
            <input type="password" name="password" placeholder="Veuillez entrez votre mot de passe" className="bg-white border border-radi border-gray-300 p-2 rounded-xs w-sm" required/>
          </div>
          <div className="py-4 w-full">
            <button type="submit" className="bg-black text-white p-3">Se connecter</button>
          </div>
          <div className="w-full max-w-full text-sm">
            Vous n'avez encore de compte ? <NavLink to='/signup' className="text-sm text-white px-2 py-1 bg-gray-700">Créer un compte</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
