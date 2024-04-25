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

/**
 * Handler for /gpacalc context responsible for managing Trascript (4 Year Plan). 
 * POST method is supported. 
 * 
 */
public class GpaCalculatorHandler implements HttpHandler {

    /**
    * Handler method for transcript. If the method is POST, it
    * calls handlePostRequest. 
    * 
    */
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

    /**
     * Implementation for handling POST for StudentRecord. Retrieves the studentrecord 
     * JSON from the request, converts it to Java Object using GSON and saves the StudentRecord
     * object to the disk.
     *
     * @param exchange - Http Exchange Object
     * @throws IOException, ClassNotFoundException 
     */
    private void handlePostRequest(HttpExchange exchange) throws IOException, ClassNotFoundException {
        String response = "StudentRecord Sucessfully Saved";
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

    /**
     * Helper method for writing the specified content to the disk using the identifier in the file name.
     *
     * @param exchange - Serializable content, String identifier
     * @throws IOException
     */
    private String writeToDisk(Serializable content, String identifier) throws IOException {
    	String fileName = "data/Transcript_" + identifier + ".csv";
        FileOutputStream fileOutputStream = new FileOutputStream(fileName);
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
        objectOutputStream.writeObject(content);
        fileOutputStream.close();
        objectOutputStream.close();
        return fileName;
    }

    /**
     * Helper method updating the transcript for the Student Record.
     *
     * @param exchange - StudentRecord studentRecord
     */
    private void updateTranscript(StudentRecord studentRecord) {
    	for (Object[] semester : studentRecord.getSemesters()) {
    		Map<String, Object[]> semesterInfo = studentRecord.getSemesterInfo();
    		String semesterName = (String) semester[0];
    		semesterInfo.put(semesterName, semester);
    	}
    }
    
}
