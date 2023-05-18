import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
import {queryClient} from '../App';

const Home = () => {
  const [addedNamme, setaddedNamme] = useState<any>('');

  let {
    data: response,
    isLoading,
    error,
    refetch,
    dataUpdatedAt,
    isPreviousData,
  } = useQuery(
    'supplierData',
    () => {
      return axios.get('https://northwind.vercel.app/api/suppliers');
    },
    {
      staleTime: 2000,
      // refetchInterval: 5000
    },
  );
  const {
    data,
    isLoading: postloading,
    mutate,
  } = useMutation({
    mutationFn: async (data: any) => {
      let result = await axios.post(
        'https://northwind.vercel.app/api/suppliers',
        data,
      );
      return result;
    },
    onSuccess: response => {
      console.log('Success!', response.data);
      queryClient.invalidateQueries({queryKey: 'supplierData'});
    },
    onError: err => {
      console.log('Error!', err);
    },
  });
  const add = () => {
    mutate({companyName: addedNamme});
    refetch()
  };

  return (
    <View>
      <View style={{borderWidth: 2, marginHorizontal: 20, marginTop: 30}}>
        <TextInput
          placeholder="enter name"
          onChangeText={setaddedNamme}
          value={addedNamme}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 30,
        }}>
        <TouchableOpacity onPress={add}>
          <View
            style={{
              height: 30,
              width: 80,
              backgroundColor: 'green',
              alignItems: 'center',
            }}>
            <Text>Add</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>refetch()}>
          <View
            style={{
              height: 30,
              width: 80,
              backgroundColor: 'red',
              alignItems: 'center',
            }}>
            <Text>refetch</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{height:300,marginTop:30,borderWidth:2}}>
        <FlatList
          data={response?.data}
          contentContainerStyle={{paddingBottom:100}}
          renderItem={({item}: any) => (
            <Text style={{fontSize: 30}}>{item.companyName}</Text>
          )}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
