import React, { useRef, useEffect } from 'react';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useAppContext } from 'context';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as NoteActions from 'redux/actions/note.actions';
import { getNoteById } from 'redux/selectors/note.selectors';
import { getNote } from 'api/note.api';
import { renderContent } from './noteHelper';
import NoteHeader from './NoteHeader';
import LoadingOverlay from 'components/LoadingOverlay';
import * as Constant from 'MyConstants';

const Note = ({ route }) => {
  const navigation = useNavigation();
  const currentNote = useSelector(state => getNoteById(state, route.params.noteId));
  const dispatch = useDispatch();
  const lastTap = useRef(0);
  const DOUBLE_PRESS_DELAY = 500;
  const { isAppLoading } = useAppContext();

  const isLoadingComponent = isAppLoading;

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < DOUBLE_PRESS_DELAY) {
      navigation.navigate('NoteEditor', { noteId: route.params.noteId });
    } else {
      lastTap.current = now;
    }
  };

  const fetchData = async () => {
    try {
      console.log('Fetching data called', new Date());
      if (!currentNote || !currentNote._id) return;
      const noteData = await getNote(currentNote._id);
      dispatch(NoteActions.updateNote(currentNote._id, noteData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000);

    return () => {
      console.log('Clearing interval');
      clearInterval(interval);
    };
  }, []);

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
      <LoadingOverlay visible={isLoadingComponent} />
    </View>
  );
};

export default Note;
