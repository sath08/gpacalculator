package domain;

class Semester {
    private String name;
    private double unweightedGPA;
    private double weightedGPA;
    private String[] courses;

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

    public String[] getCourses() {
        return courses;
    }

    public void setCourses(String[] courses) {
        this.courses = courses;
    }
}