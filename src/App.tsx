import { useEffect, useState } from 'react';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/createdAdBanner';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';

import './styles/main.css';
import logo from './assets/Logo.svg';
import { CreateAdModal } from './components/createAdModal';



interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data);
      })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logo} alt='Logo'></img>
      <h1 className='text-6xl text-white font-black mt-20 '>Seu <span className='text-transparent bg-nlw-gradient  bg-clip-text '>duo</span> está aqui.</h1>
      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          )
        })}

      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal/>
      </Dialog.Root>
    </div>
  )
}

export default App
