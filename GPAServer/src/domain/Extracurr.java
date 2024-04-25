package domain;

import java.io.Serializable;

/**
 * This class helps with the ease in display of information stored in the arrays when the page is 
 * loaded. Updated when the save button is pressed on webpage.
 */
public class Extracurr implements Serializable {
	// Learn
	private static final long serialVersionUID = 1L;
 
	/**
	 * Initialize fields to help for organization of information from json string for easy storage
	 * of information for the extracurriculars page.
	 */	
	private String identifier;
    private String[][] Sports;
    private String[][] Clubs;
    private String[][] Volunteering;
    private String[][] Leadership;

	/**
	 * Accessor method for identifier field.
	 * 
	 * @param	none
	 * @return			identifier field
	 */	
    public String getIdentifier() {
        return identifier;
    }

	/**
	 * Setter method for identifier field.
	 * 
	 * @param	identifier	the user id used to distinguish accounts
	 * @return	none
	 */	
    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

	/**
	 * Accessor method for sports field.
	 * 
	 * @param	none
	 * @return			username field
	 */	
    public String[][] getSports() {
        return Sports;
    }

	/**
	 * Setter method for sports field.
	 * 
	 * @param	sports[][]	2D string array containing user inputted information for sports section
	 * 						in the extracurriculars page
	 * @return	none
	 */	
    public void setSports(String[][] sports) {
        this.Sports = sports;
    }

	/**
	 * Accessor method for clubs field.
	 * 
	 * @param	none
	 * @return			clubs field
	 */	
    public String[][] getClubs() {
        return Clubs;
    }

	/**
	 * Setter method for clubs field.
	 * 
	 * @param	clubs[][]	2D string array containing user inputted information for clubs section
	 * 						in the extracurriculars page
	 * @return	none
	 */	
    public void setClubs(String[][] clubs) {
        this.Clubs = clubs;
    }

	/**
	 * Accessor method for volunteering field.
	 * 
	 * @param	none
	 * @return			volunteering field
	 */	
    public String[][] getVolunteering() {
        return Volunteering;
    }

	/**
	 * Setter method for volunteering field.
	 * 
	 * @param	volunteering[][]	2D string array containing user inputted information for 
	 * 								volunteering section in the extracurriculars page
	 * @return	none
	 */	
    public void setVolunteering(String[][] volunteering) {
        this.Volunteering = volunteering;
    }

	/**
	 * Accessor method for username field.
	 * 
	 * @param	none
	 * @return			username field
	 */	
    public String[][] getLeadership() {
        return Leadership;
    }

	/**
	 * Setter method for sports field.
	 * 
	 * @param	leadership[][]	2D string array containing user inputted information for 
	 * 							leadership section in the extracurriculars page.
	 * @return	none
	 */	
    public void setLeadership(String[][] leadership) {
        this.Leadership = leadership;
    }
}
