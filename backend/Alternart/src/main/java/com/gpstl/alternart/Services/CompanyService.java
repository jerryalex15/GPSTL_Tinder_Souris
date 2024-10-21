// CompanyService.java
package com.gpstl.alternart.Services;

import com.gpstl.alternart.Dto.CompanyDTO;
import com.gpstl.alternart.Models.Company;
import com.gpstl.alternart.Models.User;
import com.gpstl.alternart.Repositories.CompanyRepository;
import com.gpstl.alternart.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    @Autowired
    public CompanyService(CompanyRepository companyRepository, UserRepository userRepository) {
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
    }

    /**
     * Retrieve all Companies.
     *
     * @return A list of all CompanyDTOs.
     */
    public List<CompanyDTO> getAllCompanies() {
        return companyRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Retrieve a Company by ID.
     *
     * @param id The ID of the company.
     * @return An Optional containing the CompanyDTO if found.
     */
    public Optional<CompanyDTO> getCompanyById(Long id) {
        return companyRepository.findById(id).map(this::convertToDTO);
    }

    /**
     * Create a new Company.
     *
     * @param companyDTO The company data.
     * @return The created CompanyDTO.
     */
    public CompanyDTO createCompany(CompanyDTO companyDTO) {
        // Verify that the User exists and has the 'COMPANY' role
        User user = userRepository.findById(companyDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + companyDTO.getUserId()));

        if (!user.getRole().equalsIgnoreCase("company")) {
            throw new IllegalArgumentException("User with ID: " + user.getId() + " does not have the 'COMPANY' role.");
        }

        // Map DTO to Entity
        Company company = mapToEntity(companyDTO, user);

        // Save the Company entity
        Company savedCompany = companyRepository.save(company);

        // Map Entity back to DTO
        return convertToDTO(savedCompany);
    }

    /**
     * Update an existing Company.
     *
     * @param id         The ID of the company to update.
     * @param companyDTO The updated company data.
     * @return An Optional containing the updated CompanyDTO if found.
     */
    public Optional<CompanyDTO> updateCompany(Long id, CompanyDTO companyDTO) {
        return companyRepository.findById(id)
                .map(existingCompany -> {
                    // Verify that the new User exists and has the 'COMPANY' role
                    User user = userRepository.findById(companyDTO.getUserId())
                            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + companyDTO.getUserId()));

                    if (!user.getRole().equalsIgnoreCase("company")) {
                        throw new IllegalArgumentException("User with ID: " + user.getId() + " does not have the 'COMPANY' role.");
                    }

                    // Update fields
                    existingCompany.setUser(user);
                    existingCompany.setCompanyName(companyDTO.getCompanyName());
                    existingCompany.setLogoUrl(companyDTO.getLogoUrl());
                    existingCompany.setDescription(companyDTO.getDescription());
                    existingCompany.setPerks(companyDTO.getPerks());

                    // Save the updated company
                    Company updatedCompany = companyRepository.save(existingCompany);
                    return convertToDTO(updatedCompany);
                });
    }

    /**
     * Delete a Company by ID.
     *
     * @param id The ID of the company to delete.
     */
    public void deleteCompany(Long id) {
        if (!companyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Company not found with ID: " + id);
        }
        companyRepository.deleteById(id);
    }

    /**
     * Convert Company entity to CompanyDTO.
     *
     * @param company The Company entity.
     * @return The CompanyDTO.
     */
    private CompanyDTO convertToDTO(Company company) {
        return new CompanyDTO(
                company.getId(),
                company.getUser() != null ? company.getUser().getId() : null,
                company.getCompanyName(),
                company.getLogoUrl(),
                company.getDescription(),
                company.getPerks()
        );
    }

    /**
     * Convert CompanyDTO to Company entity.
     *
     * @param companyDTO The CompanyDTO.
     * @param user       The associated User entity.
     * @return The Company entity.
     */
    private Company mapToEntity(CompanyDTO companyDTO, User user) {
        Company company = new Company();
        company.setId(companyDTO.getId());
        company.setUser(user);
        company.setCompanyName(companyDTO.getCompanyName());
        company.setLogoUrl(companyDTO.getLogoUrl());
        company.setDescription(companyDTO.getDescription());
        company.setPerks(companyDTO.getPerks());
        return company;
    }
}
