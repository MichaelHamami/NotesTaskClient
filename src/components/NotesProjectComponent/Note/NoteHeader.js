import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import ClickableIcon from 'components/baseComponents/ClickableIcon';
import * as Constant from 'MyConstants';
import { useNavigation } from '@react-navigation/native';
import ColorsModal from 'components/Modals/ColorsModal';
import { updateNote } from 'api/note.api';
import * as NoteActions from 'redux/actions/note.actions';
import { showToast } from 'utils/helpers';

const NoteHeader = ({ note, isOnEditMode }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showColorModal, setShowColorModal] = useState(false);

  const openNoteEditor = noteId => {
    navigation.navigate('NoteEditor', { noteId: noteId });
  };

  const handleCloseColorModal = () => {
    setShowColorModal(false);
  };

  const handleSaveNote = async color => {
    try {
      const noteData = await updateNote(note._id, { color });
      dispatch(NoteActions.updateNote(note._id, noteData));
      showToast('Note saved successfully', true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSelectedColor = async color => {
    handleSaveNote(color);
    handleCloseColorModal();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: Constant.NOTES_PRIMARY_COLOR,
        padding: 15,
        gap: 20,
      }}>
      {!isOnEditMode && <ClickableIcon iconName={'edit'} onPress={() => openNoteEditor(note._id.toString())} />}
      {isOnEditMode && (
        <TouchableOpacity onPress={() => setShowColorModal(true)}>
          <View style={[styles.colorContainer, { backgroundColor: note.color }]}></View>
        </TouchableOpacity>
      )}
      <Text>{note.title}</Text>
      <ColorsModal visible={showColorModal} closeModal={handleCloseColorModal} onSelectedOption={handleSelectedColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  colorContainer: {
    width: 20,
    borderWidth: 1,
    height: 20,
    backgroundColor: Constant.NOTES_PRIMARY_COLOR,
  },
});

export default NoteHeader;
