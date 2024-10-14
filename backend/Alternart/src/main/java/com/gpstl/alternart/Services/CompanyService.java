package com.gpstl.alternart.Services;

import com.gpstl.alternart.Dto.CompanyDTO;
import com.gpstl.alternart.Models.Company;
import com.gpstl.alternart.Models.User;
import com.gpstl.alternart.Repositories.CompanyRepository;
import com.gpstl.alternart.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    @Autowired
    public CompanyService(CompanyRepository companyRepository, UserRepository userRepository) {
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
    }

    public List<CompanyDTO> getAllCompanies() {
        // Convert the Company entities to CompanyDTOs
        return companyRepository.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }

    public Optional<CompanyDTO> getCompanyById(Long id) {
        return companyRepository.findById(id).map(this::convertToDTO);
    }

    public CompanyDTO createCompany(CompanyDTO companyDTO) {
        Company company = convertToEntity(companyDTO);
        Company savedCompany = companyRepository.save(company);
        return convertToDTO(savedCompany);
    }

    public CompanyDTO updateCompany(Long id, CompanyDTO companyDTO) {
        Company company = convertToEntity(companyDTO);
        company.setId(id);
        Company updatedCompany = companyRepository.save(company);
        return convertToDTO(updatedCompany);
    }

    public void deleteCompany(Long id) {
        companyRepository.deleteById(id);
    }

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

    private Company convertToEntity(CompanyDTO companyDTO) {

        User user = userRepository.findById(companyDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Company company = new Company();
        company.setUser(user);
        company.setId(companyDTO.getId());
        company.setCompanyName(companyDTO.getCompanyName());
        company.setLogoUrl(companyDTO.getLogoUrl());
        company.setDescription(companyDTO.getDescription());
        company.setPerks(companyDTO.getPerks());

        return company;
    }
}
