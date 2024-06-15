import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as ReduxActions from '../redux/actions/note.actions';
import {selectNotes} from '../redux/selectors';
import {getNotes, deleteNote, createNote} from '../api/note.api';
import {View, Text, TextInput, Button, FlatList} from 'react-native';
import Note from './Note';

function NotesList() {
  const [loading, setLoading] = useState(true);
  const notes = useSelector(selectNotes);
  const dispatch = useDispatch();
  const [newNoteContent, setNewNoteContent] = useState('');

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
        const data = await createNote({content: newNoteContent});
        dispatch(ReduxActions.addNote(data));
        setNewNoteContent('');
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };

  const handleDeleteNote = async noteId => {
    try {
      await deleteNote(noteId);
      dispatch(ReduxActions.deleteNote(noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>Notes</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
              paddingHorizontal: 10,
            }}
            value={newNoteContent}
            onChangeText={text => setNewNoteContent(text)}
          />
          <Button title="Add Note" onPress={handleAddNote} />
          <FlatList
            data={notes}
            renderItem={({item}) => <Note item={item} handleDeleteNote={handleDeleteNote} />}
            keyExtractor={item => item._id.toString()}
          />
        </>
      )}
    </View>
  );
}

export default NotesList;
