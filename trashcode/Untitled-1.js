// <View style={styles.BottomNavBar}>
    //   <View style={styles.NavHome}>
    //     <Image
    //       style={styles.NavIcon}
    //       source={require('../assets/images/icons/home-icon-bk.png')}
    //     />
    //     <Text style={styles.NavText}>Home</Text>
    //   </View>
    //   <View style={styles.NavHome}>
    //     <Image
    //       style={styles.NavIcon}
    //       source={require('../assets/images/icons/discovery-icon-bk.png')}
    //     />
    //     <Text style={styles.NavText}>Explore</Text>
    //   </View>
    //   <View style={styles.NavHome}>
    //     <Image
    //       style={styles.NavIcon}
    //       source={require('../assets/images/icons/list-icon-bk.png')}
    //     />
    //     <Text style={styles.NavText}>Lists</Text>
    //   </View>
    //   <View style={styles.NavHome}>
    //     <Image
    //       style={styles.NavIcon}
    //       source={require('../assets/images/icons/profile-icon-bk.png')}
    //     />
    //     <Text style={styles.NavText}>Profile</Text>
    //   </View>
    // </View>
    
const styles = StyleSheet.create({
  NavIcon: {
    height: 20,
    width: 20,
  },
  BottomNavBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderTopWidth: 3,
    borderColor: 'white',
  },
  NavHome: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  NavText: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Inter-semibold',
  },
});
