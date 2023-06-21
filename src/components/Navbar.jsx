import { GoSearch } from 'react-icons/go'
import { FaEarlybirds } from 'react-icons/fa'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!search) return

    navigate(`/search?q=${search}`)

    setSearch('');
  }


  return (
    <nav id='navbar' >
      <h2>
        <Link to="/"> <FaEarlybirds /> Pull Filmes</Link>
      </h2>
      <h3>
        <ul>
          <li>
            <Link to="/">Lançamentos</Link> 
          </li>
          <li>|</li>
          <li>
            <Link to="/avaliados"> Melhores Avaliados </Link>
          </li>
        </ul>
      </h3>
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder='Buscar'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type='submit' >
          < GoSearch />
        </button>
      </form>

    </nav>

  )
}

export default Navbar