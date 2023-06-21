
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import './index.css'
import Home from './pages/Home'
import Avaliados from './pages/Avaliados.jsx'
import Movie from './pages/Movie'
import Search from './pages/Search'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />} >
        <Route path='/' element={<Home />} />
        <Route path='movie/:id' element={<Movie />} />
        <Route path='avaliados' element={<Avaliados />} />
        <Route path='search' element={<Search />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
