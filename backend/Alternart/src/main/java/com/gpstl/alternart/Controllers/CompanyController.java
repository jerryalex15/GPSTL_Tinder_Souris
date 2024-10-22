// CompanyController.java
package com.gpstl.alternart.Controllers;

import com.gpstl.alternart.Dto.CompanyDTO;
import com.gpstl.alternart.Services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    /**
     * Retrieve all Companies.
     *
     * @return A list of all companies.
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('STUDENT')")
    public ResponseEntity<List<CompanyDTO>> getAllCompanies() {
        List<CompanyDTO> companies = companyService.getAllCompanies();
        return new ResponseEntity<>(companies, HttpStatus.OK);
    }

    /**
     * Retrieve a Company by ID.
     *
     * @param id The ID of the company.
     * @return The company data.
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COMPANY')")
    public ResponseEntity<CompanyDTO> getCompanyById(@PathVariable Long id) {
        CompanyDTO companyDTO = companyService.getCompanyById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with ID: " + id));
        return ResponseEntity.ok(companyDTO);
    }

    /**
     * Create a new Company.
     *
     * @param companyDTO The company data.
     * @return The created company.
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COMPANY')")
    public ResponseEntity<CompanyDTO> createCompany( @RequestBody CompanyDTO companyDTO) {
        CompanyDTO createdCompany = companyService.createCompany(companyDTO);
        return new ResponseEntity<>(createdCompany, HttpStatus.CREATED);
    }

    /**
     * Update an existing Company.
     *
     * @param id         The ID of the company to update.
     * @param companyDTO The updated company data.
     * @return The updated company.
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COMPANY')")
    public ResponseEntity<CompanyDTO> updateCompany(@PathVariable Long id,  @RequestBody CompanyDTO companyDTO) {
        Optional<CompanyDTO> updatedCompany = companyService.updateCompany(id, companyDTO);
        return updatedCompany.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }

    /**
     * Delete a Company by ID.
     *
     * @param id The ID of the company to delete.
     * @return No content.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COMPANY')")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
        return ResponseEntity.noContent().build();
    }
}
