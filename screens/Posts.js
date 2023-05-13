import { Text, FlatList, TouchableOpacity, View } from 'react-native';
import { React, useState } from 'react';
import { SearchBar } from 'react-native-elements';

export default function Posts() {
    const [search, setSearch] = useState('');
    const items = [
        {
            user: 'user',
            desc: 'food'
        },
        {
            user: 'user2',
            desc: 'personal stuff'
        }
    ];

    const renderItem = ({item}) => {
        return(
            <TouchableOpacity>
                <Text>{item.user}</Text>
                <Text>{item.desc}</Text>
            </TouchableOpacity>
        )
    }

    return(
        <View>
            <SearchBar
                placeholder="What are you looking for?"
                onChangeText={(text) => {setSearch(text)}}
                value={search}
            />
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}