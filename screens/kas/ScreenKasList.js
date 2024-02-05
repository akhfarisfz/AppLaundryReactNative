import { useCallback, useEffect, useRef, useState } from "react";
import useHTTP from "../../hooks/useHTTP";
import useJWT from "../../hooks/useJWT";
import { ScrollView, Text, View, RefreshControl } from "react-native";
import { List } from "react-native-paper"
import useMessage from "../../hooks/useMessage";
import { BASE_URL } from "../../settings";
import { Appbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import WidgetCommonHeader from "../../widgets/commons/WidgetCommonHeader";
import WidgetCommonAuth from "../../widgets/commons/WidgetCommonAuth";


const ScreenKasList = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();
    const http = useHTTP();
    const jwt = useJWT();
    const message = useMessage();

    const [daftarKas, setDaftarKas] = useState([])

    const onRefresh = () => {
        onBarangList()
        console.log("direfresh....")
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    }
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const totalPemasukan = daftarKas.reduce((total, transaksi) => total + transaksi.pemasukan - transaksi.pengeluaran, 0);

    const onKasList = async (params) => {
        const url = `${BASE_URL}/kas`;
        const config = {
            headers: {
                Authorization: await jwt.get(),
            },
            params
        }
        http.privateHTTP.get(url, config).then((response) => {
            const { results, ...pagination } = response.data;
            setDaftarKas(results)
        }).catch((error) => {
            message.error(error);
        })
    }
    useEffect(() => {
        if (isFocused) {
            onKasList()
        }


    }, [isFocused]);

    return (
        <>
            <View>
                <WidgetCommonHeader
                    back={(
                        <Appbar.BackAction onPress={navigation.goBack} />
                    )}
                    title={"Kas"}
                    action={(
                        <Appbar.Action icon="plus-circle-outline" onPress={() => {
                            //   navigation.navigate('ScreenBarangCreate')
                        }} />
                    )}
                />

                <WidgetCommonAuth child={(
                    <ScrollView
                        style={{ width: "100%" }}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Balance</Text>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>{formatCurrency(totalPemasukan)}</Text>
                        {daftarKas.map((detailkas) => (
                            <List.Item
                                onPress={() => navigation.navigate('ScreenKasDetail', { id: detailkas._id })}
                                key={detailkas.id}
                                title={detailkas.nomorTransaksi}
                                description={formatDate(detailkas.created)}
                                left={props => <List.Icon {...props} icon="cash" />}
                                right={() => (
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: detailkas.pemasukan > 0 ? 'green' : 'red' }}>
                                            {detailkas.pemasukan > 0
                                                ? `+${formatCurrency(detailkas.pemasukan)}`
                                                : `-${formatCurrency(detailkas.pengeluaran)}`
                                            }
                                        </Text>
                                    </View>
                                )}
                            />

                        ))}
                    </ScrollView>

                )} />
            </View>
        </>
    )
}

export default ScreenKasList;