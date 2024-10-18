package com.checklist;

import java.util.ArrayList;
import java.util.List;

public class ApiNote {

    public List<Note> fetchNotes() {
        List<Note> notes = new ArrayList<>();

        // For example purposes, we’ll add some dummy notes. Replace this with real data fetching.
        notes.add(new Note("66faf217ac5937183fd9f417", "First Note","some content 1"));
        notes.add(new Note("66faf92950329360ded1a195", "Second Note","some content 2"));
        notes.add(new Note("66faf217ac5937183fd9f417", "Third Note","some content 3"));

        return notes;
    }
}
