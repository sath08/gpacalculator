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
 * GPACalculatorServer is the HTTP server that is used to host our site. It listens to the HTTP requests
 * and routes to the appropriate handlers for processing or serving resources
 */
public class GPACalculatorServer {
	/**
	 * GPACalculatorServer is started on port 8082 and contexts are created 
	 * and Handlers are instantiated for each of them
	 * 
	 * @param	path
         * @return	none
         * @throws	IOException
         * @throws	ClassNotFoundException
	 */
	public static void main(String[] args) throws IOException {
		HttpServer server = HttpServer.create(new InetSocketAddress(8082), 0);
		//Bind contects to the handlers
		server.createContext("/gpacalculator", new GpaCalculatorHandler());
		server.createContext("/transcript", new TranscriptHandler());
		server.createContext("/extracurr", new ExtracurrHandler());
		server.createContext("/resources", new GPAResourcesHandler());
		server.createContext("/login", new LoginHandler());
		server.setExecutor(null); // creates a default executor
		//initialize the backup process
		BackupProcess backupProcess = new BackupProcess();
		server.start();
	}
}
