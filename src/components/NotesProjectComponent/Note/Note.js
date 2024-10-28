import React, { useRef } from 'react';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import { renderContent } from './noteHelper';
import { getNoteById } from 'redux/selectors/note.selectors';
import NoteHeader from './NoteHeader';
import * as Constant from 'MyConstants';
import { useNavigation } from '@react-navigation/native';

const Note = ({ route }) => {
  const navigation = useNavigation();
  const currentNote = useSelector(state => getNoteById(state, route.params.noteId));
  const lastTap = useRef(0);
  const DOUBLE_PRESS_DELAY = 500;

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < DOUBLE_PRESS_DELAY) {
      navigation.navigate('NoteEditor', { noteId: route.params.noteId });
    } else {
      lastTap.current = now;
    }
  };

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
      <ScrollView style={{ flex: 1, backgroundColor: currentNote.color }}>
        <TouchableWithoutFeedback onPress={handleDoubleTap}>
          <View>{renderContent(currentNote.content)}</View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default Note;
