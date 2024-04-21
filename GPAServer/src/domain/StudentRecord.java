package domain;

import java.util.List;

public class StudentRecord {
	
	private String identifier;
	private String cumulativeWeightedGpa;
	private String cumulativeUnweightedGpa;
	private List<Semester> semesters;

	// Getters and Setters
	public String getIdentifier() {
		return identifier;
	}

	public void setIdentifier(String identifier) {
		this.identifier = identifier;
	}

	public String getCumulativeWeightedGpa() {
		return cumulativeWeightedGpa;
	}

	public void setCumulativeWeightedGpa(String cumulativeWeightedGpa) {
		this.cumulativeWeightedGpa = cumulativeWeightedGpa;
	}

	public String getCumulativeUnweightedGpa() {
		return cumulativeUnweightedGpa;
	}

	public void setCumulativeUnweightedGpa(String cumulativeUnweightedGpa) {
		this.cumulativeUnweightedGpa = cumulativeUnweightedGpa;
	}

	public List<Semester> getSemesters() {
		return semesters;
	}

	public void setSemesters(List<Semester> semesters) {
		this.semesters = semesters;
	}
}
