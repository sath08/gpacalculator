package handlers;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import domain.Credential;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class LoginHandler implements HttpHandler{
    Map<String, String> credentials = new HashMap<String, String>();
    Map<String, String> users = new HashMap<String, String>();

    public LoginHandler() throws IOException {
    	FileInputStream fileIn = new FileInputStream("C:\\\\Users\\\\sathk\\\\OneDrive\\\\Desktop\\\\gpacalculator\\\\GPAServer\\\\data\\\\users.txt");
        BufferedReader br = new BufferedReader(new InputStreamReader(fileIn));
        String line;
        while ((line = br.readLine()) != null) {
            String[] parts = line.split(",");
            String identifier = parts[0].trim();
            String username = parts[1].trim();
            String password = parts[2].trim();
            credentials.put(username, password);
            users.put(username, identifier);
        }
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {

        if (exchange.getRequestMethod().equals("POST")) {
            try {
                handlePostRequest(exchange);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    private void handlePostRequest(HttpExchange exchange) throws Exception {
        //retrieve username and password from request payload that is coming in as json format in payload using Gson
        String reqBodyAsString = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        Gson gson = new Gson();
        Credential credential = gson.fromJson(reqBodyAsString, Credential.class);
        //check if username and password are valid
        if (credentials.containsKey(credential.getUsername()) && credentials.get(credential.getUsername()).equals(credential.getPassword())) {
            storeInfo(users.get(credential.getUsername()));
            //return 200 OK
            exchange.sendResponseHeaders(200, 0);
        } else {
            //return 401 Unauthorized
            exchange.sendResponseHeaders(401, 0);
        }
    }

    private String storeInfo(String identifier) throws Exception {
        String fileName = "user_identifier.txt";
        FileOutputStream fileOutputStream = new FileOutputStream(fileName);
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
        objectOutputStream.writeObject(identifier);
        fileOutputStream.close();
        objectOutputStream.close();
        return fileName;
    }
}