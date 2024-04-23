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
		String format = exchange.getRequestURI().getQuery();
		// Find CSV file for identifier, read file content, and covert to java object
		//TODO fix this
		String identifier = "123325";

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
	
	private StudentRecord readFile(String path) throws Exception{
        FileInputStream fileIn = new FileInputStream(path);
        ObjectInputStream in = new ObjectInputStream(fileIn);
        StudentRecord studentRecord = (StudentRecord) in.readObject();
        in.close();
        fileIn.close();
        return studentRecord;
	}
}
