package com.checklist;

import androidx.appcompat.app.AppCompatActivity;

import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.List;

public class NoteWidgetConfigureActivity extends AppCompatActivity {

    private int appWidgetId = AppWidgetManager.INVALID_APPWIDGET_ID;
    private ListView notesListView;
    private List<Note> notesList; // This will hold your notes

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d("NoteWidgetConfigure","onCreate called");
        setContentView(R.layout.activity_note_widget_configure);

        // Set the result to CANCELED by default, in case the user backs out
//        setResult(RESULT_CANCELED);

        // Get the App Widget ID from the intent that launched the activity
        Intent intent = getIntent();
        Bundle extras = intent.getExtras();
        if (extras != null) {
            appWidgetId = extras.getInt(AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID);
        }

        // If the widget ID is invalid, finish the activity
        if (appWidgetId == AppWidgetManager.INVALID_APPWIDGET_ID) {
            finish();
            return;
        }

        // Set up UI components
        notesListView = findViewById(R.id.notes_list_view);

        loadNotes();

        // Set an onClickListener for the "Select Note" button
        notesListView.setOnItemClickListener((parent, view, position, id) -> {
            Note selectedNote = notesList.get(position); // Get the selected note
            String selectedNoteId = selectedNote.getId(); // Assuming Note has a method getId()

            // Save selected noteId to SharedPreferences or another storage
            saveSelectedNoteId(NoteWidgetConfigureActivity.this, appWidgetId, selectedNoteId);

            // Update the widget with the selected note
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(NoteWidgetConfigureActivity.this);
            NoteWidget.updateAppWidget(NoteWidgetConfigureActivity.this, appWidgetManager, appWidgetId,
                    selectedNoteId);

            // Return the result to finish the configuration activity
            Intent resultValue = new Intent();
            resultValue.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
            setResult(RESULT_OK, resultValue);
            finish();
        });
    }

    // Example method to load notes and display them (this should be based on your
    // data source)
    private void loadNotes() {
        ApiNote apiNote  = new ApiNote();
        notesList = apiNote.fetchNotes();

        ArrayAdapter<Note> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, notesList);
        notesListView.setAdapter(adapter);
    }

    // Save the selected note ID to shared preferences or other storage
    private void saveSelectedNoteId(Context context, int appWidgetId, String noteId) {
        context.getSharedPreferences("NoteWidgetPrefs", MODE_PRIVATE)
                .edit()
                .putString("noteId_" + appWidgetId, noteId)
                .apply();
    }
}