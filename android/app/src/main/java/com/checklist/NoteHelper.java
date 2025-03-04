package com.checklist;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

public class NoteHelper {

    public static String getFormattedContent(String noteContent) throws JSONException {
        List<TaskParser.TaskInfo> taskInfoList = TaskParser.parseTasks(noteContent);
        if(taskInfoList.size() == 0){
            return noteContent;
        }

        StringBuilder sb = new StringBuilder();

        for (TaskParser.TaskInfo task :taskInfoList){
            JSONObject taskObject = new JSONObject(task.object);
            String title = taskObject.getString("title");
            String isCompleted = taskObject.getString("isCompleted");
            String description = taskObject.getString("description");

            if(isCompleted.equals("true")) {
            continue;
            }
            sb.append(title);
            if(!description.isEmpty()){
                sb.append(":").append(description);
            }
            sb.append(System.lineSeparator());
        }
        return sb.toString();
    }
}


