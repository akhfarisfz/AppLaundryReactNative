import { useCallback, useEffect, useRef, useState } from "react";
import useHTTP from "../../hooks/useHTTP";
import useJWT from "../../hooks/useJWT";
import { ScrollView, Text, View, RefreshControl } from "react-native";
import { List, Badge, Searchbar } from "react-native-paper"
import useMessage from "../../hooks/useMessage";
import { BASE_URL } from "../../settings";
import { Appbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import WidgetCommonHeader from "../../widgets/commons/WidgetCommonHeader";
import WidgetCommonAuth from "../../widgets/commons/WidgetCommonAuth";
import WidgetCommonStatus from "../../widgets/commons/WidgetCommonStatus";
 

const ScreenTerimaList = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarTerima, setDaftarTerima] = useState([])
  
  const onTerimaList = async (params) => {
    const url = `${BASE_URL}/terima/`;
    const config = {
      headers: {
        Authorization: await jwt.get(),
      },
      params
    }
    http.privateHTTP.get(url, config).then((response) => {
      const { results, ...pagination } = response.data;
      setDaftarTerima(results)
    }).catch((error) => {
      message.error(error);
    })
  }

  useEffect(() => {
    if (isFocused) {
      onTerimaList()
    }
    
  }, [isFocused]);


  return (
    <>
      <View>
        <WidgetCommonHeader 
          back={(
            <Appbar.BackAction onPress={navigation.goBack} />
          )}
          title={"Terima"} 
          action={(
            <Appbar.Action icon="plus-circle-outline" onPress={() => {
              navigation.navigate('ScreenTerimaCreate')
            }} />
          )}
        />
        <Searchbar
          placeholder="Search"
          style={{marginHorizontal: 16, marginVertical: 16}}
          onChangeText={(text) => {
            const debounce = setTimeout(() => {
              onTerimaList({search: text})
              clearTimeout(debounce)
            }, 1000)
          }}
        />
        <WidgetCommonAuth child={(
          <ScrollView
            style={{width: "100%"}}
            // onScroll={(e) => {console.log(e.contentOffset)}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
            }
          >
            {daftarTerima.map((terima) => (
              <List.Item
                onPress={() => navigation.navigate("ScreenTerimaDetail", {id: terima._id})}
                key={terima.id}
                title={terima.pelanggan.nama}
                left={props => <List.Icon {...props} icon="folder-outline" />}
                right={props => (
                  <WidgetCommonStatus status={terima.status} />
                )}
              />
            ))}
          </ScrollView>

        )} />
      </View>
    </>
  )
}

export default ScreenTerimaList;