package domain;

import java.io.Serializable;

public class Extracurr implements Serializable {
	private static final long serialVersionUID = 1L;
    private String identifier;
    private String[][] Sports;
    private String[][] Clubs;
    private String[][] Volunteering;
    private String[][] Leadership;

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String[][] getSports() {
        return Sports;
    }

    public void setSports(String[][] sports) {
        this.Sports = sports;
    }

    public String[][] getClubs() {
        return Clubs;
    }

    public void setClubs(String[][] clubs) {
        this.Clubs = clubs;
    }

    public String[][] getVolunteering() {
        return Volunteering;
    }

    public void setVolunteering(String[][] volunteering) {
        this.Volunteering = volunteering;
    }

    public String[][] getLeadership() {
        return Leadership;
    }

    public void setLeadership(String[][] leadership) {
        this.Leadership = leadership;
    }
}
