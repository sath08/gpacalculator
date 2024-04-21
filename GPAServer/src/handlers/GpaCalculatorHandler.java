package handlers;
import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import domain.StudentRecord;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import java.util.stream.Collectors;

public class GpaCalculatorHandler implements HttpHandler {
    public void handle(HttpExchange exchange) throws IOException {
        //if exchange is GET return "Hello Get"
        if (exchange.getRequestMethod().equals("GET")) {
            handleGetRequest(exchange);
        }
        //if exchange is POST return "Hello Post"
        if (exchange.getRequestMethod().equals("POST")) {
            handlePostRequest(exchange);
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
    private void handlePostRequest(HttpExchange exchange) throws IOException {
        String response = "Hello Post GPA Calculator";
        String reqBodyAsString = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        Gson gson = new Gson(); 
        StudentRecord studentRecord = gson.fromJson(reqBodyAsString, StudentRecord.class);
        exchange.sendResponseHeaders(200, response.length());
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
}