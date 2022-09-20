interface GameBannerProps{
  bannerUrl: string;
  title : string;
  adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <a href="" className='relative rounded overflow-hidden'>
          <img src={props.bannerUrl} alt='' >
          </img>
          <div className='w-full pt-16 pb-4 px-4 bg-nlw-game-gradient absolute bottom-0 right-0 left-0'>
            <strong className='font-bold text-white block'>{props.title}</strong>
            <span className='text-sm text-zinc-300 block'>{props.adsCount}</span>
          </div>
        </a>
  )
}