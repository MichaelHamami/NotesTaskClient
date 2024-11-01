package com.checklist;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.widget.ArrayAdapter;
import android.widget.RemoteViews;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;

import org.json.JSONException;

import java.util.ArrayList;

public class NoteWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
            int appWidgetId) {
        Log.d("NoteWidget","updateAppWidget called");

        SharedPreferences pref = context.getSharedPreferences("NoteWidgetPrefs", Context.MODE_PRIVATE);
        String noteId = pref.getString("noteId_" + appWidgetId, null);
        if(noteId == null) return;

        Intent intent = new Intent(context, MainActivity.class);
        MainApplication application = (MainApplication) context.getApplicationContext();

        ReactNativeHost reactNativeHost = application.getReactNativeHost();
        ReactInstanceManager reactInstanceManager = reactNativeHost.getReactInstanceManager();
        ReactContext reactContext = reactInstanceManager.getCurrentReactContext();
        CookieModule cookieModule = new CookieModule((ReactApplicationContext) reactContext);
        String cookie = cookieModule.getCookie();

        Log.d("NoteWidget",cookie);

        ApiNote apiNote = new ApiNote(cookie);


        intent.putExtra("screenName", "Note");
        intent.putExtra("noteId", noteId);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        PendingIntent pendingIntent = PendingIntent.getActivity(context, appWidgetId, intent, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);

        apiNote.fetchSingleNote(BuildConfig.API_URL + "/api/note/"+noteId, new ApiNote.FetchSingleNotesCallback() {
            @Override
            public void onNoteFetched(NoteModel note) {
                note.setContent(getSageFormattedNote(note.getContent()));
                updateWidgetView(note,context,appWidgetManager,appWidgetId,pendingIntent);
            }
            @Override
            public void onError(String message) {
                String noteContent = pref.getString("noteContent_" + appWidgetId, "");
                String noteTitle = pref.getString("noteTitle_" + appWidgetId, "");
                String noteColor = pref.getString("noteColor_" + appWidgetId,"#ffffff");
                Log.d("NoteWidget",noteColor);

                String noteFormatted = getSageFormattedNote(noteContent);

                NoteModel noteToSend = new NoteModel(noteId,noteTitle,noteFormatted,noteColor);
                updateWidgetView(noteToSend,context,appWidgetManager,appWidgetId,pendingIntent);
            }
        });

    }

    private static String getSageFormattedNote(String content){
        String noteFormatted = content;

        try {
            noteFormatted = NoteHelper.getFormattedContent(noteFormatted);

        } catch (JSONException ignored) {
        }
        return  noteFormatted;
    }

    private static void updateWidgetView(NoteModel note,Context context, AppWidgetManager appWidgetManager,
                                         int appWidgetId,PendingIntent pendingIntent) {
        // Update the widget's RemoteViews with the note data
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.note_widget);
        views.setTextViewText(R.id.widgetNoteTitle, note.getTitle());
        views.setTextViewText(R.id.widgetNoteContent, note.getContent());
        views.setInt(R.id.widgetNoteContent, "setBackgroundColor", Color.parseColor(note.getColor()));
        views.setOnClickPendingIntent(R.id.widgetNoteTitle, pendingIntent);
        views.setOnClickPendingIntent(R.id.widgetNoteContent, pendingIntent);

        // Apply the updates to the widget
        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        super.onUpdate(context, appWidgetManager, appWidgetIds);

        Log.d("NoteWidget","onUpdate called");
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onDeleted(Context context, int[] appWidgetIds) {
        // Handle widget deletion if needed
        super.onDeleted(context, appWidgetIds);
        Log.d("NoteWidget","onDeleted called");

    }

    @Override
    public void onEnabled(Context context) {
        // Handle first widget enabled if needed
        super.onEnabled(context);
        Log.d("NoteWidget","onEnabled called");

    }

    @Override
    public void onDisabled(Context context) {
        // Handle last widget removed if needed
        super.onDisabled(context);
        Log.d("NoteWidget","onDisabled called");

    }

}