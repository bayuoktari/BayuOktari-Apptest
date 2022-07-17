import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Layout, Input, Text, Button, Icon } from '@ui-kitten/components';
import {
  getContactList,
  getContactDetail,
} from '../store/reducers/contactSlice';
import axios from '../config/axios';

const AddContact = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const dispatch = useDispatch();
  const isEdit = route.params?.isEdit;
  const userId = route.params?.userId;
  const { contactDetail } = useSelector(state => state.contacts);

  const BackIcon = props => <Icon {...props} name="arrow-back" />;

  const handleSubmit = async () => {
    try {
      if (!isEdit) {
        const { data } = await axios.post('/contact', {
          firstName,
          lastName,
          age,
          photo: photoUrl,
        });
        if (data) {
          dispatch(getContactList());
          navigation.navigate('Home');
        }
      } else {
        const { data } = await axios.put('/contact/' + userId, {
          firstName,
          lastName,
          age,
          photo: photoUrl,
        });
        if (data) {
          dispatch(getContactList());
          navigation.navigate('Detail', { userId });
        }
      }
    } catch {}
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getContactDetail(userId));
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setFirstName(contactDetail.firstName);
      setLastName(contactDetail.lastName);
      setAge(String(contactDetail.age));
      setPhotoUrl(contactDetail.photo);
    }
  }, [contactDetail]);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.titleContainer}>
        <Button
          accessoryLeft={BackIcon}
          status="basic"
          style={styles.buttonBack}
          onPress={() => navigation.goBack()}
        />
        <Text category="h2" style={styles.titleText}>
          {isEdit ? 'Edit Contact' : 'Add New Contact'}
        </Text>
      </Layout>
      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
        <View style={styles.formWrapper}>
          <Text style={styles.labelText} category="label">
            First Name
          </Text>
          <Input
            placeholder="First Name"
            value={firstName}
            onChangeText={newValue => setFirstName(newValue)}
          />
        </View>
        <View style={styles.formWrapper}>
          <Text style={styles.labelText} category="label">
            Last Name
          </Text>
          <Input
            placeholder="Last Name"
            value={lastName}
            onChangeText={newValue => setLastName(newValue)}
          />
        </View>
        <View style={styles.formWrapper}>
          <Text style={styles.labelText} category="label">
            Age
          </Text>
          <Input
            placeholder="Age"
            value={age}
            onChangeText={newValue => setAge(newValue)}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.formWrapper}>
          <Text style={styles.labelText} category="label">
            Photo Url
          </Text>
          <Input
            placeholder="Photo Url"
            value={photoUrl}
            onChangeText={newValue => setPhotoUrl(newValue)}
          />
        </View>
        <Button onPress={() => handleSubmit()}>
          {isEdit ? 'Edit' : 'Add New'} Contact
        </Button>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
  },
  titleContainer: {
    height: 200,
    backgroundColor: '#00AAE9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#fff',
  },
  formContainer: {
    padding: 16,
  },
  formWrapper: {
    marginBottom: 14,
  },
  labelText: {
    fontSize: 14,
    marginBottom: 8,
  },
  buttonBack: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 20,
    height: 20,
    borderRadius: 100,
  },
});
export default AddContact;
