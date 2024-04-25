package handlers;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.OutputStream;
import java.net.URI;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import domain.StudentRecord;
import server.Utils;

/**
 * Handler for /transcript context responsible for handling the transcript. 
 * GET method is supported. 
 * 
 */
public class TranscriptHandler implements HttpHandler {

	/**
	 * Handler method for transcript. If the method is GET, it
	 * calls handleGetRequest. 
	 * 
	 */
	@Override
	public void handle(HttpExchange exchange) throws IOException {
		if (exchange.getRequestMethod().equals("GET")) {
            		try {
				handleGetRequest(exchange);
			} catch (Exception e) {
				e.printStackTrace();
			}
        	}
	}

	/**
	 * Implementation for handling GET for transcript. Retrieves the saved StudentRecord 
	 * for the user and returns the corresponding data in JSON format.
	 * 
	 * @param exchange - Http Exchange Object
	 * @throws Exception
	 */
	private void handleGetRequest(HttpExchange exchange) throws Exception {
       		 // Retrieve identifier from URL
		String format = exchange.getRequestURI().getQuery();
		// Find CSV file for identifier, read file content, and covert to java object
		String identifier = Utils.readIdentifier();

        	// Find CSV file for identifier, read file content, and covert to java object
		StudentRecord studentRecord = readFile("C:\\Users\\sathk\\OneDrive\\Desktop\\gpacalculator\\GPAServer\\data\\Transcript_" + identifier + ".csv");

		byte[] encoded = null;
		if (format.equals("json")) {
			Gson gson = new Gson();
			String studentRecordAsJson = gson.toJson(studentRecord);
			System.out.println(studentRecordAsJson);
			encoded = studentRecordAsJson.getBytes();
			exchange.getResponseHeaders().set("Content-Type", "application/json");
			exchange.sendResponseHeaders(200, encoded.length);
		} else {
			//send it as a csv file
			encoded = studentRecord.toString().getBytes();
			exchange.getResponseHeaders().set("Content-Type","application/octet-stream");
			exchange.getResponseHeaders().set("Content-Disposition", "attachment; filename=" + "Transcript.csv");
			exchange.sendResponseHeaders(200, encoded.length);
		}
        	OutputStream os = exchange.getResponseBody();
       		os.write(encoded);
        	os.close();
	}

	/**
    	* Helper method to read the StudentRecord from the disk
     	* @param path
     	* @return StudentRecord
     	* @throws Exception
     	*/
	private StudentRecord readFile(String path) throws Exception{
        	FileInputStream fileIn = new FileInputStream(path);
        	ObjectInputStream in = new ObjectInputStream(fileIn);
        	StudentRecord studentRecord = (StudentRecord) in.readObject();
        	in.close();
        	fileIn.close();
        	return studentRecord;
	}
}
