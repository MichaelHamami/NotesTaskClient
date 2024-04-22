import {View, Text, Button} from 'react-native';
import TaskNote from './TaskNote';
import {splitStringAtFirstOccurrence} from '../utils/helpers';

function Note({item, handleDeleteNote}) {
  const importComponent = (componentName, componentId, data, index) => {
    try {
      switch (componentName?.toLowerCase()) {
        case '<task':
          return <TaskNote key={index} {...JSON.parse(data)} componentId={componentId} />;
        default:
          return <Text key={index}>{data.toString()}</Text>;
      }
    } catch (error) {
      return <Text key={index}>{data.toString()}</Text>;
    }
  };

  const renderContent = content => {
    const parts = content.split(/(<[^>]+>)/);
    return parts.map((part, index) => {
      if (!part.startsWith('<')) {
        return <Text key={index}>{part}</Text>;
      }

      const [componentName, restOfContent] = splitStringAtFirstOccurrence(part, ':');
      const [componentId, dateNotFormatted] = splitStringAtFirstOccurrence(restOfContent, ':');

      const data = dateNotFormatted.substring(0, dateNotFormatted.length - 1);
      return importComponent(componentName, componentId, data, index);
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderBlockColor: 'black',
      }}>
      <View style={{flex: 1}}>{renderContent(item.content)}</View>
      <Button title="Delete" onPress={() => handleDeleteNote(item._id.toString())} />
    </View>
  );
}

export default Note;
