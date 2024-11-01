package com.checklist

import android.content.Context
import android.content.Intent
import android.appwidget.AppWidgetManager
import android.content.ComponentName
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class WidgetUpdateModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "WidgetUpdateModule"
    }

    @ReactMethod
    fun notifyWidgetUpdate(promise: Promise) {
        try {
            val intent = Intent(reactContext, NoteWidget::class.java).apply {
                action = AppWidgetManager.ACTION_APPWIDGET_UPDATE
                putExtra(
                        AppWidgetManager.EXTRA_APPWIDGET_IDS,
                        AppWidgetManager.getInstance(reactContext).getAppWidgetIds(
                                ComponentName(reactContext, NoteWidget::class.java)
                        )
                )
            }
            reactContext.sendBroadcast(intent)
            promise.resolve(null)  // Indicate success
        } catch (e: Exception) {
            promise.reject("WIDGET_UPDATE_ERROR", "Failed to update widget: ${e.message}")
        }
    }
}
