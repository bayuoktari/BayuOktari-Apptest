import { Spinner } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ImageBackground, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getContactDetail } from '../store/reducers/contactSlice';
import { Button } from '@ui-kitten/components';

const Detail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { contactDetail, loading } = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(getContactDetail(route.params?.userId));
  }, [dispatch]);

  const renderLoading = () => {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Spinner status="primary" size="large" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading.detail ? (
        renderLoading()
      ) : (
        <>
          <View style={styles.header}>
            <ImageBackground
              style={styles.bgImage}
              source={{
                uri:
                  !contactDetail.photo || contactDetail.photo === 'N/A'
                    ? 'https://portal.staralliance.com/imagelibrary/aux-pictures/prototype-images/avatar-default.png/@@images/image.png'
                    : contactDetail.photo,
              }}
              blurRadius={5}
            />
          </View>
          <View style={styles.content}>
            <Image
              style={styles.imagePicture}
              source={{
                uri:
                  !contactDetail.photo || contactDetail.photo === 'N/A'
                    ? 'https://portal.staralliance.com/imagelibrary/aux-pictures/prototype-images/avatar-default.png/@@images/image.png'
                    : contactDetail.photo,
              }}
            />
            <Text style={styles.textName}>
              {contactDetail.firstName} {contactDetail.lastName}
            </Text>
            <View style={styles.textWrapper}>
              <Text style={styles.textTitle}>First Name :</Text>
              <Text style={styles.textContent}>{contactDetail.firstName}</Text>
              <Text style={styles.textTitle}>Last Name :</Text>
              <Text style={styles.textContent}>{contactDetail.lastName}</Text>
              <Text style={styles.textTitle}>Age :</Text>
              <Text style={styles.textContent}>{contactDetail.age}</Text>
              <Button
                style={styles.buttonBack}
                onPress={() => {
                  navigation.navigate('Home');
                }}>
                Back to Contact List
              </Button>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 220,
    backgroundColor: '#777',
  },
  content: {
    height: '100%',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    backgroundColor: '#fff',
    position: 'relative',
    top: -40,
  },
  bgImage: {
    flex: 1,
  },
  imagePicture: {
    height: 120,
    width: 120,
    borderRadius: 10,
    position: 'relative',
    top: -50,
    left: '36%',
  },
  textName: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20,
    position: 'relative',
    top: -40,
  },
  textWrapper: {
    padding: 16,
  },
  buttonBack: {
    marginTop: 16,
  },
  textTitle: {
    fontWeight: '700',
    fontSize: 16,
  },
  textContent: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 14,
  },
});

export default Detail;
