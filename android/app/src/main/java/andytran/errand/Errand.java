package andytran.errand;

import android.location.Location;

import java.util.Date;

/**
 * Created by Andy Tran on 12/8/2015.
 */
public class Errand {
    /**
     * Responsible for building an Errand object. This follows Builder design pattern and is
     * based on AlertDialog.Builder class from Android.
     *
     * Static because Builder should not have direct access to members and functions from
     * the nesting class. It must have an instance of the nesting class in order to access
     * to its members and functions.
     */
    public static class Builder{
        private Errand errand;

        public Builder(){
            this.errand = new Errand();
        }

        public Errand create(){
            return this.errand;
        }

        public Builder setCompensation(Double compensation) {
            errand.compensation = compensation;
            return this;
        }

        public Builder setCustomer(User customer) {
            errand.customer = customer;
            return this;
        }

        public Builder setDescription(String description) {
            errand.description = description;
            return this;
        }

        public Builder setEndTime(Date endTime) {
            errand.endTime = endTime;
            return this;
        }

        public Builder setLocation(Location location) {
            errand.location = location;
            return this;
        }

        public Builder setRunner(User runner) {
            errand.runner = runner;
            return this;
        }

        public Builder setStartTime(Date startTime) {
            errand.startTime = startTime;
            return this;
        }
    }

    private User customer;
    private User runner;
    private String description;
    private Location location;
    private Date startTime;
    private Date endTime;
    private Double compensation;

    public Double getCompensation() {
        return compensation;
    }

    public User getCustomer() {
        return customer;
    }

    public String getDescription() {
        return description;
    }

    public Date getEndTime() {
        return endTime;
    }

    public Location getLocation() {
        return location;
    }

    public User getRunner() {
        return runner;
    }

    public Date getStartTime() {
        return startTime;
    }
}
