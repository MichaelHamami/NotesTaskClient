package com.checklist;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.widget.RemoteViews;
import android.util.Log;

import org.json.JSONException;

public class NoteWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
            int appWidgetId) {
        Log.d("NoteWidget","updateAppWidget called");
        Intent intent = new Intent(context, MainActivity.class);

        SharedPreferences pref = context.getSharedPreferences("NoteWidgetPrefs", Context.MODE_PRIVATE);
        String noteId = pref.getString("noteId_" + appWidgetId, null);
        String noteContent = pref.getString("noteContent_" + appWidgetId, "");
        String noteTitle = pref.getString("noteTitle_" + appWidgetId, "");
        String noteColor = pref.getString("noteColor_" + appWidgetId,"#ffffff");
        Log.d("NoteWidget",noteColor);

        String noteFormatted = noteContent;

        try {
            noteFormatted = NoteHelper.getFormattedContent(noteFormatted);

        } catch (JSONException ignored) {
        }

        intent.putExtra("screenName", "Note");
        intent.putExtra("noteId", noteId);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        PendingIntent pendingIntent = PendingIntent.getActivity(context, appWidgetId, intent, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);

        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.note_widget);
        views.setTextViewText(R.id.widgetNoteTitle, noteTitle);
        views.setTextViewText(R.id.widgetNoteContent, noteFormatted);
        views.setInt(R.id.widgetNoteContent, "setBackgroundColor", Color.parseColor(noteColor)); // Example color
        views.setOnClickPendingIntent(R.id.widgetNoteTitle, pendingIntent);
        views.setOnClickPendingIntent(R.id.widgetNoteContent, pendingIntent);

        if (noteId != null) {
            appWidgetManager.updateAppWidget(appWidgetId, views);
        }
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