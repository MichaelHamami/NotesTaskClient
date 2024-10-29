package com.checklist;

import android.app.Activity;
import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;

import java.util.ArrayList;
import java.util.List;

public class NoteWidgetConfigureActivity extends Activity {

    private int appWidgetId = AppWidgetManager.INVALID_APPWIDGET_ID;
    private ListView notesListView;
    private List<NoteModel> notesList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d("NoteWidgetConfigure","onCreate called");
        setContentView(R.layout.activity_note_widget_configure);

        setResult(RESULT_CANCELED);

        Intent intent = getIntent();
        Bundle extras = intent.getExtras();
        if (extras != null) {
            appWidgetId = extras.getInt(AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID);
        }

        if (appWidgetId == AppWidgetManager.INVALID_APPWIDGET_ID) {
            Log.d("NoteWidgetConfigure","INVALID_APPWIDGET_ID and finish");

            setResult(RESULT_CANCELED);
            finish();
            return;
        }

        notesListView = findViewById(R.id.notes_list_view);
        loadNotes();

        notesListView.setOnItemClickListener((parent, view, position, id) -> {
            NoteModel selectedNote = notesList.get(position);

            // Save Note to SharedPreferences
            saveSelectedNote(NoteWidgetConfigureActivity.this, appWidgetId, selectedNote);

            // Update the widget with the selected note
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(NoteWidgetConfigureActivity.this);
            NoteWidget.updateAppWidget(NoteWidgetConfigureActivity.this, appWidgetManager, appWidgetId);

            // Return the result to finish the configuration activity
            Intent resultValue = new Intent();
            resultValue.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
            setResult(RESULT_OK, resultValue);
            finish();
        });

    }

    private void loadNotes() {

        MainApplication application = (MainApplication) this.getApplication();

        ReactNativeHost reactNativeHost = application.getReactNativeHost();
        ReactInstanceManager reactInstanceManager = reactNativeHost.getReactInstanceManager();
        ReactContext reactContext = reactInstanceManager.getCurrentReactContext();

        ApiNote apiNote = new ApiNote();

        CookieModule cookieModule = new CookieModule((ReactApplicationContext) reactContext);
        String cookie = cookieModule.getCookie();

        apiNote.fetchNotes(BuildConfig.API_URL + "/api/note", cookie, new ApiNote.NotesCallback() {
                    @Override
                    public void onNotesFetched(ArrayList<NoteModel> fetchedNotes) {
                        notesList = fetchedNotes;
                        ArrayList<String> noteTitles = new ArrayList<>();
                        for (NoteModel note : notesList) {
                            noteTitles.add(note.getTitle());
                        }

                        ArrayAdapter<String> adapter = new ArrayAdapter<>(NoteWidgetConfigureActivity.this, android.R.layout.simple_list_item_1, noteTitles);
                        notesListView.setAdapter(adapter);
                    }

                    @Override
                    public void onError(String message) {
                        Toast.makeText(NoteWidgetConfigureActivity.this, "Error: " + message, Toast.LENGTH_SHORT).show();
                    }
                });

    }

    private void saveSelectedNote(Context context, int appWidgetId, NoteModel note) {
        Log.d("NoteWidgetConfigure","saveSelectedNoteId called");

        context.getSharedPreferences("NoteWidgetPrefs", MODE_PRIVATE)
                .edit()
                .putString("noteId_" + appWidgetId, note.getId())
                .putString("noteContent_" + appWidgetId,note.getContent())
                .putString("noteTitle_" + appWidgetId,note.getTitle())
                .putString("noteColor_" + appWidgetId,note.getColor())
                .apply();
    }

}