import {View, Text, Button} from 'react-native';

function Note({item, handleDeleteNote}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderBlockColor: 'black',
      }}>
      <Text style={{flex: 1}}>{item.content}</Text>
      <Button
        title="Delete"
        onPress={() => handleDeleteNote(item._id.toString())}
      />
    </View>
  );
}

export default Note;
