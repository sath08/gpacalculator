import com.sun.net.httpserver.HttpServer;

import handlers.GPAResourcesHandler;
import handlers.GpaCalculatorHandler;
import handlers.TranscriptHandler;

import java.io.IOException;
import java.net.InetSocketAddress;

public class GPACalculatorServer {
	public static void main(String[] args) throws IOException {
		HttpServer server = HttpServer.create(new InetSocketAddress(8082), 0);
		server.createContext("/gpacalculator", new GpaCalculatorHandler());
		server.createContext("/transcript", new TranscriptHandler());
		server.createContext("/resources", new GPAResourcesHandler());
		server.setExecutor(null); // creates a default executor
		server.start();
	}
}