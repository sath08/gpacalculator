package domain;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Domain object for StudentRecord. This class helps with the ease in organization of 
 * student record information stored in a set of nested arrays, as opposed to the json 
 * string sent to the backend. This helps with display of information on the client 
 * side and readability.
 */
public class StudentRecord implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * Initialize fields to help for organization of all of the information that the user enters
	 * which is sorted in semesters, cumulative gpas, and the student id so display on the 
	 * 4 year course plan page is simple.
	 */	
	private String identifier;
	private Double cumulative_weighted_gpa;
	private Double cumulative_unweighted_gpa;
   	private List<Object[]> semesters; 
	private HashMap<String, Object[]> semesterInfo;
	public StudentRecord() {
		semesterInfo = new HashMap<String, Object[]>();
		semesterInfo.put("Freshman Semester 1", null);
		semesterInfo.put("Freshman Semester 2", null);
		semesterInfo.put("Sophomore Semester 1", null);
		semesterInfo.put("Sophomore Semester 2", null);
		semesterInfo.put("Junior Semester 1", null);
		semesterInfo.put("Junior Semester 2", null);
		semesterInfo.put("Senior Semester 1", null);
		semesterInfo.put("Senior Semester 2", null);
	}
	
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
	 * @param	identifier	the string the user idbox
	 * @return	none
	 */	
	public void setIdentifier(String identifier) {
		this.identifier = identifier;
	}

	/**
	 * Accessor method for cumulative_weighted_gpa field.
	 * 
	 * @param	none
	 * @return			cumulative_weighted_gpa field
	 */	
	public double getCumulativeWeightedGpa() {
		return cumulative_weighted_gpa;
	}

	/**
	 * Setter method for cumulativeWeightedGpa field.
	 * 
	 * @param	cumulativeWeightedGpa	the string the user inputs into the cumulativeWeightedGpa 
	 * 										box
	 * @return	none
	 */	
	public void setCumulativeWeightedGpa(Double cumulativeWeightedGpa) {
		this.cumulative_weighted_gpa = cumulativeWeightedGpa;
	}

	/**
	 * Accessor method for cumulative_unweighted_gpa field.
	 * 
	 * @param	none
	 * @return			cumulative_unweighted_gpa field
	 */	
	public Double getCumulativeUnweightedGpa() {
		return cumulative_unweighted_gpa;
	}

	/**
	 * Setter method for cumulativeWeightedGpa field.
	 * 
	 * @param	cumulativeWeightedGpa	the string the user inputs into the cumulativeWeightedGpa 
	 * 										box
	 * @return	none
	 */	
	public void setCumulativeUnweightedGpa(Double cumulativeUnweightedGpa) {
		this.cumulative_unweighted_gpa = cumulativeUnweightedGpa;
	}

	/**
	 * Accessor method for semesters field.
	 * 
	 * @param	none
	 * @return			semesters field
	 */	
	public List<Object[]> getSemesters() {
		return semesters;
	}

	/**
	 * Setter method for semesterInfo field.
	 * 
	 * @param	semesterInfo	the array of semester objects that contains the names and grades
	 *  						of the user
	 * @return	none
	 */	
	public void setSemesters(List<Object[]> semesters) {
		this.semesters = semesters;
	}

	/**
	 * Accessor method for semesterInfo field.
	 * 
	 * @param	none
	 * @return			semesterInfo 
	 */	
	public HashMap<String, Object[]> getSemesterInfo() {
		return semesterInfo;
	}

	/**
	 * Setter method for semesterInfo field.
	 * 
	 * @param	semesterInfo	the array of semester objects that contains the names and grades
	 *  						of the user
	 * @return	none
	 */	
	public void setSemesterInfo(HashMap<String, Object[]> semesterInfo) {
		this.semesterInfo = semesterInfo;
	}

	/**
	 * toString method that organizes the json string for the client side to display on the four 
	 * year course planner.
	 * 
	 * @param	none
	 * @return	String	json string
	 */	
	public String toString() {
		StringBuffer buffer = new StringBuffer();
		buffer.append("Student Transcript\n");
		buffer.append("Identifier," + identifier + "\n");
		buffer.append("Cumulative Weighted GPA," + cumulative_weighted_gpa + "\n");
		buffer.append("Cumulative Unweighted GPA," + cumulative_unweighted_gpa + "\n");
	        for (Map.Entry<String,Object[]> entry: semesterInfo.entrySet()) { 
	        	if (entry.getValue() != null) {
		        	for (int i = 0; i < entry.getValue().length; i++) { // Ignore the Semester Name at Index 0
		        		if (i == 0) {
		        			buffer.append("\n\n" + entry.getValue()[i]);
		        		} else if (i == 1) {
		        			buffer.append("\n\nUnweighted GPA: " + entry.getValue()[i] + "\n");
		        		} else if (i == 2) {
		        			buffer.append("Weighted GPA: " + entry.getValue()[i] + "\n\n");
		        		} else {
		        			ArrayList<Object> courses = (ArrayList<Object>) entry.getValue()[i];
		        			int counter = 1;
		        			for (Object course : courses) {
		        				buffer.append(course + ",");
		        				if (counter % 3 == 0) {
		        					counter = 1;
		        					buffer.append("\n");
	        					}
		        				counter++;
	        				}
		        		}
		        	}
	        	}	
	        }
        	return buffer.toString();
	}
}
