package com.pgmates.globalExceptionHandler;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.pgmates.dto.ApiResponse;
import com.pgmates.exceptions.ResourceNotFoundException;
@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e){
		return ResponseEntity.status(HttpStatus.NOT_FOUND ).body(new ApiResponse(e.getMessage()));
	}
	
//	@ExceptionHandler(MethodArgumentNotValidException.class)
//	public ResponseEntity<?> handleMethodValidationException(MethodArgumentNotValidException e){
//		List<FieldError> rf = e.getFieldErrors(); 
//		Map<String, String> map = rf.stream() //Stream<FieldError>
//				.collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
//		 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
//	}
}
