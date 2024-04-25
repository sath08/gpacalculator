package server;
import com.sun.net.httpserver.HttpServer;

import handlers.ExtracurrHandler;
import handlers.GPAResourcesHandler;
import handlers.GpaCalculatorHandler;
import handlers.LoginHandler;
import handlers.TranscriptHandler;

import java.io.IOException;
import java.net.InetSocketAddress;

/**
 * GPACalculatorServer is the HTTP server that is used to host our site, and in the main
 * we have each one of the url paths and the associated handlers.
 */
public class GPACalculatorServer {
	/**
	 * GPACalculatorServer is the HTTP server that is used to host our site, and in the main
	 * we have each one of the url paths and the associated handlers.
	 * 
	 * @param	path
         * @return	none
         * @throws	IOException
         * @throws	ClassNotFoundException
	 */
	public static void main(String[] args) throws IOException {
		HttpServer server = HttpServer.create(new InetSocketAddress(8082), 0);
		server.createContext("/gpacalculator", new GpaCalculatorHandler());
		server.createContext("/transcript", new TranscriptHandler());
		server.createContext("/extracurr", new ExtracurrHandler());
		server.createContext("/resources", new GPAResourcesHandler());
		server.createContext("/login", new LoginHandler());
		server.setExecutor(null); // creates a default executor
		server.start();
	}
}
