import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useState } from 'react';

export default function DailyCapacity() {

  // 90% of the screen 
  const width = Dimensions.get('window').width * 0.8;

  // get the current day
  const [day, setDay] = useState(new Date().getDay())

  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff', fontSize: 16, padding: 20 }}>{day === 0 ? 'Sunday' : day === 1 ? 'Monday' : day === 2 ? 'Tuesday' : day === 3 ? 'Wednesday' : day === 4 ? 'Thursday' : day === 5 ? 'Friday' : 'Saturday'}'s Usual Capacity</Text>
        <BarChart
          data={{
            labels: ['7:00', '9:00', '11:00', '13:00', '15:00', '17:00', '19:00'],
            datasets: [
              {
                data: [20, 25, 33, 50, 40, 33, 40]
              }
            ]
          }}
          width={width}
          height={290}
          chartConfig={{
            backgroundColor: '#24262B',
            backgroundGradientFrom: '#24262B',
            backgroundGradientTo: '#24262B',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            barPercentage: 0.6,
          }}
          verticalLabelRotation={90}
          withHorizontalLabels={true}
          yAxisSuffix='%'
          fromZero={true}
          withInnerLines={false}
          style={{
            borderRadius: 16,
            marginLeft: -10,
            marginVertical: 20,
          }}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#24262B',
    borderRadius: 14,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 20,
  },

  viewContainer: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonEnable: {
    width: '30%',
    backgroundColor: '#0496FF',
    height: 36,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
})