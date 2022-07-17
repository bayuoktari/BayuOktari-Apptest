import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const ContactItem = ({ contact, handleNavigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        handleNavigation.navigate('Detail', { userId: contact.id })
      }>
      <View style={styles.container}>
        <Image
          style={styles.imageAvatar}
          source={{
            uri:
              !contact.photo || contact.photo === 'N/A'
                ? 'https://portal.staralliance.com/imagelibrary/aux-pictures/prototype-images/avatar-default.png/@@images/image.png'
                : contact.photo,
          }}
        />
        <Text style={styles.textName}>
          {contact.firstName} {contact.lastName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 80,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageAvatar: {
    height: 60,
    width: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  iconAvatar: {
    height: 70,
    width: 70,
  },
  textName: {
    fontWeight: '700',
    color: '#000',
  },
});

export default ContactItem;
