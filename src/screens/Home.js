import React, { useEffect } from 'react';
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

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(getContactList());
  }, [dispatch]);

  function handleSearch(e) {
    const searchInput = e.target.value;
    const arrTransaction = Object.entries(data);
    const searchData = arrTransaction.filter(([key, obj]) => {
      if (!searchInput) {
        return [key, obj];
      } else if (
        obj.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        obj.lastName.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return [key, obj];
      } else {
        return null;
      }
    });
    const filteredTransaction = Object.fromEntries(searchData);
    setTransactions(filteredTransaction);
  }

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
    if (data.length) {
      return data.map(item => (
        <ContactItem
          key={item.id}
          contact={item}
          handleNavigation={navigation}
        />
      ));
    } else {
      return <Text>No contacts found</Text>;
    }
  };
  const PersonIcon = props => <Icon {...props} name="person-add" />;
  return (
    <Layout style={styles.container}>
      <Layout style={styles.headerContainer}>
        <Text category="h3" style={styles.headerTitle}>
          Contacts
        </Text>
        <Input placeholder="Search" accessoryLeft={renderIconInput} />
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
        onPress={() => navigation.navigate('Add')}
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
