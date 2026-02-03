import './global.css';
import { SafeAreaView} from 'react-native-safe-area-context';
import Home from '@/screens/Home';

export default function App() {

  return (
    <SafeAreaView>
     <Home/>
    </SafeAreaView>
  );
}
