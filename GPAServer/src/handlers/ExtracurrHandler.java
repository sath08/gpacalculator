package handlers;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.io.Serializable;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import domain.Extracurr;
import domain.Extracurr;

public class ExtracurrHandler implements HttpHandler {

	@Override
	public void handle(HttpExchange exchange) throws IOException {
        if (exchange.getRequestMethod().equals("GET")) {
            try {
				handleGetRequest(exchange);
			} catch (Exception e) {
				e.printStackTrace();
			}
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

	private void handleGetRequest(HttpExchange exchange) throws Exception {
		String identifier = readIdentifier("user_identifier.txt");
		Extracurr extracurr = readFile("C:\\Users\\sathk\\OneDrive\\Desktop\\gpacalculator\\GPAServer\\data\\Extracurricular_" + identifier + ".csv");
		Gson gson = new Gson();
		String extracurrAsJson = gson.toJson(extracurr);
		System.out.println(extracurrAsJson);
		byte[] encoded = extracurrAsJson.getBytes();
		exchange.getResponseHeaders().set("Content-Type", "application/json");
		exchange.sendResponseHeaders(200, encoded.length);
        OutputStream os = exchange.getResponseBody();
        os.write(encoded);
        os.close();
	}

	private Extracurr readFile(String path) throws Exception {
        FileInputStream fileIn = new FileInputStream(path);
        ObjectInputStream in = new ObjectInputStream(fileIn);
        Extracurr extracurr = (Extracurr) in.readObject();
        in.close();
        fileIn.close();
        return extracurr;
	}

	private void handlePostRequest(HttpExchange exchange) throws Exception {
        String response = "Extracurriculars Sucessfully Saved";
        String reqBodyAsString = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        Gson gson = new Gson(); 
        Extracurr extracurr = gson.fromJson(reqBodyAsString, Extracurr.class);
        exchange.sendResponseHeaders(200, response.length());
		String identifier = readIdentifier("user_identifier.txt");
		extracurr.setIdentifier(identifier);
        writeToFile(extracurr, extracurr.getIdentifier());
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
	}

    private String writeToFile(Serializable content, String identifier) throws Exception {
    	String fileName = "data/Extracurricular_" + identifier + ".csv";
        FileOutputStream fileOutputStream = new FileOutputStream(fileName);
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
        objectOutputStream.writeObject(content);
        fileOutputStream.close();
        objectOutputStream.close();
        return fileName;
    }
    
    private String readIdentifier(String path) throws Exception{
        FileInputStream fileIn = new FileInputStream(path);
        ObjectInputStream in = new ObjectInputStream(fileIn);
        return(String) in.readObject();
    }
}
