package handlers;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Scanner;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import domain.StudentRecord;

public class GpaCalculatorHandler implements HttpHandler {
    public void handle(HttpExchange exchange) throws IOException {
        //if exchange is GET return "Hello Get"
        if (exchange.getRequestMethod().equals("GET")) {
            handleGetRequest(exchange);
        }
        //if exchange is POST return "Hello Post"
        if (exchange.getRequestMethod().equals("POST")) {
            try {
				handlePostRequest(exchange);
			} catch (Exception e) {
				e.printStackTrace();
			}
        }
    }
    // handle GET request
    private void handleGetRequest(HttpExchange exchange) throws IOException {
        byte[] encoded = Files.readAllBytes(Paths.get("C:\\Users\\sathk\\OneDrive\\Desktop\\gpacalculator\\GPAServer\\src\\resources\\gpacalc.html"));;
        exchange.sendResponseHeaders(200, encoded.length);
        exchange.getResponseHeaders().set("Content-Type", "text/html");
        OutputStream os = exchange.getResponseBody();
        os.write(encoded);
        os.close();
    }
    // handle POST request
    private void handlePostRequest(HttpExchange exchange) throws Exception {
        String response = "Transcript Sucessfully Saved";
        String reqBodyAsString = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        Gson gson = new Gson(); 
        StudentRecord studentRecord = gson.fromJson(reqBodyAsString, StudentRecord.class);
        exchange.sendResponseHeaders(200, response.length());
        updateTranscript(studentRecord);
        writeToFile(studentRecord, studentRecord.getIdentifier());
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
    
    private String writeToFile(Serializable content, String identifier) throws Exception {
    	String fileName = "Transcript_" + identifier + ".csv";
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