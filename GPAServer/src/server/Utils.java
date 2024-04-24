package server;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;

public class Utils {

    /**
     * Reads the identifier from disk
     * @param path
     * @return
     * @throws IOException
     * @throws ClassNotFoundException
     */
    public static String readIdentifier() throws IOException, ClassNotFoundException{
        FileInputStream fileIn = new FileInputStream("user_identifier");
        ObjectInputStream in = new ObjectInputStream(fileIn);
        return(String) in.readObject();
    }

}
