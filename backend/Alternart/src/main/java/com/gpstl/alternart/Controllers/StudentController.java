package com.gpstl.alternart.Controllers;

import com.gpstl.alternart.Dto.AddCategoriesRequest;
import com.gpstl.alternart.Dto.StudentDTO;
import com.gpstl.alternart.Services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    /**
     * Create a new Student.
     *
     * @param studentDTO The student data.
     * @return The created student.
     */
    @PostMapping
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN')")
    public ResponseEntity<StudentDTO> createStudent(@RequestBody StudentDTO studentDTO) {

        StudentDTO createdStudent = null;
        try {
            createdStudent = studentService.createStudent(studentDTO);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
    }

    /**
     * Retrieve all Students.
     *
     * @return A list of all students.
     */
    @GetMapping
    @PreAuthorize("hasRole('CFA') or hasRole('ADMIN')")
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        try {
            List<StudentDTO> students = studentService.getAllStudents();
            return ResponseEntity.ok(students);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


// StudentController.java

    @PostMapping("/addCategories")
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN')")
    public ResponseEntity<StudentDTO> addCategories( @RequestBody AddCategoriesRequest request) {
        try {
            StudentDTO studentDTO = studentService.addCategories(request.getCategoryIds(), request.getStudentUserId());
            return ResponseEntity.ok(studentDTO);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    /**
     * Retrieve a Student by ID.
     *
     * @param id The ID of the student.
     * @return The student data.
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN')")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id) {
        try {
            StudentDTO studentDTO = studentService.getStudentById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + id));
            return ResponseEntity.ok(studentDTO);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Update an existing Student.
     *
     * @param id         The ID of the student to update.
     * @param studentDTO The updated student data.
     * @return The updated student.
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN') or hasRole('CFA')")
    public ResponseEntity<StudentDTO> updateStudent(@PathVariable Long id, @RequestBody StudentDTO studentDTO) {
        try {
            StudentDTO updatedStudent = studentService.updateStudent(id, studentDTO)
                    .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + id));
            return ResponseEntity.ok(updatedStudent);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Delete a Student by ID.
     *
     * @param id The ID of the student to delete.
     * @return No content.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CFA') or hasRole('STUDENT')")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}
