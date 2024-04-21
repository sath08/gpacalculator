package domain;

import java.util.List;

class Semester {
    private String name;
    private double unweightedGPA;
    private double weightedGPA;
    private List<Course> courses;

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getUnweightedGPAa() {
        return unweightedGPA;
    }

    public void setUnweightedGPA(double unweightedGPA) {
        this.unweightedGPA = unweightedGPA;
    }

    public double getWeightedGPA() {
        return weightedGPA;
    }

    public void setWeightedGPA(double weightedGPA) {
        this.weightedGPA = weightedGPA;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }
}