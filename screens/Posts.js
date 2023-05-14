import { Text, FlatList, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { React, useState, useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'

export default function Posts({navigation}) {
    const nav = useNavigation();
    const [search, setSearch] = useState('');
    const items = [
        {
            id: 1,
            sender: 'user',
            title: 'test',
            school: 'UC Santa Barbara',
            time: 'May 10th',
            desc: 'food'
        },
        {
            id: 2,
            sender: 'user2',
            title: 'test2',
            school: 'SBCC',
            time: 'May 10th',
            desc: 'personal stuff'
        }
    ];

    useEffect(() => {
        nav.setOptions({
          headerRight: () => <TouchableOpacity
          style={styles.buttonFacebookStyle}
          activeOpacity={0.5}
          onPress={() => {navigation.navigate('Create Post');}}>
          <Image
            source={{
              uri:
                'https://img.icons8.com/?size=50&id=GlTdJzFYfVzw&format=png',
            }}
            style={styles.buttonImageIconStyle}
          />
        </TouchableOpacity>
        });
    
    })

    const renderItem = ({item}) => {
        return(
            <TouchableOpacity>
            <View style={styles.post}>
          <View style={styles.header}>
            <Image source={{ uri: 'https://webupon.com/wp-content/uploads/2021/09/SampleImage1-Dog-small.png' }} style={styles.avatar} />
            <View>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.date}>{item.time}</Text>
              <Text style={styles.date}>{item.school}</Text>
            </View>
          </View>
          <Text style={styles.description}>{item.desc}</Text>
          {/*{item.image && */}<Image source={{ uri: 'https://media.istockphoto.com/id/1408374876/photo/oatmeal-porridge-bowl-with-berry-fruits-in-female-hands.jpg?b=1&s=170667a&w=0&k=20&c=R8sW8tHHzj7v57rssA06Ko-0GBL8mU2ktSydFaTsEGU=' }} style={{ height: 200, width: '100%' }} />{/*}*/}
          <View style={styles.actions}>
          </View>
        </View>
        </TouchableOpacity>
        )
    }

    return(
        <View>
            <SearchBar
                placeholder="What are you looking for?"
                onChangeText={(text) => {setSearch(text)}}
                value={search}
                //lightTheme={true}
            />
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    buttonFacebookStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderWidth: 0.5,
      borderColor: '#fff',
      height: 40,
      borderRadius: 5,
      margin: 5,
    },
    buttonImageIconStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
    },
    post: {
        marginHorizontal:10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom:20,
        borderBottomWidth:0.5,
        borderBottomColor:'#808080',
        padding:10,
      },
      avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
      },
      date: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 10,
      },
      description: {
        marginBottom: 10,
      },
      actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      },
      actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      actionText: {
        fontSize: 18,
        color: '#3b5998',
      },
      actionCount: {
        fontSize: 18,
        marginLeft: 5,
      },
  });