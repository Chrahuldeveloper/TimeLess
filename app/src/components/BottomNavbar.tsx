import { Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'

interface BottomNavbarProps {
  page: string
}

const navItems = [
  { label: "Home", icon: "home" },
  { label: "About", icon: "link" },
  { label: "Profile", icon: "profile" }
]

export default function BottomNavbar({ page }: BottomNavbarProps) {
  return (
    <View className="absolute bottom-0 left-0 right-0 h-16 pt-1.5 bg-white border-t border-gray-200 flex-row items-center justify-around">
      {navItems.map((item) => {
        const isActive = page === item.label

        return (
          <View
            key={item.label}
            className={`${isActive ? "bg-[#ebf6f5]" : ""} px-3 py-2 flex flex-col justify-center items-center rounded-lg`}
          >
            <AntDesign
              name={item.icon as any}
              size={20}
              color={isActive ? "green" : "gray"}
            />
            <Text
              className={`text-xs ${isActive ? "text-green-500" : "text-gray-500"}`}
            >
              {item.label}
            </Text>
          </View>
        )
      })}
    </View>
  )
}
