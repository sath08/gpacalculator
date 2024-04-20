import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

public class GPAResourcesHandler implements HttpHandler {
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
        String fileName = exchange.getRequestURI().getQuery();
        byte[] encoded = Files.readAllBytes(Paths.get("C:\\Users\\sathk\\OneDrive\\Desktop\\gpacalculator\\GPAServer\\src\\resources\\" + fileName));;
        exchange.sendResponseHeaders(200, encoded.length);
        exchange.getResponseHeaders().set("Content-Type", "text/html");
        OutputStream os = exchange.getResponseBody();
        os.write(encoded);
        os.close();
    }
    // handle POST request
    private void handlePostRequest(HttpExchange exchange) throws IOException {
        String response = "Hello Post Resources";
        exchange.sendResponseHeaders(200, response.length());
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
}



