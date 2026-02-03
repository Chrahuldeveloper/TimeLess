import { Text, View } from 'react-native';
import './global.css';
import { SafeAreaView} from 'react-native-safe-area-context';

export default function App() {

  return (
    <SafeAreaView>
    <View>
      <Text>This view uses custom insets.</Text>
    </View>
    </SafeAreaView>
  );
}
