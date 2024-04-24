package domain;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StudentRecord implements Serializable{
	
	private static final long serialVersionUID = 1L;
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
	
	public String getIdentifier() {
		return identifier;
	}

	public void setIdentifier(String identifier) {
		this.identifier = identifier;
	}

	public double getCumulativeWeightedGpa() {
		return cumulative_weighted_gpa;
	}

	public void setCumulativeWeightedGpa(Double cumulativeWeightedGpa) {
		this.cumulative_weighted_gpa = cumulativeWeightedGpa;
	}

	public Double getCumulativeUnweightedGpa() {
		return cumulative_unweighted_gpa;
	}

	public void setCumulativeUnweightedGpa(Double cumulativeUnweightedGpa) {
		this.cumulative_unweighted_gpa = cumulativeUnweightedGpa;
	}

	public List<Object[]> getSemesters() {
		return semesters;
	}

	public void setSemesters(List<Object[]> semesters) {
		this.semesters = semesters;
	}

	public HashMap<String, Object[]> getSemesterInfo() {
		return semesterInfo;
	}

	public void setSemesterInfo(HashMap<String, Object[]> semesterInfo) {
		this.semesterInfo = semesterInfo;
	}

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
