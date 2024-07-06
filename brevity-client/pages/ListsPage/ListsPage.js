import {StyleSheet, Text, View} from 'react-native';

const ListsPage = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 15}}>
      <View>
        <Text style={styles.TabTitle}>Lists you are on.</Text>
      </View>
      <View>{/* sort menu */}</View>
      <View>
        <View>
          
        </View>
      </View>
    </View>
  );
};

export default ListsPage;

const styles = StyleSheet.create({
  TabTitle: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Inter-Medium',
  },
});
