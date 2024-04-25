package handlers;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.ObjectOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import domain.Credential;
import security.GPACalcCipher;

/**
 * Handler for /login context responsible for authenticating and loginng
 * in the user. Only POST method is supported. 
 * 
 */
public class LoginHandler implements HttpHandler{
    Map<String, String> credentials = new HashMap<String, String>();
    Map<String, String> users = new HashMap<String, String>();

    /**
    * Constructor for LoginHandler. Loads the users from disk.
    * 
    */
    public LoginHandler() throws IOException {
    	loadUsers();
    }


    /**
     * Method for handling POST requests for login. Calls handlePostRequest for POST method.
     * 
     * @param exchange		Http Exchange Object
     * 
     */
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

  /**
   * Method for handling Login Post requests. Converts the json for credentials into Credential
   * object using GSON. Authenticates the user. Validates that username exists and password 
   * matches the users password. 
   *
   * If login is successful sets the status code to 200 
   * else sets it to 401
   * @param exchange	Http Exchange Object
   * @throws Exception	 
   * 
   */
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
	
   /**
    * Helper method for saving user identifier for access later
    * object using GSON. Authenticates the user. Validates that username exists and password 
    * matches the users password. 
    *
    * @return filename
    * @throws Exception	 
    * 
    */
    private String storeInfo(String identifier) throws Exception {
        String fileName = "user_identifier";
        FileOutputStream fileOutputStream = new FileOutputStream(fileName);
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
        objectOutputStream.writeObject(identifier);
        fileOutputStream.close();
        objectOutputStream.close();
        return fileName;
    }
	
   /**
    * Helper method for loading users from the file
    *
    * @throws FileNotFoundException, IOException	 
    * 
    */
    private void loadUsers() throws FileNotFoundException, IOException {
	FileInputStream fileIn = new FileInputStream("C:\\\\Users\\\\sathk\\\\OneDrive\\\\Desktop\\\\gpacalculator\\\\GPAServer\\\\data\\\\users.txt");
        BufferedReader br = new BufferedReader(new InputStreamReader(fileIn));
        String line;
        while ((line = br.readLine()) != null) {
            String[] parts = line.split(",");
            String identifier = parts[0].trim();
            String username = GPACalcCipher.decrypt(parts[1].trim(),12);
            String password = GPACalcCipher.decrypt(parts[2].trim(),12);
            credentials.put(username, password);
            users.put(username, identifier);
        }
    }
}
