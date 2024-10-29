package com.checklist;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.ArrayList;
import java.util.List;

public class TaskParser {

    public static class TaskInfo {
        String id;
        String object;

        public TaskInfo(String id, String object) {
            this.id = id;
            this.object = object;
        }

        @Override
        public String toString() {
            return "TaskId: " + id + ", object: " + object;
        }
    }

    public static List<TaskInfo> parseTasks(String content) {
        List<TaskInfo> taskInfoList = new ArrayList<>();
        Pattern pattern = Pattern.compile("<Task:([^:]+):\\{([^}]+)\\}>");
        Matcher matcher = pattern.matcher(content);

        while (matcher.find()) {
            String someId = matcher.group(1);
            String object = matcher.group(2);

            taskInfoList.add(new TaskInfo(someId, "{" +object + "}"));
        }
        return taskInfoList;
    }
}
