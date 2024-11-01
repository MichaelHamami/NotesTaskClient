package com.checklist;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ApiNote {

    private final String cookie;
    private final ExecutorService executorService;
    private final Handler mainHandler;

    public ApiNote(String cookie) {
        this.cookie = cookie;
        this.executorService = Executors.newSingleThreadExecutor();
        this.mainHandler = new Handler(Looper.getMainLooper());
    }

    public interface FetchAllNotesCallback {
        void onNotesFetched(ArrayList<NoteModel> notes);
        void onError(String message);
    }

    public interface FetchSingleNotesCallback {
        void onNoteFetched(NoteModel note);
        void onError(String message);
    }



    public void fetchNotes(String url, FetchAllNotesCallback callback) {
        executorService.execute(() -> {
            String result = makeApiRequest(url);
            mainHandler.post(() -> handleFetchNotesResult(result, callback));
        });
    }

    public void fetchSingleNote(String url, FetchSingleNotesCallback callback) {
        executorService.execute(() -> {
            String result = makeApiRequest(url);
            mainHandler.post(() -> handleFetchSingleNoteResult(result, callback));
        });
    }

    private String makeApiRequest(String urlString) {
        try {
            URL url = new URL(urlString);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

            Log.d("ApiNote", cookie);

            urlConnection.setRequestProperty("token", cookie);
            urlConnection.setRequestProperty("Accept", "*/*");

            BufferedReader in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            urlConnection.disconnect();
            return response.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private void handleFetchNotesResult(String result, FetchAllNotesCallback callback) {
        if (result == null) {
            callback.onError("Failed to fetch notes");
            return;
        }

        try {
            JSONArray notesArray = new JSONArray(result);
            ArrayList<NoteModel> notes = new ArrayList<>();
            for (int i = 0; i < notesArray.length(); i++) {
                JSONObject noteObject = notesArray.getJSONObject(i);
                Log.d("ApiNote", noteObject.toString());

                String id = noteObject.getString("_id");
                String title = noteObject.getString("title");
                String content = noteObject.getString("content");
                String color = noteObject.getString("color");

                NoteModel note = new NoteModel(id, title, content, color);
                notes.add(note);
            }
            callback.onNotesFetched(notes);
        } catch (JSONException e) {
            e.printStackTrace();
            callback.onError("Parsing error");
        }
    }

    private void handleFetchSingleNoteResult(String result, FetchSingleNotesCallback callback) {
        if (result == null) {
            callback.onError("Failed to fetch note");
            return;
        }

        try {
            JSONObject noteObject = new JSONObject(result);
            Log.d("ApiNote", noteObject.toString());

            String id = noteObject.getString("_id");
            String title = noteObject.getString("title");
            String content = noteObject.getString("content");
            String color = noteObject.getString("color");

            NoteModel note = new NoteModel(id, title, content, color);
            callback.onNoteFetched(note);
        } catch (JSONException e) {
            e.printStackTrace();
            callback.onError("Parsing error");
        }
    }
}
