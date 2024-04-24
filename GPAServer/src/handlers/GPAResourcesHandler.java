package handlers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class GPAResourcesHandler implements HttpHandler {
    public void handle(HttpExchange exchange) {
        //if exchange is GET return "Hello Get"
        if (exchange.getRequestMethod().equals("GET")) {
            try {
				handleGetRequest(exchange);
			} catch (IOException e) {
				e.printStackTrace();
			} catch (URISyntaxException e) {
				e.printStackTrace();
			}
        } else {
        	System.out.println("ERROR - Not supported request methods");
        }
    }

    // handle GET request
    private void handleGetRequest(HttpExchange exchange) throws IOException, URISyntaxException {
        String fileName = exchange.getRequestURI().getQuery();
        byte[] bytes = readFile(fileName);
        exchange.sendResponseHeaders(200, bytes.length);
        exchange.getResponseHeaders().set("Content-Type", "text/html");
        OutputStream os = exchange.getResponseBody();
        os.write(bytes);
        os.close();
    }

    private byte[] readFile (String fileName) throws IOException, URISyntaxException {
    	URI url  = this.getClass().getClassLoader().getResource(fileName).toURI();
        return Files.readAllBytes(Paths.get(url));
        
    }
}



