import React, { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { renderContent } from './noteHelper';
import { getNoteById } from 'redux/selectors/note.selectors';
import NoteHeader from './NoteHeader';
import * as Constant from 'MyConstants';

const Note = ({ route }) => {
  const currentNote = useSelector(state => getNoteById(state, route.params.noteId));
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottomColor: Constant.PRIMARY_COLOR,
        borderWidth: 1,
        width: '100%',
        flex: 1,
        backgroundColor: Constant.NOTES_PRIMARY_COLOR,
      }}>
      <NoteHeader note={currentNote} isOnEditMode={false} />
      <View style={{ flex: 1, backgroundColor: currentNote.color }}>{renderContent(currentNote.content)}</View>
    </View>
  );
};

export default Note;
