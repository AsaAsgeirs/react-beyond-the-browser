import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import DateTime from './components/DateTime';
import WeatherScroll from './components/WeatherScroll';

const API_KEY = 'b00cef92c7dda1b462b89f038cca5a10';

const img = require('./assets/image.png')
export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((success) => {
      let {latitude, longitude } = success.coords;
      fetchDataFromApi(latitude, longitude)
      

  }, (err) => {
    if(err) {
      fetchDataFromApi("64.1466", "-21.9426")
    }
  })}
  else{
    fetchDataFromApi("64.1466", "-21.9426")
  }
  }, [])
  

  const fetchDataFromApi = (latitude, longitude) => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      console.log(data)

      setData(data)
      })
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
        <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon} />
        <WeatherScroll weatherData={data.daily} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode:"cover", 
    justifyContent:"center"
  }
});
