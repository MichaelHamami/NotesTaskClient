import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NoteHeader from './NoteHeader';
import { getNoteById } from 'redux/selectors/note.selectors';
import TaskModal from '../Task/TaskModal';
import { createTask, updatedTask } from 'api/task.api';
import { updateNote } from 'api/note.api';
import * as NoteActions from 'redux/actions/note.actions';
import { showToast, splitStringAtFirstOccurrence } from 'utils/helpers';
import { removeComponentsDetailsFromNoteContent } from './noteHelper';
import TaskNote from '../Task/TaskNote';
import { useNoteEditorContext } from 'context';

const Task = ({ data, onEditClicked }) => {
  const [_componentName, restOfContent] = splitStringAtFirstOccurrence(data, ':');
  const [taskId, noteData] = splitStringAtFirstOccurrence(restOfContent, ':');
  const jsonNote = noteData.substring(0, noteData.length - 1);

  return <TaskNote {...JSON.parse(jsonNote)} taskId={taskId} onEditClicked={onEditClicked} />;
};

const { width } = Dimensions.get('window');

const NoteEditor = ({ route }) => {
  const currentNote = useSelector(state => getNoteById(state, route.params.noteId));
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [noteContent, setNoteContent] = useState(currentNote?.content);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [lastSegmentChanged, setLastSegmentChanged] = useState(0);
  const [editedTask, setEditedTask] = useState({});
  const { noteTitle, setNoteTitle } = useNoteEditorContext();

  const handleSelectionChange = (index, event) => {
    const { start } = event.nativeEvent.selection;
    setCursorPosition(start);
    setLastSegmentChanged(index);
  };

  const openTaskModal = () => {
    setShowCreateTask(true);
    setErrorMessage(null);
    setEditedTask({});
  };

  const closeTaskModal = () => {
    setShowCreateTask(false);
  };

  const validateTask = () => {
    return true;
  };

  const handleSaveNote = async () => {
    setIsLoading(true);

    try {
      const formattedNoteContent = removeComponentsDetailsFromNoteContent(noteContent);
      const notePayload = {
        title: noteTitle || undefined,
        content: formattedNoteContent,
      };
      const noteData = await updateNote(currentNote._id, notePayload);
      dispatch(NoteActions.updateNote(currentNote._id, noteData));
      showToast('Note saved successfully', true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleEditTask = async task => {
    if (!validateTask(task)) {
      setShowCreateTask(false);
      setErrorMessage('Task data is invalid.');
    }

    setIsLoading(true);

    try {
      const taskPayload = { ...task, taskId: undefined, note: currentNote._id };
      const noteResult = await updatedTask(task.taskId, taskPayload);
      if (!noteResult) return;

      const noteData = {
        ...noteResult,
        note: undefined,
      };

      dispatch(NoteActions.updateNote(noteResult._id, noteData));
      setNoteContent(noteResult.content);
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
      setShowCreateTask(false);
    }
  };

  const handleEditTaskClicked = taskData => {
    setShowCreateTask(true);
    setEditedTask(taskData);
  };

  const handleCreateTask = async task => {
    if (!validateTask(task)) {
      setShowCreateTask(false);
      setErrorMessage('Task data is invalid.');
    }

    setIsLoading(true);
    try {
      const taskPayload = { ...task, note: currentNote._id };
      const taskData = await createTask(taskPayload);
      if (taskData) {
        const segements = getNoteDataAsSegments();
        let updatedNoteContent = '';
        for (let i = 0; i < segements.length; i++) {
          if (i === lastSegmentChanged) {
            const newSegmentText =
              segements[i].content.substring(0, cursorPosition) +
              `<Task:${taskData._id}:${JSON.stringify(taskData)}>` +
              segements[i].content.substring(cursorPosition);
            updatedNoteContent += newSegmentText;
            continue;
          }
          updatedNoteContent += segements[i].content;
        }
        setNoteContent(updatedNoteContent);
      }
    } catch (error) {
      setErrorMessage('Error creating task. Please try again later.');
    } finally {
      setIsLoading(false);
      setShowCreateTask(false);
    }
  };

  const getNoteDataAsSegments = () => {
    const regex = /(<[^>]+>)/g; // Regex to find Components
    const segments = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(noteContent)) !== null) {
      if (lastIndex !== match.index) {
        segments.push({
          type: 'text',
          content: noteContent.slice(lastIndex, match.index),
        });
      }

      segments.push({
        type: 'task',
        content: match[1],
      });
      lastIndex = regex.lastIndex;
    }

    segments.push({
      type: 'text',
      content: noteContent.slice(lastIndex),
    });
    return segments;
  };

  const handleTextChange = (index, newText) => {
    if (!errorMessage) {
      setErrorMessage(null);
    }

    const segments = getNoteDataAsSegments();
    segments[index].content = newText;
    const updatedNoteData = segments.map(segment => segment.content).join('');
    setNoteContent(updatedNoteData);
  };

  const renderNote = () => {
    const segments = getNoteDataAsSegments();
    return segments.map((segment, index) => {
      if (segment.type === 'text') {
        return (
          <TextInput
            key={index}
            style={styles.textInput}
            multiline
            value={segment.content}
            onChangeText={text => handleTextChange(index, text)}
            onSelectionChange={event => handleSelectionChange(index, event)}
          />
        );
      } else if (segment.type === 'task') {
        return <Task key={index} data={segment.content} onEditClicked={handleEditTaskClicked} />;
      }
    });
  };

  if (!currentNote) return <Text> ...No Content</Text>;
  return (
    <View style={styles.container}>
      <NoteHeader note={currentNote} isOnEditMode={true} changeNoteTitle={setNoteTitle} />
      <ScrollView contentContainerStyle={styles.scrollView}>{renderNote()}</ScrollView>
      <View style={styles.footer}>
        <Button title="Add Task" onPress={openTaskModal} />
        <Button title="Save Note" onPress={handleSaveNote} />
        {errorMessage && <Text>{errorMessage}</Text>}
      </View>
      {showCreateTask && (
        <TaskModal
          onClose={closeTaskModal}
          onCreateTask={handleCreateTask}
          onEditTask={handleEditTask}
          taskId={editedTask.taskId}
          taskTitle={editedTask.title}
          taskDescription={editedTask.description}
          taskCircularTime={editedTask.circulationTime}
          taskEndDate={editedTask.endDate}
          taskType={editedTask.type}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flexGrow: 1,
  },
  linesAndTextInput: {},
  linesContainer: {
    position: 'absolute',
    top: 28,
    left: 10,
    right: 10,
    bottom: 20,
  },
  line: {
    height: 1,
    width: width,
    backgroundColor: '#d3d3d3',
  },
  textInput: {
    fontSize: 14,
    color: 'black',
    backgroundColor: 'transparent',
    textAlignVertical: 'top',
  },
  footer: {
    gap: 10,
    minHeight: 90,
  },
});

export default NoteEditor;
