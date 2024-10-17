package com.checklist;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;
import android.util.Log;

/**
 * Implementation of App Widget functionality.
 */
public class NoteWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
            int appWidgetId) {
        CharSequence widgetText = context.getString(R.string.appwidget_text);
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.note_widget);

        views.setTextViewText(R.id.widgetNoteTitle, widgetText);
        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {

        for (int appWidgetId : appWidgetIds) {
            Intent intent = new Intent(context, MainActivity.class);
            intent.putExtra("screenName", "Note");
            intent.putExtra("noteId", "66faf217ac5937183fd9f417");

            PendingIntent pendingIntent = PendingIntent.getActivity(context, appWidgetId, intent,
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.note_widget);
            views.setTextViewText(R.id.widgetNoteTitle, "Your Note Title");
            views.setTextViewText(R.id.widgetNoteContent, "Your Note Content");
            views.setOnClickPendingIntent(R.id.widgetNoteTitle, pendingIntent);

            appWidgetManager.updateAppWidget(appWidgetId, views);
        }
    }

    @Override
    public void onEnabled(Context context) {
    }

    @Override
    public void onDisabled(Context context) {
    }
}