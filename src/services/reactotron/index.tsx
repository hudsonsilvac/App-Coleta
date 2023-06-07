import { NativeModules } from "react-native";
import reactotron from "reactotron-react-native";

if (__DEV__) {
    const { scriptURL } = NativeModules.SourceCode;
    const host = scriptURL.split('://')[1].split(':')[0]
    
    reactotron
        .configure({host})
        .useReactNative()
        .connect()
}

export default reactotron