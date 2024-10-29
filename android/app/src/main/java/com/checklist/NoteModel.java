package com.checklist;

public class NoteModel {

    private final String id;
    private final String title;
    private final String content;
    private final String color;

    public NoteModel(String id, String title,String content,String color) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.color = color;

    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public  String getContent(){
        return content;
    }

    public String getColor() { return  color; }

    @Override
    public String toString() {
        return title;
    }

}
