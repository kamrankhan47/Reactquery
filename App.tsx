import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import axios from 'axios';
import Home from './components/Home';

export const queryClient = new QueryClient();
const App = () => {
  

  return (
    <QueryClientProvider client={queryClient}>
      <Home 
      />
    </QueryClientProvider>
    
  );
};

export default App;

const styles = StyleSheet.create({});
