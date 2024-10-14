package com.gpstl.alternart.Services;

import com.gpstl.alternart.Dto.StudentDTO;
import com.gpstl.alternart.Models.Student;
import com.gpstl.alternart.Models.User;
import com.gpstl.alternart.Repositories.StudentRepository;
import com.gpstl.alternart.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository, UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    }

    // Create
    public StudentDTO createStudent(StudentDTO studentDTO) {
        Student student = mapToEntity(studentDTO);
        Student savedStudent = studentRepository.save(student);
        return mapToDTO(savedStudent);
    }

    // Read (Get by ID)
    public Optional<StudentDTO> getStudentById(Long id) {
        return studentRepository.findById(id)
                .map(this::mapToDTO);
    }

    // Read (Get All)
    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Update
    @Transactional
    public Optional<StudentDTO> updateStudent(Long id, StudentDTO studentDTO) {
        return studentRepository.findById(id)
                .flatMap(student -> userRepository.findById(studentDTO.getUserId())
                        .map(user -> {
                            student.setCvLink(studentDTO.getCvLink());
                            student.setVideoPresentationLink(studentDTO.getVideoPresentationLink());
                            student.setPortfolioLink(studentDTO.getPortfolioLink());
                            student.setKeySkills(studentDTO.getKeySkills());
                            student.setUser(user); // Set the existing User instance
                            return mapToDTO(student);
                        })
                );
    }

    // Delete
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    // Mapper methods
    private StudentDTO mapToDTO(Student student) {
        return new StudentDTO(
                student.getId(),
                student.getUser().getId(),
                student.getCvLink(),
                student.getVideoPresentationLink(),
                student.getPortfolioLink(),
                student.getKeySkills()
        );
    }

    private Student mapToEntity(StudentDTO studentDTO) {
        // Rechercher l'utilisateur par ID
        User user = userRepository.findById(studentDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Créer et retourner l'instance de Student
        return new Student(
                null, // ID will be generated
                user, // Utiliser l'instance de User récupérée
                studentDTO.getCvLink(),
                studentDTO.getVideoPresentationLink(),
                studentDTO.getPortfolioLink(),
                studentDTO.getKeySkills(),
                user.getCreatedAt()
        );
    }
}