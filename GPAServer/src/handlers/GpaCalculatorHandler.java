package handlers;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import domain.StudentRecord;
import server.Utils;

public class GpaCalculatorHandler implements HttpHandler {
	
    public void handle(HttpExchange exchange) throws IOException {
    	if (exchange.getRequestMethod().equals("POST")) {
            try {
				handlePostRequest(exchange);
			} catch (Exception e) {
				e.printStackTrace();
			}
        }else {
        	System.out.println("ERROR - Not supported request methods");
        }
    }

    // handle POST request
    private void handlePostRequest(HttpExchange exchange) throws IOException, ClassNotFoundException {
        String response = "Transcript Sucessfully Saved";
        String reqBodyAsString = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        Gson gson = new Gson(); 
        StudentRecord studentRecord = gson.fromJson(reqBodyAsString, StudentRecord.class);
        exchange.sendResponseHeaders(200, response.length());
        updateTranscript(studentRecord);
        String identifier = Utils.readIdentifier();
        studentRecord.setIdentifier(identifier);
        writeToDisk(studentRecord, studentRecord.getIdentifier());
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
    
    private String writeToDisk(Serializable content, String identifier) throws IOException {
    	String fileName = "data/Transcript_" + identifier + ".csv";
        FileOutputStream fileOutputStream = new FileOutputStream(fileName);
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
        objectOutputStream.writeObject(content);
        fileOutputStream.close();
        objectOutputStream.close();
        return fileName;
    }
    
    private void updateTranscript(StudentRecord studentRecord) {
    	for (Object[] semester : studentRecord.getSemesters()) {
    		Map<String, Object[]> semesterInfo = studentRecord.getSemesterInfo();
    		String semesterName = (String) semester[0];
    		semesterInfo.put(semesterName, semester);
    	}
    }
    
}