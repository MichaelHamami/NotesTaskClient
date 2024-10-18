package com.checklist;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.Intent;
import android.widget.RemoteViews;
import android.util.Log;

public class NoteWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
            int appWidgetId, String noteId) {

        Log.d("NoteWidget", "Updating widget with noteId: " + noteId);

        Note note = getNoteById(context, noteId);
        CharSequence widgetText = context.getString(R.string.appwidget_text);
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.note_widget);

        views.setTextViewText(R.id.widgetNoteTitle, widgetText);
        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    private static Note getNoteById(Context context, String noteId) {
        // Fetch the note from your database or other storage based on noteId
        return new Note("Sample Title", "Sample Content","some Content"); // Replace with actual note fetching logic
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {

        Log.d("NoteWidget","onUpdate call");

        for (int appWidgetId : appWidgetIds) {
            Log.d("NoteWidget","onUpdate call inside for loop");

            // Intent intent = new Intent(context, MainActivity.class);
            // intent.putExtra("screenName", "Note");
            // intent.putExtra("noteId", "66faf217ac5937183fd9f417");

            // PendingIntent pendingIntent = PendingIntent.getActivity(context, appWidgetId,
            // intent,
            // PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

            // RemoteViews views = new RemoteViews(context.getPackageName(),
            // R.layout.note_widget);
            // views.setTextViewText(R.id.widgetNoteTitle, "Your Note Title");
            // views.setTextViewText(R.id.widgetNoteContent, "Your Note Content");
            // views.setOnClickPendingIntent(R.id.widgetNoteTitle, pendingIntent);

//            SharedPreferences pref = context.getSharedPreferences("NoteWidgetPrefs", Context.MODE_PRIVATE);
//            String noteId = pref.getString("noteId_" + appWidgetId, null);

            String noteId = "66faf217ac5937183fd9f417";

            if (noteId != null) {
                updateAppWidget(context, appWidgetManager, appWidgetId, noteId);
            }

            // appWidgetManager.updateAppWidget(appWidgetId, views);
        }
    }

    @Override
    public void onEnabled(Context context) {
    }

    @Override
    public void onDisabled(Context context) {
    }
}