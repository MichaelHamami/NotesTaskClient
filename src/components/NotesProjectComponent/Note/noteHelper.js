import { Text } from 'react-native';
import TaskNote from '../Task/TaskNote';
import { splitStringAtFirstOccurrence } from '../../../utils/helpers';
import { NativeModules } from 'react-native';

const { WidgetUpdateModule } = NativeModules;

const importComponent = (componentName, componentId, data, index) => {
  try {
    switch (componentName?.toLowerCase()) {
      case '<task':
        return <TaskNote key={index} {...JSON.parse(data)} taskId={componentId} />;
      default:
        return (
          <Text style={{ color: 'black' }} key={index}>
            {data.toString()}
          </Text>
        );
    }
  } catch (error) {
    return <Text key={index}>{data.toString()}</Text>;
  }
};

export const renderContent = content => {
  const parts = content.split(/(<[^>]+>)/);
  return parts.map((part, index) => {
    if (!part.startsWith('<')) {
      return (
        <Text key={index} style={{ color: 'black' }}>
          {part}
        </Text>
      );
    }

    const [componentName, restOfContent] = splitStringAtFirstOccurrence(part, ':');
    const [componentId, dateNotFormatted] = splitStringAtFirstOccurrence(restOfContent, ':');

    const data = dateNotFormatted.substring(0, dateNotFormatted.length - 1);
    return importComponent(componentName, componentId, data, index);
  });
};

export const removeComponentsDetailsFromNoteContent = noteContent => {
  try {
    const parts = noteContent.split(/(<[^>]+>)/);
    const formattedParts = parts.map((part, _index) => {
      if (part.startsWith('<')) {
        const splittedPart = part.split(':');
        if (splittedPart.length < 2) {
          return part.toString();
        }
        const componentName = splittedPart[0];
        const componentId = splittedPart[1];
        return `${componentName}:${componentId}>`;
      } else {
        return part.toString();
      }
    });

    return formattedParts.join('');
  } catch (error) {
    return noteContent;
  }
};

export const updateWidget = () => {
  console.log('updateWidget in react native update');
  WidgetUpdateModule.notifyWidgetUpdate()
    .then(() => console.log('Widget update broadcasted'))
    .catch(error => console.error('Failed to update widget:', error));
};
