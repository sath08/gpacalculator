package server;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Timer;
import java.util.TimerTask;
import java.util.stream.Stream;

import static java.nio.file.Files.copy;

/**
 * Class that is responsible for backing up the files.
 * 
 */
public class BackupProcess {
    
	/**
     * Constructor that initializes the timer and calls the method responsible for backing of the data.
     *
     */	
	public BackupProcess() {
		Timer timer = new Timer();
		timer.schedule(new TimerTask() {
			@Override
			public void run() {
				try {
					backupData();
				} catch (IOException e) {
					throw new RuntimeException(e);
				}
			}
		}, 5000, 1000);
	}
	
    /**
     * Helper method for copying files from source to destination.
     *
     * @throws IOException
     */
	private void backupData() throws IOException {
		System.out.println("Backup data");
		// Source directory
		Path sourceDir = Paths.get("C:\\Users\\sathk\\OneDrive\\Desktop\\gpacalculator\\GPAServer\\data\\");
		// Target directory
		Path targetDir = Paths.get("C:\\Users\\sathk\\OneDrive\\Desktop\\gpacalculator\\GPAServer\\backup\\");
		Files.walk(sourceDir)
		.filter(Files::isRegularFile)
		.forEach(source -> {
			Path target = targetDir.resolve(sourceDir.relativize(source));
			try {
				Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
			} catch (IOException e) {
				System.err.println("Failed to copy file: " + source + " to " + target);
				e.printStackTrace();
			}
		}	);
	}
		
}
