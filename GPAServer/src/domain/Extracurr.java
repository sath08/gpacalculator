package domain;

import java.io.Serializable;

public class Extracurr implements Serializable {
	
	private static final long serialVersionUID = 1L;
    private String identifier;
    private String[][] sports;
    private String[][] clubs;
    private String[][] volunteering;
    private String[][] leadership;

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String[][] getSports() {
        return sports;
    }

    public void setSports(String[][] sports) {
        this.sports = sports;
    }

    public String[][] getClubs() {
        return clubs;
    }

    public void setClubs(String[][] clubs) {
        this.clubs = clubs;
    }

    public String[][] getVolunteering() {
        return volunteering;
    }

    public void setVolunteering(String[][] volunteering) {
        this.volunteering = volunteering;
    }

    public String[][] getLeadership() {
        return leadership;
    }

    public void setLeadership(String[][] leadership) {
        this.leadership = leadership;
    }
}
