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
import server.Utils;
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
        }else if (exchange.getRequestMethod().equals("POST")) {
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
	 * Implementation for handling GET for Extracurricular. Retrieves the saved extracurricular 
	 * for the user and returns the corresponding data in JSON format.
	 * 
	 * @param exchange - Http Exchange Object
	 * @throws IOException, ClassNotFoundException 
	 */
	private void handleGetRequest(HttpExchange exchange) throws IOException, ClassNotFoundException {
		String identifier = Utils.readIdentifier();
		Extracurr extracurr = retrieveFromDisk("C:\\Users\\sathk\\OneDrive\\Desktop\\gpacalculator\\GPAServer\\data\\Extracurricular_" + identifier + ".csv");
		Gson gson = new Gson();
		String extracurrAsJson = gson.toJson(extracurr);
		System.out.println(extracurrAsJson);
		byte[] extracurrBytes = extracurrAsJson.getBytes();
		exchange.getResponseHeaders().set("Content-Type", "application/json");
		exchange.sendResponseHeaders(200, extracurrBytes.length);
        OutputStream os = exchange.getResponseBody();
        os.write(extracurrBytes);
        os.close();
	}

	
	private void handlePostRequest(HttpExchange exchange) throws Exception {
        String response = "Extracurriculars Sucessfully Saved";
        String reqBodyAsString = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        Gson gson = new Gson(); 
        Extracurr extracurr = gson.fromJson(reqBodyAsString, Extracurr.class);
        exchange.sendResponseHeaders(200, response.length());
		String identifier = Utils.readIdentifier();
		extracurr.setIdentifier(identifier);
        storeToDisk(extracurr, extracurr.getIdentifier());
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
	}
	
	/**
	 * Stores the content to the disk with a specific format
	 * @param content
	 * @param identifier
	 * @return
	 * @throws Exception
	 */
    private String storeToDisk(Serializable content, String identifier) throws Exception {
    	String fileName = "data/Extracurricular_" + identifier + ".csv";
        FileOutputStream fileOutputStream = new FileOutputStream(fileName);
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
        objectOutputStream.writeObject(content);
        fileOutputStream.close();
        objectOutputStream.close();
        return fileName;
    }
        
    /**
     * Read the extracurricular stored at the specified path
     * @param path
     * @return
     * @throws IOException
     * @throws ClassNotFoundException
     */
	private Extracurr retrieveFromDisk(String path) throws IOException, ClassNotFoundException {
        FileInputStream fileIn = new FileInputStream(path);
        ObjectInputStream in = new ObjectInputStream(fileIn);
        Extracurr extracurr = (Extracurr) in.readObject();
        in.close();
        fileIn.close();
        return extracurr;
	}
}
