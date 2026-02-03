import { View, Text, Image } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import BottomNavbar from "@/components/BottomNavbar";

export default function Home() {

    const cardsData = [
        {
            img: "https://images.pexels.com/photos/52608/pexels-photo-52608.jpeg",
            title: "Build Faster Products",
            para: "Turn your ideas into real products using clean architecture and scalable design patterns.",
            tags: ["Fast Setup", "Scalable Code", "Modern Stack"]
        },
        {
            img: "https://images.pexels.com/photos/52608/pexels-photo-52608.jpeg",
            title: "Smart AI Integration",
            para: "Integrate AI features into your apps to automate workflows and enhance user experience.",
            tags: ["Automation", "AI Tools", "User Insights"]
        },
        {
            img: "https://images.pexels.com/photos/52608/pexels-photo-52608.jpeg",
            title: "Secure Web Systems",
            para: "Protect your platform with industry-standard security and performance optimizations.",
            tags: ["Done"]
        }
    ];
    return (
        <View className="bg-[#fbfaf9] w-full h-full">
            <View className="p-4 ">
                <Text className="text-2xl font-semibold">InBox</Text>
                <Text className="pt-2 text-gray-500">2 pending · 1 processing</Text>
            </View>

            {
             cardsData.map((i, id) => {
                    return (
                        <View key={id} className={` ${ i.tags.includes("Done") ? "bg-[#f0f5f1]" : null } flex flex-row gap-3 justify-around items-center p-3 border-[1px] border-gray-200 rounded-xl max-w-md m-3`}>
                            <View>
                                <Image
                                    src={i.img}
                                    className="w-20 h-20 rounded-lg"
                                />
                            </View>
                            <View>
                                <Text className="font-semibold">
                                    {i.title}
                                </Text>
                                <Text className="text-sm pt-1">
                                    {i.para.slice(0, 40)}
                                </Text>
                                <View className="pt-1 flex flex-row gap-4">
                                {
                                    i.tags.map((tag, key) => {
                                        return (
                                            <View key={key}>
                                                <Text className={` ${tag === "Done" ? "text-green-500  bg-green-200 px-3 py-1 rounded-full" : "text-black " } text-xs`}>
                                                    {tag}
                                                </Text>
                                            </View>
                                        )
                                    })
                                }
                              </View>
                            </View>
                        </View>
                    )
                })
            }

                <View className="absolute bottom-20 right-6 bg-green-500 p-3 rounded-full shadow-lg">
                <AntDesign name="plus" size={24} color="white" />
                </View>

<BottomNavbar page="Home"/>
        </View>
    )
}