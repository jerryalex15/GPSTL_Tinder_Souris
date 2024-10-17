package com.gpstl.alternart.Services;

import com.gpstl.alternart.Dto.StudentDTO;
import com.gpstl.alternart.Models.Category;
import com.gpstl.alternart.Models.Student;
import com.gpstl.alternart.Models.User;
import com.gpstl.alternart.Repositories.CategoryRepository;
import com.gpstl.alternart.Repositories.StudentRepository;
import com.gpstl.alternart.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository,
                          UserRepository userRepository,
                          CategoryRepository categoryRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    /**
     * Create a new Student.
     *
     * @param studentDTO The student data.
     * @return The created StudentDTO.
     */
    public StudentDTO createStudent(StudentDTO studentDTO) {
        // Verify that the User exists and has the 'STUDENT' role
        User user = userRepository.findById(studentDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + studentDTO.getUserId()));

        // Optional: Verify user's role is 'STUDENT'
        if (!user.getRole().equalsIgnoreCase("student")) {

            throw new IllegalArgumentException("User with ID: " + user.getId() + " does not have the 'STUDENT' role. he has the role of " + user.getRole());
        }

        // if student already exists throw exception
        if (studentRepository.findByUserId(user.getId()).isPresent()) {
            throw new IllegalArgumentException("Student already exists with User ID: " + user.getId());
        }

        // Map DTO to Entity
        Student student = mapToEntity(studentDTO, user);

        // Handle Categories if provided
        if (studentDTO.getCategoryIds() != null && !studentDTO.getCategoryIds().isEmpty()) {
            Set<Category> categories = new HashSet<>(categoryRepository.findAllById(studentDTO.getCategoryIds()));
            if (categories.size() != studentDTO.getCategoryIds().size()) {
                throw new ResourceNotFoundException("One or more categories not found.");
            }
            student.setCategories(categories);
        }

        // Save the Student entity
        Student savedStudent = studentRepository.save(student);

        // Map Entity back to DTO
        return mapToDTO(savedStudent);
    }

    /**
     * Retrieve a Student by ID.
     *
     * @param id The ID of the student.
     * @return An Optional containing the StudentDTO if found.
     */
    public Optional<StudentDTO> getStudentById(Long id) {
        return studentRepository.findById(id)
                .map(this::mapToDTO);
    }

    /**
     * Retrieve all Students.
     *
     * @return A list of all StudentDTOs.
     */
    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Update an existing Student.
     *
     * @param id         The ID of the student to update.
     * @param studentDTO The updated student data.
     * @return An Optional containing the updated StudentDTO if found.
     */
    @Transactional
    public Optional<StudentDTO> updateStudent(Long id, StudentDTO studentDTO) {
        return studentRepository.findById(id)
                .map(existingStudent -> {
                    // Verify that the new User exists and has the 'STUDENT' role
                    User user = userRepository.findById(studentDTO.getUserId())
                            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + studentDTO.getUserId()));

                    if (!user.getRole().equalsIgnoreCase("student")) {
                        throw new IllegalArgumentException("User with ID: " + user.getId() + " does not have the 'STUDENT' role.");
                    }

                    // Update fields
                    existingStudent.setCvLink(studentDTO.getCvLink());
                    existingStudent.setVideoPresentationLink(studentDTO.getVideoPresentationLink());
                    existingStudent.setPortfolioLink(studentDTO.getPortfolioLink());
                    existingStudent.setKeySkills(studentDTO.getKeySkills());
                    existingStudent.setUser(user); // Update associated user

                    // Handle Categories if provided
                    if (studentDTO.getCategoryIds() != null) {
                        Set<Category> categories = new HashSet<>(categoryRepository.findAllById(studentDTO.getCategoryIds()));
                        if (categories.size() != studentDTO.getCategoryIds().size()) {
                            throw new ResourceNotFoundException("One or more categories not found.");
                        }
                        existingStudent.setCategories(categories);
                    }

                    // Save the updated student
                    Student updatedStudent = studentRepository.save(existingStudent);
                    return mapToDTO(updatedStudent);
                });
    }

    /**
     * Delete a Student by ID.
     *
     * @param id The ID of the student to delete.
     */
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Student not found with ID: " + id);
        }
        studentRepository.deleteById(id);
    }

    /**
     * Map Student Entity to StudentDTO.
     *
     * @param student The Student entity.
     * @return The StudentDTO.
     */
    private StudentDTO mapToDTO(Student student) {
        List<Long> categoryIds = null;
        if (student.getCategories() != null) {
            categoryIds = student.getCategories().stream()
                    .map(Category::getId)
                    .collect(Collectors.toList());
        }

        return new StudentDTO(
                student.getId(),
                student.getUser().getId(),
                student.getCvLink(),
                student.getVideoPresentationLink(),
                student.getPortfolioLink(),
                student.getKeySkills(),
                categoryIds
        );
    }

    /**
     * Map StudentDTO to Student Entity.
     *
     * @param studentDTO The StudentDTO.
     * @param user       The associated User entity.
     * @return The Student entity.
     */
    private Student mapToEntity(StudentDTO studentDTO, User user) {
        Student student = new Student();
        student.setUser(user);
        student.setCvLink(studentDTO.getCvLink());
        student.setVideoPresentationLink(studentDTO.getVideoPresentationLink());
        student.setPortfolioLink(studentDTO.getPortfolioLink());
        student.setKeySkills(studentDTO.getKeySkills());
        // Categories
        Set<Category> categories = new HashSet<>();
        if (studentDTO.getCategoryIds() != null) {
            categories = new HashSet<>(categoryRepository.findAllById(studentDTO.getCategoryIds()));
        }
        student.setCategories(categories);
        return student;
    }

    public StudentDTO addCategories(List<Long> categoryIds, Long studentUserId) {
        Student student = studentRepository.findByUserId(studentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with User ID: " + studentUserId));

        List<Category> categories = new ArrayList<>(categoryRepository.findAllById(categoryIds));
        if (categories.size() != categoryIds.size()) {
            throw new ResourceNotFoundException("One or more categories not found.");
        }
        // add all if there are not already present else try to add only the new ones

        for (Category category : categories) {
            if (!student.getCategories().contains(category)) {
                student.getCategories().add(category);
            }
        }

        Student updatedStudent = studentRepository.save(student);
        return mapToDTO(updatedStudent);
    }
}
