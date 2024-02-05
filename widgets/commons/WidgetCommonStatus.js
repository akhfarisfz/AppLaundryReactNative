import { Badge, Icon, MD3Colors } from 'react-native-paper';

const WidgetCommonStatus = ({ status }) => {

    switch (status) {
        case 'diproses':
            return <Icon size={30} source={"reload-alert"} color={MD3Colors.error50} />
        case 'selesai':
            return <Icon size={30} source={"playlist-check"} color={MD3Colors.primary20} />
        case 'diambil':
            return <Icon size={30} source={"handshake-outline"} color={MD3Colors.tertiary20} />
        default:
            return <Icon size={30} source={"reload-alert"} color={MD3Colors.error50} />

    }

}

export default WidgetCommonStatus