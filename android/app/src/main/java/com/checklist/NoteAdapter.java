package com.checklist;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import java.util.List;

public class NoteAdapter extends ArrayAdapter<NoteModel> {

    public NoteAdapter(Context context, List<NoteModel> notes) {
        super(context, 0, notes);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        NoteModel note = getItem(position);

        // Check if an existing view is being reused, otherwise inflate a new view
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(android.R.layout.simple_list_item_1, parent, false);
        }

        // Lookup view for note title
        TextView noteTitle = (TextView) convertView.findViewById(android.R.id.text1);

        // Populate the title
        if (note != null) {
            noteTitle.setText(note.getTitle());
        }

        // Return the completed view to render on screen
        return convertView;
    }
}
