import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function DropImage() {

    const buttons = [
        {
            tittle: "Camera",
            icon: "camera"
        },
        {
            tittle: "Files",
            icon: "file"
        },
        {
            tittle: "Photos",
            icon: "picture"
        },
    ]

    return (
        <SafeAreaView>
            <View>
                <Text className="text-xl text-center pt-8">
                    Add to Memora
                </Text>
            </View>
            <View className="border-[1px] border-dotted border-gray-400 h-[60vh] mx-5 mt-5 ">
                <View className="flex justify-center items-center pt-36">
                    <AntDesign name="arrow-up" size={24} color="#39ac9d" className="bg-[#e4f1ee]  p-5 rounded-xl" />
                    <Text className="text-xl font-semibold pt-4">
                        Drop anything here
                    </Text>
                    <Text className="text-sm w-60 text-gray-500 text-center pt-3">
                        Screenshots, photos, documents—Memora will figure out what to do next
                    </Text>
                </View>
            </View>



            <View className="flex flex-row justify-around  items-center mt-8">
                {
                    buttons.map((i, id) => {
                        return (
                            <View key={id} className=" border-[1px] flex flex-col items-center gap-4 bg-[#f1f0ee] border-gray-300 w-24 h-24 p-2.5 rounded-xl">
                                <AntDesign
                                    name={i.icon as any}
                                    size={18}
                                    color={"#39ac9d"}
                                    className="bg-[#e4f1ee] w-10 rounded-full h-10 p-2.5"
                                />
                                <Text className="text-xs">
                                    {i.tittle}
                                </Text>
                            </View>
                        )
                    })
                }
            </View>
        </SafeAreaView>
    )
}
