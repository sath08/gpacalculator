package security;

public class GPACalcCipher {
    public static String decrypt(String enc, int offset) {
        return encrypt(enc, 26-offset);
    }

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
