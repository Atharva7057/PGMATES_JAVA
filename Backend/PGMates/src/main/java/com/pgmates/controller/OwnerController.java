package com.pgmates.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pgmates.dto.AddAppointmentSlotDto;
import com.pgmates.dto.ApiResponse;
import com.pgmates.service.OwnerServices;

@RestController
@RequestMapping("/owner")
@CrossOrigin(origins = "http://localhost:5173")
public class OwnerController {
	@Autowired
	OwnerServices ownerService;
	
	 //@PreAuthorize("hasAuthority('ROLE_OWNER')")
	@PostMapping("/addAppointmentSlot")
	public ResponseEntity<?> addAppointmentSlot(@RequestBody AddAppointmentSlotDto appointmentDto){
		
		ApiResponse resp = ownerService.addAppointmentSlot(appointmentDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(resp);
		
	}
	
	// @PreAuthorize("hasAuthority('ROLE_OWNER')")
	@DeleteMapping("/deleteAppointmentSlot/{appointmentID}")
	public ResponseEntity<?> deleteAppointmentSlot(@PathVariable int appointmentID){
		return ResponseEntity.status(HttpStatus.OK).body(ownerService.deleteAppointmentSlot(appointmentID));
	}
	
<<<<<<< HEAD
	 //@PreAuthorize("hasAuthority('ROLE_OWNER')")
	@GetMapping("/demo")
	public void  demolist(){
		List<String> demoList = new ArrayList();
		demoList.add("parthavi");
		demoList.add("ayushi");
		demoList.add("donald duck");
=======
	@PutMapping("update/{appointmentId}")
    public ResponseEntity<?> updateAppointmentSlot(@PathVariable int appointmentId, @RequestBody AddAppointmentSlotDto appointmentSlotDto) {
        ApiResponse response =  ownerService.updateAppointmentSlot(appointmentId, appointmentSlotDto);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
	
	@PostMapping("/cancelAppointment/{appointmentId}")
	public ResponseEntity<?>cancelAppointment(@PathVariable int appointmentId){
		ApiResponse response = ownerService.cancelAppointment(appointmentId);
		return ResponseEntity.status(HttpStatus.OK).body(response);
>>>>>>> ef2543fb82e42c4b2ef71d088403bfe1f8939bbb
	}
}
