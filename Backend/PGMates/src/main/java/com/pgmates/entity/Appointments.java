package com.pgmates.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor
@Setter
public class Appointments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int apptId;

    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Property property; // The property associated with this appointment

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // The user who booked the appointment

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner; // The owner of the property
    
    @Column(nullable = false)
    private String date;
    @Column(nullable = false)
    private String time;
    @Column(nullable = false)
    private String endTime;
    private boolean isBooked; // Indicates if the slot is booked

    // Constructor
    public Appointments(int apptId, Property property, User user, User owner, String date, String time, String endTime,
                        boolean isBooked) {
        super();
        this.apptId = apptId;
        this.property = property;
        this.user = user;
        this.owner = owner;
        this.date = date;
        this.time = time;
        this.endTime = endTime;
        this.isBooked = isBooked;
    }
}
