import { useRef } from "react";
import { ScrollView } from "react-native";

export function useAutoScroll(){

    const scrollViewRef = useRef<ScrollView | null>(null)
    
    function scrollToBottom() {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

    function scrollToTop() {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(0)
    }
  };

  return {scrollToBottom, scrollToTop, scrollViewRef}
}