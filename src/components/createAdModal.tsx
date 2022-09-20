import { Check, GameController } from 'phosphor-react';
import { useEffect, useState , FormEvent} from 'react';
import { Input } from './input';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as Toggle from '@radix-ui/react-toggle-group';
import axios from 'axios';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setVoiceChannel] = useState(false)

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data)
      })
  }, [])

  async function  handleCreatedAd(event: FormEvent) {
   event.preventDefault();
   const formData = new FormData(event.target as HTMLFormElement)
   const data = Object.fromEntries(formData);
   
   if(!data.name){
    return;
   }

   try {
    await axios.post(`http://localhost:3333/games/${data.game}/ads`,{
      name: data.name,
      yearsPlaying: Number(data.yearsPlaying),
      discord: data.discord,
      weekDays: weekDays.map(Number),
      hoursStart: data.hoursStart,
      hoursEnd: data.hoursEnd,
      useVoiceChannel: useVoiceChannel
   })  
     alert("Sucesso foi criado o anuncio a procura do duo!!" )
   } catch (error) {
     console.log(error)
   }
  }
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>Publique um Anúncio</Dialog.Title>
        <form onSubmit={handleCreatedAd} className='mt-8 flex flex-col gap-6 '>
          <Select.Root name='game'>
            <Select.Trigger className='flex relative items-start justify-start' aria-label="Games">
              <Select.Value placeholder="Selecione o jogo que deseja jogar" />
              <Select.Icon  >
              </Select.Icon>
            </Select.Trigger>
            <Select.Content className='fixed top-2 right-2 bottom-2 left-2 bg-[#2A2634] rounded-lg'>
              <Select.Viewport  className='flex flex-col justify-start items-start'>
                {games.map(game => {
                  return (
                    <Select.Group   className='flex flex-cols gap-2 justify-start items-start'>
                      <Select.Item  className='grid grid-cols-2 justify-center gap-1 items-center hover:bg-violet-900 shadow-sm' value={game.id}>
                        <Select.ItemText>{game.title} </Select.ItemText>
                        <Select.ItemIndicator >
                          <Check className='w-4 h-4 grid grid-row-2' />
                        </Select.ItemIndicator>
                      </Select.Item>
                    </Select.Group>
                  )
                })}
              </Select.Viewport>
            </Select.Content>
          </Select.Root>
          <div className='flex flex-col gap-2'>
          <label htmlFor='name'> Qual seu nome? </label>
           <Input id='name' name='name' placeholder='Qual seu nome ?'/>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='yearsPlaying'> Joga há quantos anos? </label>
              <Input id='yearsPlaying' name='yearsPlaying' type='number' placeholder='Tudo bem ser ZERO.' />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='discord'> Qual seu discord? </label>
              <Input id='discord' name='discord' placeholder='Usuario#0000' type='text' />
            </div>
          </div>
          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='weekDay'> Quando costuma jogar?</label>
                <Toggle.Root onValueChange={setWeekDays} type='multiple' className='grid grid-cols-4 gap-2'>
                <Toggle.Item className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0') ? 'bg-violet-500' :  ''  }`} value={"0"} title='Domingo'>D</Toggle.Item>
                <Toggle.Item className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('1') ? 'bg-violet-500' :  ''  }`} value={"1"} title='Segunda'>S</Toggle.Item>
                <Toggle.Item className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('2') ? 'bg-violet-500' :  ''  }`} value={"2"} title='Terça'>T</Toggle.Item>
                <Toggle.Item className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('3') ? 'bg-violet-500' :  ''  }`} value={"3"} title='Quarta'>Q</Toggle.Item>
                <Toggle.Item className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('4') ? 'bg-violet-500' :  ''  }`} value={"4"} title='Quinta'>Q</Toggle.Item>
                <Toggle.Item className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('5') ? 'bg-violet-500' :  ''  }`} value={"5"} title='Sexta'>S</Toggle.Item>
                <Toggle.Item className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('6') ? 'bg-violet-500' :  ''  }`} value={"6"} title='Sábado'>S</Toggle.Item>
                </Toggle.Root>
            </div>
            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor='hourStart'> Qual horário do dia?</label>
              <div className='grid grid-cols-2 gap-2'>
                <Input name='hoursStart' id='hourStart'  type='time' placeholder='De' />
                <Input name='hoursEnd'   id='hourEnd'    type='time' placeholder='Até' />
              </div>
            </div>
          </div>
          <label className='mt-2 flex items-center gap-2 text-sm'>
            <Checkbox.Root className='w-6 h-6 p-1 round bg-zinc-900' checked={useVoiceChannel} onCheckedChange={(checked) => {
            if(checked === true) {
              setVoiceChannel(true);
            }else {
              setVoiceChannel(false);    
            }}}>
              <Checkbox.Indicator>
                <Check className='w-4 h-4 text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>
          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
            <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' type='submit'>
              <GameController className='w-6 h-6' />
              Encontrar duo </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}