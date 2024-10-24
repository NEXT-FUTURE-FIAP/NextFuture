import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GlobalStyled from './global-style.js'

import Home from './routes/Home/index.jsx'
import PrixPredict from './routes/PrixPredict/index.jsx'
import Racing from './routes/Racing/index.jsx'
import Game from './routes/Game/index.jsx'
import Error from './routes/Error/index.jsx'
import Login from './routes/Login/Login.jsx'
import CadUsuarios from './routes/Login/CadastroUsuario.jsx'
import User from './routes/User/index.jsx'
import Forum from './Forum/forum.jsx'
import NovoTopico from './Forum/novoTopico.jsx'
import Topico from './Forum/topico.jsx'
import Comentario from './Forum/comentario.jsx'



const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement:<Error/>,

    children: [
      {
        path:'/',
        element:<Home/>,
      },
      {
        path:'/palpite',
        element:<PrixPredict/>,
      },
      {
        path:'/corridas',
        element:<Racing/>,
      },
      {
        path:'/game',
        element:<Game/>,
      },
      {
        path:'/login',
        element:<Login/>,
      },
      {
        path:'/cadastro',
        element:<CadUsuarios/>,
      },
      {
        path:'/perfil',
        element:<User/>,
      },
      {
        path:'/forum',
        element:<Forum/>,
      },
      {
        path:'/novotopico',
        element:<NovoTopico/>,
      },
      {
        path:'/topico/:id',
        element:<Topico/>,
      },
      {
        path:'/comentario/:id',
        element:<Comentario/>,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <GlobalStyled/>
  </StrictMode>,
)
