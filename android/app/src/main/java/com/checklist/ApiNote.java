package com.checklist;

import android.os.AsyncTask;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

public class ApiNote {

    public interface NotesCallback {
        void onNotesFetched(ArrayList<NoteModel> notes);
        void onError(String message);
    }

    public void fetchNotes(String urlString,String cookie, NotesCallback callback) {
        new FetchNotesTask(callback,cookie).execute(urlString);
    }

    private static class FetchNotesTask extends AsyncTask<String, Void, String> {

        private final NotesCallback callback;
        private final String cookie;


        public FetchNotesTask(NotesCallback callback,String cookie) {
            this.callback = callback;
            this.cookie = cookie;
        }

        @Override
        protected String doInBackground(String... urls) {
            try {
                URL url = new URL(urls[0]);
                HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

                urlConnection.setRequestProperty("Cookie", cookie);
                urlConnection.setRequestProperty("token", cookie);
                urlConnection.setRequestProperty("Accept", "application/json");

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

        @Override
        protected void onPostExecute(String result) {
            if(result == null) {
                callback.onError("Failed to fetch notes");
            }

                try {
                    JSONArray notesArray = new JSONArray(result);
                    ArrayList<NoteModel> notes = new ArrayList<>();
                    for (int i = 0; i < notesArray.length(); i++) {
                        JSONObject noteObject = notesArray.getJSONObject(i);
                        String id = noteObject.getString("_id");
                        String title = noteObject.getString("title");
                        String content = noteObject.getString("content");

                        NoteModel note = new NoteModel(id, title, content);
                        notes.add(note);
                    }
                    callback.onNotesFetched(notes);
                } catch (JSONException e) {
                    e.printStackTrace();
                    callback.onError("Parsing error");
                }
            }
        }
    }
