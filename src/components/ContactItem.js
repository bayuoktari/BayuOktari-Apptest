import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, Icon, Modal, Card, Text } from '@ui-kitten/components';

const ContactItem = ({ contact, deleteItem, handleNavigation }) => {
  const EditIcon = props => <Icon {...props} name="edit" />;
  const DeleteIcon = props => <Icon {...props} name="trash-2" />;
  const [visible, setVisible] = useState(false);

  const handleDelete = () => {
    deleteItem(contact.id);
    setVisible(false);
  };

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
        <View style={styles.buttonWrapper}>
          <Button
            style={styles.buttonEdit}
            status="basic"
            accessoryLeft={EditIcon}
            onPress={() =>
              handleNavigation.navigate('Edit Contact', { userId: contact.id })
            }
          />
          <Button
            style={[styles.buttonEdit, styles.buttonDelete]}
            status="danger"
            accessoryLeft={DeleteIcon}
            onPress={() => {
              setVisible(true);
            }}
          />
        </View>
      </View>
      <Modal visible={visible} backdropStyle={styles.backdrop}>
        <Card disabled={true}>
          <Text style={styles.modalText}>
            Are you sure want to delete {contact.firstName} {contact.lastName}
          </Text>
          <View style={styles.modalButtonWrapper}>
            <Button status="danger" onPress={() => handleDelete()}>
              Yes
            </Button>
            <Button status="success" onPress={() => setVisible(false)}>
              Cancel
            </Button>
          </View>
        </Card>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 80,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginRight: 'auto',
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonEdit: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  buttonDelete: {
    marginLeft: 8,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    marginBottom: 18,
  },
  modalButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ContactItem;
