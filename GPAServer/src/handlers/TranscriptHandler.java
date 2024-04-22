package handlers;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.OutputStream;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import domain.StudentRecord;

public class TranscriptHandler implements HttpHandler {

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

	private void handleGetRequest(HttpExchange exchange) throws Exception {
        // Retrieve identifier from URL

		String identifier = exchange.getRequestURI().getQuery();
		if (identifier == null) {
			identifier = "123325";
		}
        // Find CSV file for identifier, read file content, and covert to java object
		StudentRecord studentRecord = readFile("C:\\Users\\sathk\\OneDrive\\Desktop\\gpacalculator\\GPAServer\\Transcript_" + identifier + ".csv");
        // Convert java object to json string
		Gson gson = new Gson(); 
		String studentRecordAsJson = gson.toJson(studentRecord);
		System.out.println(studentRecordAsJson);
        byte[] encoded = studentRecordAsJson.getBytes();
        exchange.sendResponseHeaders(200, encoded.length);
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        OutputStream os = exchange.getResponseBody();
        os.write(encoded);
        os.close();
	}
	
	private StudentRecord readFile(String path) throws Exception{
        FileInputStream fileIn = new FileInputStream(path);
        ObjectInputStream in = new ObjectInputStream(fileIn);
        StudentRecord studentRecord = (StudentRecord) in.readObject();
        in.close();
        fileIn.close();
        return studentRecord;
	}
}
