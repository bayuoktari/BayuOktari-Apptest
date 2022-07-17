import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
import {
  Layout,
  Text,
  Input,
  Icon,
  Spinner,
  Button,
} from '@ui-kitten/components';
import { getContactList } from '../store/reducers/contactSlice';
import ContactItem from '../components/ContactItem';
import Snackbar from 'react-native-snackbar';
import axios from '../config/axios';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.contacts);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    dispatch(getContactList());
  }, [dispatch]);

  useEffect(() => {
    setContacts(data);
  }, [data]);

  const handleDelete = async id => {
    try {
      await axios.delete('/contact/' + id);
    } catch (error) {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    } finally {
      dispatch(getContactList());
    }
  };

  const handleSearch = (array, keyword) => {
    const searchTerm = keyword.toLowerCase();
    return array.filter(value => {
      return (
        value.firstName.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
        value.lastName.toLowerCase().match(new RegExp(searchTerm, 'g'))
      );
    });
  };

  const handleInputSearchOnChange = e => {
    let value = e;
    if (value.length > 2) {
      let search = handleSearch(contacts, value);
      setContacts(search);
    } else {
      setContacts(data);
    }
  };

  const renderIconInput = props => {
    return <Icon {...props} name="search-outline" />;
  };
  const renderLoading = () => {
    return (
      <Layout style={{ alignItems: 'center' }}>
        <Spinner status="primary" size="large" />
      </Layout>
    );
  };
  const renderList = () => {
    if (contacts.length) {
      return contacts.map(item => (
        <ContactItem
          key={item.id}
          contact={item}
          handleNavigation={navigation}
          deleteItem={handleDelete}
        />
      ));
    } else {
      return <Text style={{ textAlign: 'center' }}>No contacts found</Text>;
    }
  };
  const PersonIcon = props => <Icon {...props} name="person-add" />;
  return (
    <Layout style={styles.container}>
      <Layout style={styles.headerContainer}>
        <Text category="h3" style={styles.headerTitle}>
          Contacts
        </Text>
        <Input
          placeholder="Search"
          accessoryLeft={renderIconInput}
          onChangeText={handleInputSearchOnChange}
        />
      </Layout>
      <ScrollView>
        <Layout style={styles.listContainer}>
          {loading.list ? renderLoading() : renderList()}
        </Layout>
      </ScrollView>
      <Button
        style={styles.buttonAdd}
        status="primary"
        accessoryLeft={PersonIcon}
        onPress={() => navigation.navigate('Add Contact')}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  headerTitle: {
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    paddingBottom: 90,
  },
  buttonAdd: {
    height: 50,
    width: 50,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default Home;
