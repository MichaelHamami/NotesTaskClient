package com.checklist

import android.database.sqlite.SQLiteDatabase
import com.facebook.react.bridge.*
import com.reactnativecommunity.asyncstorage.AsyncLocalStorageUtil
import com.reactnativecommunity.asyncstorage.ReactDatabaseSupplier


class CookieModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "CookieModule"
    }

    @ReactMethod
    fun getCookie(): String? {

        val readableDatabase: SQLiteDatabase? = ReactDatabaseSupplier.getInstance(reactApplicationContext).readableDatabase
        if (readableDatabase != null) {
            return AsyncLocalStorageUtil.getItemImpl(readableDatabase, "userToken")
        }
        return null

    }
}
