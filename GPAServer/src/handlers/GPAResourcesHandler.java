package handlers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * Handler for /resources context responsible for managing resources. 
 * Only GET method is supported. 
 * 
 */
public class GPAResourcesHandler implements HttpHandler {
    
	/**
	 * Method for handling GET requests for the resources and calls corresponding method
	 * and accounting for exceptions. 
	 * 
	 * @param exchange		Http Exchange Object
	 * 
	 */
	public void handle(HttpExchange exchange) {
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

	/**
	 * Method for handling GET requests. Retrieves the resource file name 
	 * specified in query and writes the contents of the file to Outputstream
	 * 
	 * @param exchange	Http Exchange Object
	 * @throws IOException	URISyntaxException 
	 * 
	 */
    private void handleGetRequest(HttpExchange exchange) throws IOException, URISyntaxException {
        String fileName = exchange.getRequestURI().getQuery(); // fileName contains URL past '?'
        byte[] bytes = readFile(fileName); // Byte array reading the html file
        exchange.sendResponseHeaders(200, bytes.length); // Changing the response header to include metadata
        exchange.getResponseHeaders().set("Content-Type", "text/html"); 
        OutputStream os = exchange.getResponseBody(); // Using output stream to send to client
        os.write(bytes); 
        os.close();
    }

	/**
	 * Helper method for reading files and returning byte array.
	 * 
	 * @param fileName		filename to read
	 * @return byte[]		Byte array for the contents of the file
	 * @throws IOException	URISyntaxException 
	 * 
	 */
    private byte[] readFile (String fileName) throws IOException, URISyntaxException {
    	URI url  = this.getClass().getClassLoader().getResource(fileName).toURI();
        return Files.readAllBytes(Paths.get(url));
    }
}



