import { TabBar } from 'react-native-tab-view';

export const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#0496FF' }}
    style={{ backgroundColor: '#0B0B0B' }}
    activeColor={'#0496FF'}
    inactiveColor={'#fff'}
  />
);