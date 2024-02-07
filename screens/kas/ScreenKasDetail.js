import { StyleSheet, View, Text } from 'react-native';
import { Appbar, TextInput, List } from 'react-native-paper';
import WidgetCommonValidator from '../../widgets/commons/WidgetCommonValidator';
import useMessage from '../../hooks/useMessage';
import useHTTP from '../../hooks/useHTTP';
import useJWT from '../../hooks/useJWT';
import { useEffect, useState } from 'react';
import useValidator from '../../hooks/useValidator';
import { BASE_URL } from '../../settings';
import WidgetCommonHeader from '../../widgets/commons/WidgetCommonHeader';
import WidgetCommonAuth from '../../widgets/commons/WidgetCommonAuth';

const ScreenKasDetail = ({ navigation, route }) => {
    const jwt = useJWT()
    const http = useHTTP()
    const message = useMessage();

    const [kas, setKas] = useState({
        id: ""
    })
    const kasValidator = useValidator({
        id: [],
    })

    // const handleChangeKas = (text, field) => {

    //     const value = parseFloat(text.replace(/[^0-9]/g, '')); //
    //     setKas({ ...kas, [field]: text })
    // }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    }
    const onKasUpdate = async () => {
        try {
            kasValidator.reset()
            const config = {
                headers: {
                    Authorization: await jwt.get(),
                },
            }
            const url = `${BASE_URL}/kas/${route.params.id}`
            http.privateHTTP.put(url, kas, config).then((response) => {
                message.success(response)
                navigation.goBack()
            }).catch((error) => {
                message.error(error)
                kasValidator.except(error);
                console.log(error);
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onkasDetail = async () => {
        try {
            const config = {
                headers: {
                    Authorization: await jwt.get(),
                },
            }
            const url = `${BASE_URL}/kas/${route.params.id}`
            http.privateHTTP.get(url, config).then((response) => {
                setKas(response.data);
            }).catch((error) => {
                message.error(error)
                console.log(error);
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onKasDelete = () => {
        try {
            message.confirmRemove(async () => {
                const config = {
                    headers: {
                        Authorization: await jwt.get(),
                    },
                }
                const url = `${BASE_URL}/kas/${route.params.id}`
                http.privateHTTP.delete(url, config).then((response) => {
                    message.success(response)
                    navigation.goBack()
                }).catch((error) => {
                    message.error(error)
                    console.log(error);
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (route.params.id) {
            onkasDetail()
        }
    }, [route.params])
    // console.log(kas.pemasukan)
    return (
        <>
            <View>
                <WidgetCommonHeader
                    back={(
                        <Appbar.BackAction onPress={navigation.goBack} />
                    )}
                    title="Detail Kas"
                />

                {/* <WidgetCommonAuth child={(
                    
                    <View style={styles.container}>
                        <View style={styles.wrapperControl}>
                            <TextInput
                                label="nomorTransaksi"
                                autoCapitalize="none"
                                value={kas.nomorTransaksi}
                                onChangeText={text => handleChangeKas(text, "nomorTransaksi")}
                            />
                            <WidgetCommonValidator messages={kasValidator.get('nomorTransaksi')} />
                            <TextInput
                                label="Pemasukan"
                                keyboardType="numeric" 
                                value={kas.pemasukan ? kas.pemasukan.toString() : '0'}
                                onChangeText={text => handleChangeKas(text, "pemasukan")}
                            />
                            <WidgetCommonValidator messages={kasValidator.get('pemasukan')} />
                            <TextInput
                                label="Pengeluaran"
                                keyboardType="numeric" 
                                value={kas.pengeluaran ? kas.pengeluaran.toString() : '0'} 
                                onChangeText={text => handleChangeKas(text, "pengeluaran")}
                            />
                            <WidgetCommonValidator messages={kasValidator.get('pengeluaran')} />

                        </View>
                        <View style={[styles.wrapperControl, styles.buttonActions]}>
                            <Button onPress={onKasDelete} mode="outlined">Hapus</Button>
                            <Button onPress={onKasUpdate} mode="contained">Simpan</Button>
                        </View>
                    </View>
                )} /> */}
                <List.Section>
                    <List.Subheader>Pembayaran</List.Subheader>
                    <List.Item title={"Nomor Transaksi"} right={() => <Text>{kas.nomorTransaksi} Kg</Text>} />
                    <List.Item title={"Pemasukan"} right={() => <Text>{formatCurrency(kas.pemasukan)}</Text>} />
                    <List.Item title={"Pengeluaran"} right={() => <Text>{formatCurrency(kas.pengeluaran)}</Text>} />
                </List.Section>
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        height: "90%",
        width: "100%",
        gap: 32,
        paddingHorizontal: 24,
        marginTop: 20
    },
    wrapperControl: {
        width: "100%"
    },
    buttonActions: {
        gap: 16
    }
})

export default ScreenKasDetail;