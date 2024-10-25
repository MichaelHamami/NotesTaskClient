package com.checklist

import android.content.Intent
import android.os.Bundle
import com.facebook.react.ReactInstanceManager
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.util.Log

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "Checklist"

  override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d("MainActivity", "onCreate called")  // Debug log
        handleIntent(intent) // Handle the intent when the app is opened
  }

  override fun onNewIntent(intent: Intent?) {
      super.onNewIntent(intent)
      Log.d("MainActivity", "onNewIntent called with intent: $intent")
      intent?.let { handleIntent(it) } // Handle the intent if the app is already running
    }

  private fun handleIntent(intent: Intent) {
    // Check if the intent has extras
    val screenName = intent.getStringExtra("screenName")
    val noteId = intent.getStringExtra("noteId")
    Log.d("MainActivity", "handleIntent called with screenName: $screenName, noteId: $noteId") 
    if (screenName != null || noteId != null) {
        // Create a map to send data to React Native
        val map: WritableMap = Arguments.createMap()
        map.putString("screenName", screenName)
        map.putString("noteId", noteId)

        // Send the event to React Native
        sendEventToReactNative("intentData", map)
    }
  }

      private fun sendEventToReactNative(eventName: String, params: WritableMap) {
        val reactInstanceManager: ReactInstanceManager = reactNativeHost.reactInstanceManager
        val reactContext: ReactContext? = reactInstanceManager.currentReactContext
        Log.d("MainActivity", "sendEventToReactNative called") 
        if (reactContext != null) {
            Log.d("MainActivity", "Sending event to React Native: $eventName with params: $params")  // Debug log
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
        } else {
            Log.d("MainActivity", "React context is null")  // Debug log
        }
    }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
