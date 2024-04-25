package domain;

import java.io.Serializable;

/**
 * The Credential class is utilized for storage as well as validation of username and password
 * parameters entered.
 */
public class Credential implements Serializable {
	
	// Learn
	private static final long serialVersionUID = 1L;
	
	/**
	 * Initialize fields to help for organization of information from json string for easy storage
	 * of information. Helps with the reading and verification of fields/pieces of information 
	 * required.
	 */	
	private String username;
	private String password;

	/**
	 * Accessor method for username field.
	 * 
	 * @param	none
	 * @return			username field
	 */	
    public String getUsername() {
        return username;
    }
    
	/**
	 * Setter method for username field.
	 * 
	 * @param	username	the string the user inputs into the username box
	 * @return	none
	 */	
    public void setUsername(String username) {
        this.username = username;
    }
    
	/**
	 * Accessor method for password field.
	 * 
	 * @param	none
	 * @return			password field
	 */	
    public String getPassword() {
        return password;
    }

	/**
	 * Setter method for username field.
	 * 
	 * @param	password	the string the user inputs into the passwordbox
	 * @return	none
	 */	
    public void setPassword(String password) {
        this.password = password;
    }
}