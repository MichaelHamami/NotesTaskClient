import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as ReduxActions from '../../../redux/actions/note.actions';
import { selectNotes } from '../../../redux/selectors';
import { getNotes, createNote } from '../../../api/note.api';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import NoteListItemView from './NoteListItemView';
import LoadingOverlay from 'components/LoadingOverlay';
import { useAppContext } from 'context';

function NotesList() {
  const [loading, setLoading] = useState(true);
  const notes = useSelector(selectNotes);
  const dispatch = useDispatch();
  const [newNoteContent, setNewNoteContent] = useState('');
  const { isAppLoading } = useAppContext();

  const isLoadingComponent = isAppLoading || loading;

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      dispatch(ReduxActions.getNotes(data));
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (newNoteContent.trim() !== '') {
      try {
        const data = await createNote({ content: newNoteContent });
        dispatch(ReduxActions.addNote(data));
        setNewNoteContent('');
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'gray' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Notes</Text>
      <>
        <FlatList data={notes} renderItem={({ item }) => <NoteListItemView item={item} />} keyExtractor={item => item._id.toString()} />
        <TextInput
          style={{
            height: 40,
            borderColor: 'white',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
          }}
          value={newNoteContent}
          onChangeText={text => setNewNoteContent(text)}
        />
        <Button title="Add Note" onPress={handleAddNote} />
      </>
      <LoadingOverlay visible={isLoadingComponent} />
    </View>
  );
}

export default NotesList;
