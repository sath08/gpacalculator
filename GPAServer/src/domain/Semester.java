package domain;

/**
 * This class stores the data from the gpa calculator page when the "Save to Four Year Plan" 
 * button is pressed. The data is stored to a csv file and is sent to the client when the Four 
 * Year Plan page is loaded.
 */
class Semester {
	/**
	 * Initialize fields to help for organization of one semesters worth of information for the 
	 * 4 year course plan page.
	 */	
	private String name;
    private double unweightedGPA;
    private double weightedGPA;
    private String[] courses;

	/**
	 * Accessor method for name field.
	 * 
	 * @param	none
	 * @return			name field
	 */	
    public String getName() {
        return name;
    }

	/**
	 * Setter method for name field.
	 * 
	 * @param	name	the year and semester selected by the user
	 * @return	none
	 */	
    public void setName(String name) {
        this.name = name;
    }

    /**
	 * Accessor method for unweightedGPA field.
	 * 
	 * @param	none
	 * @return			unweightedGPA field
	 */	
    public double getUnweightedGPA() {
        return unweightedGPA;
    }

	/**
	 * Setter method for unweightedGPA field.
	 * 
	 * @param	unweightedGPA	the unweighted gpa calculated based on the users grade
	 * @return	none
	 */	
    public void setUnweightedGPA(double unweightedGPA) {
        this.unweightedGPA = unweightedGPA;
    }

    /**
	 * Accessor method for weightedGPA field.
	 * 
	 * @param	none
	 * @return			weightedGPA field
	 */	
    public double getWeightedGPA() {
        return weightedGPA;
    }

	/**
	 * Setter method for weightedGPA field.
	 * 
	 * @param	weightedGPA	the weighted gpa calculated based on the users grade
	 * @return	none
	 */	
    public void setWeightedGPA(double weightedGPA) {
        this.weightedGPA = weightedGPA;
    }

    /**
	 * Accessor method for courses field.
	 * 
	 * @param	none
	 * @return			courses field
	 */	
    public String[] getCourses() {
        return courses;
    }

	/**
	 * Setter method for courses field.
	 * 
	 * @param	courses[]	the courses array includes the names of all the courses that a user has
	 * 						entered in the coures name box in the gpa calculator page.
	 * @return	none
	 */	
    public void setCourses(String[] courses) {
        this.courses = courses;
    }
}