package com.pgmates.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pgmates.dao.AddressDao;
import com.pgmates.dao.AppointmentsDao;
import com.pgmates.dao.PropertyDao;
import com.pgmates.dao.UserDao;
import com.pgmates.dto.AddAppointmentSlotDto;
import com.pgmates.dto.AddressDtoToRegisterProperty;
import com.pgmates.dto.ApiResponse;
import com.pgmates.dto.AppointmentsDto;
import com.pgmates.dto.AvailabilityResponse;
import com.pgmates.dto.BookedAppointmentsDto;
import com.pgmates.dto.PropertyDetailsDto;
import com.pgmates.dto.PropertyDto;
import com.pgmates.dto.PropertyRequest;
import com.pgmates.dto.ReviewsDto;
import com.pgmates.dto.UserDto;
import com.pgmates.emailService.EmailService;
import com.pgmates.entity.Address;
import com.pgmates.entity.Appointments;
import com.pgmates.entity.Property;
import com.pgmates.entity.User;
import com.pgmates.exceptions.ResourceNotFoundException;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class OwnerServices implements OwnerServicesIF {
	@Autowired
	AppointmentsDao appointmentDao;

	@Autowired
	AddressDao addressDao;

	@Autowired
	ModelMapper mapper;

	@Autowired
	PropertyDao propertyDao;

	@Autowired
	UserDao userdao;
	
	@Autowired
	EmailService emailService;

	@Override
	public ApiResponse addAppointmentSlot(AddAppointmentSlotDto appointmentSlotDto) {

		int ownerId = appointmentSlotDto.getOwner();
		int PropertyId = appointmentSlotDto.getProperty();

		Appointments appointment = mapper.map(appointmentSlotDto, Appointments.class);

		Optional<Property> propertyopt = propertyDao.findById(PropertyId);
		Optional<User> owneropt = userdao.findById(ownerId);

		appointment.setProperty(propertyopt.get());
		appointment.setOwner(owneropt.get());

		boolean isAdded = appointmentDao.save(appointment) != null;

		if (isAdded) {
			return new ApiResponse("Slot Added Successfully!");
		}
		return new ApiResponse("Try Again!");

	}

	@Override
	public ApiResponse deleteAppointmentSlot(int appointmentId) {
		boolean doesExist = appointmentDao.existsById(appointmentId);
		if (!doesExist) {
			return new ApiResponse("Slot doesn't Exist");
		}
		appointmentDao.deleteById(appointmentId);
		return new ApiResponse("Slot deleted successfully!");
	}

	@Override
	public ApiResponse updateAppointmentSlot(int appointmentId, AddAppointmentSlotDto appointmentSlotDto) {
		// TODO Auto-generated method stub
		Optional<Appointments> appointmentOpt = appointmentDao.findById(appointmentId);

		if (!appointmentOpt.isPresent()) {
			return new ApiResponse("Appointment not found!");
		}

		Appointments appointment = appointmentOpt.get();

		int ownerId = appointmentSlotDto.getOwner();
		int propertyId = appointmentSlotDto.getProperty();

		Optional<Property> propertyOpt = propertyDao.findById(propertyId);
		Optional<User> ownerOpt = userdao.findById(ownerId);

		if (!propertyOpt.isPresent() || !ownerOpt.isPresent()) {
			return new ApiResponse("Invalid Property or Owner!");
		}

		appointment.setProperty(propertyOpt.get());
		appointment.setOwner(ownerOpt.get());
		appointment.setDate(appointmentSlotDto.getDate());
		appointment.setTime(appointmentSlotDto.getTime());
		appointment.setEndTime(appointmentSlotDto.getEndTime());
		appointment.setBooked(appointmentSlotDto.isBooked());

		appointmentDao.save(appointment);

		return new ApiResponse("Appointment Slot Updated Successfully!");

	}

	public ApiResponse cancelAppointment(int appointmentId) {
		Appointments appointment = appointmentDao.findById(appointmentId)
				.orElseThrow(() -> new ResourceNotFoundException("Appointment not found!"));

		if (!appointment.isBooked()) {
			return new ApiResponse("Appointment is already not booked!");
		}
		User user = appointment.getUser();
		User owner = appointment.getOwner();
		
		appointment.setBooked(false);
		appointment.setUser(null);
		appointmentDao.save(appointment);
		
		try {
        	StringBuilder msg = new StringBuilder();
        	msg = msg.append("<p>Hello ").append(user.getFirstName()).append(",</p>")
    		        .append("<p>Your appointment with ").append(owner.getFirstName()).append(" stands CANCELLED")
    		        .append("<strong>Details</strong><br>")
    		        .append("<table border='1' cellspacing='0' cellpadding='5' style='border-collapse: collapse; width:100%'>")
    		        .append("<tr><th style='background-color: #f2f2f2;'>Field</th><th>Details</th></tr>")
    		        .append("<tr><td>Name</td><td>").append(owner.getFirstName()).append(" ").append(user.getLastName()).append("</td></tr>")
    		        .append("<tr><td>Email</td><td>").append(owner.getEmail()).append("</td></tr>")
    		        .append("<tr><td>Contact</td><td>").append(owner.getContact()).append("</td></tr>")
    		        .append("<tr><td>Date</td><td>").append(appointment.getDate()).append("</td></tr>")
    		        .append("<tr><td>Slot</td><td>").append(appointment.getTime()).append(" - ").append(appointment.getEndTime()).append("</td></tr>")
    		        .append("<tr><td>Status</td><td>").append("CANCELLED").append("</td></tr>")
    		        .append("</table>")
    		        .append("Sorry for the inconvenience.");
        	emailService.sendEmail(user.getEmail(),"Appointment Cancelled", msg.toString());
        }catch(Exception e) {
        	e.printStackTrace();
        }
		return new ApiResponse("Appointment Cancelled Successfully!");
	}

	@Override
	public List<PropertyDto> getPropertiesByOwner(int owner_id) {
		List<Property> properties = propertyDao.findByOwner_UserId(owner_id);

		return properties.stream().map(property -> mapper.map(property, PropertyDto.class))
				.collect(Collectors.toList());
	}

	// to register a property.
	@Override
	public ApiResponse registerProperty(int owner_id, PropertyRequest propertyRequestDTO) {
//			Getting owner
		User owner = userdao.findById(owner_id).orElseThrow(() -> new ResourceNotFoundException("Owner not found"));

//	        Save Address first

		AddressDtoToRegisterProperty addressDto = mapper.map(propertyRequestDTO.getAddress(),
				AddressDtoToRegisterProperty.class);
		Address address = mapper.map(addressDto, Address.class);
		address = addressDao.save(address);

		Property property = mapper.map(propertyRequestDTO, Property.class);
		property.setOwner(owner); // Set the owner
		property.setAddress(address);

		property = propertyDao.save(property);

		return new ApiResponse("Proprty registered successfully");
	}

	@Override
	public ApiResponse updateProperty(int owner_id, int propertyId, PropertyRequest propertyRequest) {
		User owner = userdao.findById(owner_id).orElseThrow(() -> new ResourceNotFoundException("Owner not found"));


		Property existingProperty = propertyDao.findById(propertyId)
				.orElseThrow(() -> new ResourceNotFoundException("Property not found"));

		if (existingProperty.getOwner().getUserId() != owner_id) {
			throw new ResourceNotFoundException("You are not authorized to update this property.");
		}

		Address existingAddress = existingProperty.getAddress(); 

		if (existingAddress == null) {
			throw new ResourceNotFoundException("Address not found for this property.");
		}

		existingAddress.setAddressLine1(propertyRequest.getAddress().getAddressLine1());
		existingAddress.setAddressLine2(propertyRequest.getAddress().getAddressLine2());
		existingAddress.setCity(propertyRequest.getAddress().getCity());
		existingAddress.setState(propertyRequest.getAddress().getState());
		existingAddress.setPincode(propertyRequest.getAddress().getPincode());

	
		existingProperty.setAddress(existingAddress);

		
		mapper.map(propertyRequest, existingProperty);

		propertyDao.save(existingProperty);

		return new ApiResponse("Property Updated Successfully");
	}

	@Override
	public ApiResponse deleteProperty(int owner_id, int propertyId) {
		// Fetch the owner
		User owner = userdao.findById(owner_id).orElseThrow(() -> new ResourceNotFoundException("Owner not found"));

		// Fetch the property
		Property property = propertyDao.findById(propertyId)
				.orElseThrow(() -> new ResourceNotFoundException("Property not found"));

		// Check if the property belongs to the owner
		if (property.getOwner().getUserId() != owner_id) {
			throw new ResourceNotFoundException("You are not authorized to delete this property.");
		}

		// Delete the property
		propertyDao.delete(property);

		// Return a success response
		return new ApiResponse("Property deleted successfully");

	}

	@Override
	public PropertyDetailsDto getPropertyDetails(int propertyId) {
		Optional<Property> propertyOpt = propertyDao.findById(propertyId);

		// If property is not found, handle the exception
		if (propertyOpt.isEmpty()) {
			throw new ResourceNotFoundException("Property not found for ID: " + propertyId);
		}

		// Get the Property entity
		Property property = propertyOpt.get();

		// Map Property entity to PropertyDetailsDto
		PropertyDetailsDto propertyDetails = mapper.map(property, PropertyDetailsDto.class);

		// Map Owner entity to OwnerDto
		UserDto userdto = mapper.map(property.getOwner(), UserDto.class);
		propertyDetails.setOwner(userdto);

		List<ReviewsDto> reviewsDtoList = new ArrayList<>();
		// Iterate over each review and map it to ReviewsDto
		property.getReviews().forEach(review -> {
			// Map User entity to UserDtoForReview
			UserDto userDto = mapper.map(review.getUser(), UserDto.class);

			// Create a new ReviewsDto and add it to the list
			ReviewsDto reviewDto = new ReviewsDto(review.getReviewId(), userDto, review.getComment(),
					review.getRatings());
			reviewsDtoList.add(reviewDto);
		});

		// Set the reviewsDtoList to the propertyDetails DTO
		propertyDetails.setReviews(reviewsDtoList);

		List<AppointmentsDto> appointmentsDtoList = new ArrayList<>();
		property.getAppointments().forEach(appointment -> {
			AppointmentsDto appointmentDto = mapper.map(appointment, AppointmentsDto.class);
			appointmentsDtoList.add(appointmentDto);
		});
		propertyDetails.setAppointments(appointmentsDtoList);

		return propertyDetails;

	}

	@Override
	public List<BookedAppointmentsDto> getBookedAppointmentsByOwnerId(int ownerId) {
		// TODO Auto-generated method stub
		List<Appointments> appointment = appointmentDao.getBookedAppointments(ownerId);
		List<BookedAppointmentsDto> appointmentsdto = new ArrayList<>();

		for (Appointments bookedAppointment : appointment) {
			BookedAppointmentsDto Dto = mapper.map(bookedAppointment, BookedAppointmentsDto.class);
			appointmentsdto.add(Dto);
			Dto.getUser().setPassword(null);
		}
		return appointmentsdto;
	}

	@Override
	public AvailabilityResponse togglePropertyAvailability(int propertyId) {
		// TODO Auto-generated method stub
		Optional<Property> propertyopt = propertyDao.findById(propertyId);
		Property property = propertyopt.get();
		boolean availability = property.isIsavailable();
		if (availability) {
			property.setIsavailable(false);
			propertyDao.save(property);
			return new AvailabilityResponse("Property Marked as unavailable.", false);
		}
		property.setIsavailable(true);
		propertyDao.save(property);
		return new AvailabilityResponse("Property Marked as Available.", true);

	}

}
