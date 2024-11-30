import './App.css';
import My from './components/My';
import Button from './components/ui/Button';
import { useCounter } from './hooks/counter-context.tsx';
import { SessionProvider } from './hooks/session-context.tsx';
function App() {
  //const [count, setCount] = useState(0);
  const { count, plusCount } = useCounter();

  //const { session, login, logout, saveCartItem, removeCartItem } = useSession();
  return (
    <>
      <SessionProvider>
        <My />
      </SessionProvider>
      <div className='card'>
        <Button onClick={plusCount} className='btn-primary'>
          count is {count}
        </Button>
      </div>
    </>
  );
}

export default App;
