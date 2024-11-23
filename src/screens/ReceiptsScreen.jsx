import { StyleSheet, Text, FlatList, View } from 'react-native';
import receipts from '../data/receipts.json';
import FlatCard from '../components/FlatCard';
import { colors } from '../global/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReceiptsScreen = () => {
  const renderReceiptItem = ({ item }) => {
    const total = item.items.reduce((acumulador, item) => acumulador + item.quantity * item.price, 0);

    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    return (
      <FlatCard style={styles.receiptContainer}>
        <View style={styles.header}>
          <Text style={styles.receiptNumber}>Recibo Nro: #{item.id}</Text>
          <Icon name="visibility" size={24} color={colors.grisOscuro} style={styles.viewIcon} />
        </View>
        
        <Text style={styles.date}>
          Fecha: {new Date(item.createdAt).toLocaleString('es-Ar', dateOptions)} Hs
        </Text>

        <View style={styles.summary}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.total}>$ {total.toFixed(2)}</Text>
        </View>

        <Text style={styles.itemsCount}>
          Productos: {item.items.length}
        </Text>
      </FlatCard>
    );
  };

  return (
    <FlatList
      data={receipts}
      keyExtractor={item => item.id.toString()}
      renderItem={renderReceiptItem}
    />
  );
};

export default ReceiptsScreen;

const styles = StyleSheet.create({
  receiptContainer: {
    padding: 16,
    margin: 12,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  receiptNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.doradoApagado,
  },
  itemsCount: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
    fontStyle: 'italic',
  },
  viewIcon: {
    color: colors.grisOscuro,
  },
});
