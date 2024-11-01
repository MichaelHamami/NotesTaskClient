package com.checklist;

public class NoteModel {

    private final String id;
    private  String title;
    private String content;
    private  String color;

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

    public void setTitle(String newTitle){
        this.title = newTitle;
    }

    public  String getContent(){
        return content;
    }

    public void setContent(String newContent ){
        this.content = newContent;
    }

    public String getColor() { return  color; }

    public void setColor(String newColor){
        this.color=newColor;
    }

    @Override
    public String toString() {
        return title;
    }

}
