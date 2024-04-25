package security;

/**
 * Cipher class for encrypting the credentials for the service.
 * Provides encrypt & decrypt methods
 * 
 */
public class GPACalcCipher {

    /**
     * Helper method for decryption
     */
    public static String decrypt(String enc, int offset) {
        return encrypt(enc, 26-offset);
    }

    /**
     * Helper method for encryption
     */
    public static String encrypt(String enc, int offset) {
        offset = offset % 26 + 26;
        StringBuilder encryptedString = new StringBuilder();
        for (char i : enc.toCharArray()) {
            if (Character.isLetter(i)) {
                if (Character.isUpperCase(i)) {
                    encryptedString.append((char) ('A' + (i - 'A' + offset) % 26 ));
                } else {
                    encryptedString.append((char) ('a' + (i - 'a' + offset) % 26 ));
                }
            } else {
                encryptedString.append(i);
            }
        }
        return encryptedString.toString();
    }
}
