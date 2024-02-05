import { useContext } from "react"
import { CONTEXT_APP } from "../settings"
import { Banner } from 'react-native-paper';
import { Alert } from "react-native";

const WrapperPageAuth = () => {
  const application = useContext(CONTEXT_APP);

  return (
    <>
      <Banner
        visible={!application.isAuthenticated}
        actions={[
          {
            label: 'Sign In Now!',
            onPress: () => Alert.alert("Ups!"),
          },
        ]}
        >
        Hey, halaman ini butuh signin.
      </Banner>
    </>
  )
}

export default WrapperPageAuth;