import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NoteHeader from './NoteHeader';
import { getNoteById } from 'redux/selectors/note.selectors';
import TaskModal from '../Task/TaskModal';
import { createTask } from 'api/task.api';
import { updateNote } from 'api/note.api';
import * as NoteActions from 'redux/actions/note.actions';
import { showToast } from 'utils/helpers';
import { removeComponentsDetailsFromNoteContent } from './noteHelper';

const NoteEditor = ({ route }) => {
  const currentNote = useSelector(state => getNoteById(state, route.params.noteId));
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [noteContent, setNoteContent] = useState(removeComponentsDetailsFromNoteContent(currentNote?.content));
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNoteChange = text => {
    if (!errorMessage) {
      setErrorMessage(null);
    }
    setNoteContent(text);
  };

  // Capture cursor position when selection changes
  const handleSelectionChange = event => {
    const { start } = event.nativeEvent.selection;
    setCursorPosition(start);
  };

  const openTaskModal = () => {
    setShowCreateTask(true);
    setErrorMessage(null);
  };

  const closeTaskModal = () => {
    setShowCreateTask(false);
  };

  const validateTask = () => {
    // Validate task data

    return true;
  };

  const handleSaveNote = async () => {
    setIsLoading(true);

    try {
      const noteData = await updateNote(currentNote._id, { content: noteContent });
      dispatch(NoteActions.updateNote(currentNote._id, noteData));
      showToast('Note saved successfully', true);
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
    }
  };

  const handleCreateTask = async task => {
    // Validate task data
    if (!validateTask(task)) {
      setShowCreateTask(false);
      setErrorMessage('Task data is invalid.');
    }

    setIsLoading(true);
    try {
      const taskPayload = { ...task, note: currentNote._id };
      const taskData = await createTask(taskPayload);
      if (taskData) {
        setNoteContent(prev => {
          return prev.substring(0, cursorPosition) + `<Task:${taskData._id}>` + prev.substring(cursorPosition);
        });
      }
    } catch (error) {
      console.error('Error creating task:', error);
      setErrorMessage('Error creating task. Please try again later.');
    } finally {
      setIsLoading(false);
      setShowCreateTask(false);
    }
  };

  if (!currentNote) return <Text> ...No Content</Text>;
  return (
    <View>
      <NoteHeader note={currentNote} isOnEditMode={true} />
      <TextInput
        // style={styles.textInput}
        multiline
        value={noteContent}
        onChangeText={handleNoteChange}
        onSelectionChange={handleSelectionChange}
      />
      <View style={{ gap: 10 }}>
        <Button title="Add Task" onPress={openTaskModal} uppercase={false} capitalize={false} />
        <Button title="Save Note" onPress={handleSaveNote} />
        {errorMessage && <Text>{errorMessage}</Text>}
      </View>
      {showCreateTask && <TaskModal onClose={closeTaskModal} onCreateTask={handleCreateTask} />}
    </View>
  );
};

export default NoteEditor;
