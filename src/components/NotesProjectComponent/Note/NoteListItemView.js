import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function NoteListItemView({ item }) {
  const navigation = useNavigation();

  const handleNoteClicked = note => {
    navigation.navigate('Note', { noteId: note._id });
  };

  return (
    <TouchableOpacity key={item._id} onPress={() => handleNoteClicked(item)}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          borderLeftWidth: 5,
          borderLeftColor: item.color,
          backgroundColor: item.color,
          marginTop: 10,
          paddingHorizontal: 10,
          paddingVertical: 15,
        }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'black' }} numberOfLines={1}>
            {item.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default NoteListItemView;
